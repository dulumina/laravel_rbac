<?php

namespace App\Services;

use App\Models\Permission;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Symfony\Component\Finder\Finder;

class PermissionScanner
{
    /**
     * Map route action to permission action.
     */
    private function mapRouteActionToPermission(string $action): string
    {
        return match ($action) {
            'index', 'show' => 'view',
            'create', 'store' => 'create',
            'edit', 'update' => 'edit',
            'destroy' => 'delete',
            default => $action,
        };
    }

    /**
     * Convert plural resource name to singular.
     */
    private function singularize(string $resource): string
    {
        // Special cases mapping
        $specialCases = [
            'datasets' => 'dataset',
            'perangkat-daerah' => 'sector',
            'data-values' => 'data',
            'indicators' => 'indicator',
            'groups' => 'group',
            'roles' => 'role',
            'users' => 'user',
            'permissions' => 'permission',
            'verifications' => 'verification',
        ];

        if (isset($specialCases[$resource])) {
            return $specialCases[$resource];
        }

        // Handle Laravel's pluralization - try to singularize
        if (Str::endsWith($resource, 'ies')) {
            return Str::replaceLast('ies', 'y', $resource);
        }

        if (Str::endsWith($resource, 'es')) {
            return Str::replaceLast('es', '', $resource);
        }

        if (Str::endsWith($resource, 's') && ! Str::endsWith($resource, 'ss')) {
            return Str::replaceLast('s', '', $resource);
        }

        return $resource;
    }

    /**
     * Convert route name to permission name.
     * Example: datasets.index -> datasets.view
     *          datasets.create -> datasets.create
     *          datasets.destroy -> datasets.delete
     */
    public function routeNameToPermission(string $routeName): ?string
    {
        // Skip auth routes (login, logout, register, password.*, verification.*)
        $authRoutes = ['login', 'logout', 'register', 'password.', 'verification.', 'confirm-password'];
        foreach ($authRoutes as $authRoute) {
            if (Str::startsWith($routeName, $authRoute)) {
                return null;
            }
        }

        // Skip other non-resource routes
        $skipRoutes = ['dashboard', 'ckan-sync', 'password.first', 'storage.', 'up'];
        foreach ($skipRoutes as $skipRoute) {
            if (Str::startsWith($routeName, $skipRoute)) {
                return null;
            }
        }

        // Parse route name (e.g., "datasets.index" -> resource: "datasets", action: "index")
        if (str_contains($routeName, '.')) {
            $parts = explode('.', $routeName);
            $resource = $parts[0];
            $action = end($parts);

            // Map to permission action
            $permissionAction = $this->mapRouteActionToPermission($action);

            // Handle special cases
            // "verifications.update-status" -> "verification.view" (update-status is a custom action)
            if ($routeName === 'verifications.update-status') {
                return 'verification.view';
            }

            // "export.excel", "export.csv", "export.pdf" -> "dataset.view" (export is related to dataset)
            if (in_array($resource, ['export'])) {
                return 'dataset.view';
            }

            // Convert plural resource to singular (e.g., "datasets" -> "dataset")
            $singularResource = $this->singularize($resource);

            return $singularResource.'.'.$permissionAction;
        }

        return null;
    }

    /**
     * Scan routes and extract permissions from route names.
     */
    public function scanRoutes(): array
    {
        $foundPermissions = [];
        $routes = \Route::getRoutes();
        $routeCollection = $routes->getRoutesByName();

        foreach ($routeCollection as $name => $route) {
            if (empty($name)) {
                continue;
            }

            $permission = $this->routeNameToPermission($name);

            if ($permission && ! isset($foundPermissions[$permission])) {
                $foundPermissions[$permission] = [];
            }
        }

        ksort($foundPermissions);

        return $foundPermissions;
    }

