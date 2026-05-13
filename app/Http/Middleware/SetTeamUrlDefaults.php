<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetTeamUrlDefaults
{
    /**
     * Set the default URL parameters for team-based routes.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($user = $request->user()) {
            $currentTeam = $user->currentTeam ?: $user->fallbackTeam();

            if ($currentTeam) {
                if (! $user->current_team_id) {
                    $user->forceFill(['current_team_id' => $currentTeam->id])->save();
                }

                URL::defaults([
                    'current_team' => $currentTeam->slug,
                    'team' => $currentTeam->slug,
                ]);
            }
        }

        return $next($request);
    }
}
