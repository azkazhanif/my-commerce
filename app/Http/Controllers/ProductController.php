<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => Category::all() // Or Category::where('parent_id', null)->with('children')->get() if recursive
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'options' => 'array',
            'options.*.name' => 'required|string',
            'options.*.values' => 'array',
            'options.*.values.*' => 'string',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string',
            'variants.*.sku' => 'required|string|unique:product_skus,sku',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.options' => 'array',
        ]);

        $this->productService->createProduct($validated);

        return redirect()->route('admin.products')->with('success', 'Product created successfully.');
    }
}