    /**
     * Scan the source code for used permissions.
     *
     * @return array
     */
    public function scan()
    {
        $foundPermissions = [];

        // Define paths to scan
        $paths = array_filter([
            app_path(),
            resource_path('views'),
            base_path('routes'),
        ], fn ($path) => file_exists($path));

        $finder = new Finder;
        $finder->files()
            ->in($paths)
            ->name(['*.php', '*.blade.php', '*.vue', '*.js'])
            ->notName('*.min.js')
            ->ignoreDotFiles(true)
            ->ignoreVCS(true);

        // Regex patterns to find permissions
        $patterns = [
            // Blade directives
            "/@can\s*\(\s*['\"]([^'\"]+)['\"]/i",
            "/@cannot\s*\(\s*['\"]([^'\"]+)['\"]/i",
            "/@canany\s*\(\s*\[\s*['\"]([^'\"]+)['\"]/i",

            // Standard method calls
            "/\bcan\s*\(\s*['\"]([^'\"]+)['\"]/i",
            "/\bauthorize\s*\(\s*['\"]([^'\"]+)['\"]/i",
            "/\bhasPermissionTo\s*\(\s*['\"]([^'\"]+)['\"]/i",
            "/\bgivePermissionTo\s*\(\s*['\"]([^'\"]+)['\"]/i",

            // Array/Config keys (common in Helpers or Configs)
            "/'permission'\s*=>\s*['\"]([^'\"]+)['\"]/i",
            "/\"permission\"\s*=>\s*['\"]([^'\"]+)['\"]/i",

            // Frontend generic usage (Vue/JS) if applicable
            "/['\"]permission['\"]\s*:\s*['\"]([^'\"]+)['\"]/i",

            // Route middleware
            "/['\"]can:([^'\"]+)['\"]/i",
        ];

        foreach ($finder as $file) {
            $content = $file->getContents();
            foreach ($patterns as $pattern) {
                if (preg_match_all($pattern, $content, $matches)) {
                    foreach ($matches[1] as $permission) {
                        // Skip variable interpolation or empty strings
                        if (empty($permission) || str_contains($permission, '$')) {
                            continue;
                        }

                        if (! isset($foundPermissions[$permission])) {
                            $foundPermissions[$permission] = [];
                        }

                        // Use project relative path
                        $relativePath = Str::after($file->getRealPath(), base_path().'/');

                        // Add file only if not already in list
                        if (! in_array($relativePath, $foundPermissions[$permission])) {
                            $foundPermissions[$permission][] = $relativePath;
                        }
                    }
                }
            }
        }

        // Merge with route-based permissions
        $routePermissions = $this->scanRoutes();
        foreach ($routePermissions as $permName => $files) {
            if (! isset($foundPermissions[$permName])) {
                $foundPermissions[$permName] = $files;
            }
        }

        ksort($foundPermissions);

        return $foundPermissions;
    }

    public function getPermissionsData()
    {
        $codePermissions = $this->scan();
        $dbPermissions = Permission::orderBy('name')->get();

        $combined = [];

        // 1. Process DB Permissions
        foreach ($dbPermissions as $perm) {
            $feature = $perm->feature;
            if (empty($feature)) {
                $parts = explode('.', $perm->name);
                $feature = ucfirst($parts[0]);
            }

            $combined[$perm->name] = [
                'name' => $perm->name,
                'feature' => $feature,
                'guard_name' => $perm->guard_name,
                'created_at' => $perm->created_at,
                'in_db' => true,
                'in_code' => isset($codePermissions[$perm->name]),
                'files' => $codePermissions[$perm->name] ?? [],
                'id' => $perm->id, // Important for edit/delete links
            ];
        }

        // 2. Process Code Permissions (that might not be in DB)
        foreach ($codePermissions as $name => $files) {
            if (! isset($combined[$name])) {
                $parts = explode('.', $name);
                $feature = ucfirst($parts[0]);

                $combined[$name] = [
                    'name' => $name,
                    'feature' => $feature,
                    'guard_name' => 'web',
                    'created_at' => null,
                    'in_db' => false,
                    'in_code' => true,
                    'files' => $files,
                    'id' => null,
                ];
            } else {
                // Should already be set, but just in case ensuring files are attached
                if (empty($combined[$name]['files'])) {
                    $combined[$name]['files'] = $files;
                    $combined[$name]['in_code'] = true;
                }
            }
        }

        // Sort by name
        ksort($combined);

        return array_values($combined);
    }
}
