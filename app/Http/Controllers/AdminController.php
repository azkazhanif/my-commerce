<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Services\CategoryService;
use App\Services\ProductService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
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

    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    public  function products(ProductService $productService)
    {
        $products = $productService->getPaginatedProducts(25);
        return Inertia::render('Admin/Product/Index', [
            'products' => ProductResource::collection($products),
        ]);
    }

    public function categories(CategoryService $service)
    {
        $categories = $service->getPaginated(25);
        return Inertia::render('Admin/Category/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public  function orders()
    {
        return Inertia::render('Admin/Order/Index');
    }

    public  function reports()
    {
        return Inertia::render('Admin/Report/Index');
    }

    public  function settings()
    {
        return Inertia::render('Admin/Settings/Index');
    }
}
