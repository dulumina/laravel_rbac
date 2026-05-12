<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PermissionScanner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the permissions.
     */
    public function index(): Response
    {
        return Inertia::render('admin/permissions/index', [
            'permissions' => Permission::all()->map(fn ($permission) => [
                'id' => $permission->id,
                'name' => $permission->name,
                'created_at' => $permission->created_at->format('Y-m-d H:i:s'),
            ]),
        ]);
    }

    /**
     * Scan permissions in the codebase and database.
     */
    public function scan(PermissionScanner $scanner): Response
    {
        return Inertia::render('admin/permissions/scan', [
            'scanResults' => $scanner->getPermissionsData(),
        ]);
    }

    /**
     * Store a newly created permission in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Permission created successfully.');
    }

    /**
     * Store multiple permissions at once.
     */
    public function storeBulk(Request $request): RedirectResponse
    {
        $request->validate([
            'names' => 'required|array',
            'names.*' => 'required|string',
        ]);

        foreach ($request->names as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        return redirect()->back()->with('success', count($request->names).' permissions created successfully.');
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()->route('admin.permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
