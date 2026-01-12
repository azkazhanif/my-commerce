<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Auth\LoginRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function login()
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function signIn(LoginRequest $request)
    {
        try {
            if (!Auth::attempt($request->validated(), true)) {
                throw ValidationException::withMessages([
                    'email' => 'Invalid credentials.',
                ]);
            }

            $user = Auth::user();

            // 🔐 Superadmin authorization check
            if (! $user->roles()->where('name', 'superadmin')->exists()) {
                Auth::logout();

                throw ValidationException::withMessages([
                    'email' => 'You are not authorized to access admin panel.',
                ]);
            }

            // if (! $user->is_active ?? true) {
            //     Auth::logout();

            //     throw ValidationException::withMessages([
            //         'email' => 'Account is inactive.',
            //     ]);
            // }

            $request->session()->regenerate();

            return redirect()->route('admin.dashboard');
        } catch (ValidationException $e) {
            Log::error('Admin login failed: ' . $e->getMessage());
            throw $e;
        } catch (Exception $e) {
            Log::error('Admin login failed: ' . $e->getMessage());
            throw ValidationException::withMessages([
                'email' => 'An unexpected error occurred. Please try again later.',
            ]);
        }
    }

    public function index()
    {
        return Inertia::render('Admin/Index');
    }
}
