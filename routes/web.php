<?php

use App\Http\Controllers\AdminController;
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
        // Add more admin-only routes here
    });
});
