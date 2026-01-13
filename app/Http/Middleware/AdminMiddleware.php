<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Check if user is logged in
        if (!auth()->check()) {
            return redirect()->route('admin.login');
        }

        // 2. Check if user has the correct role
        if (!auth()->user()->roles()->where('name', 'superadmin')->exists()) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
