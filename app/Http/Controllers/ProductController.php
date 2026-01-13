<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => Category::all() // Or Category::where('parent_id', null)->with('children')->get() if recursive
        ]);
    }
}
