<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['prefix' => 'admin'], function () {
    Route::middleware(['guest'])->group(function () {
        Route::get('/login', [AdminController::class, 'login'])->name('admin.login');
        Route::post('/login', [AdminController::class, 'signIn'])->name('admin.signin');
    });

    Route::middleware(['admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/products', [AdminController::class, 'products'])->name('admin.products');
        Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders');
        Route::get('/reports', [AdminController::class, 'reports'])->name('admin.reports');
        Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
        Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');

        Route::get('/products/create', [ProductController::class, 'create'])->name('admin.products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');

        Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories');
        Route::get('/categories/create', [CategoryController::class, 'create'])->name('admin.categories.create');
    });
});
