<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $service) {}

    public function index()
    {
        $categories = $this->service->getPaginated(10);

        return Inertia::render('Admin/Category/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(CategoryRequest $request)
    {
        try {
            $category = $this->service->create($request->all());
            return redirect()->route('admin.categories.edit', $category->parent_id ?? $category->id)->with('success', 'Category created successfully.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create category: ' . $e->getMessage()])->withInput();
        }
    }

    public function edit(Category $category)
    {
        $category->load(['children']);

        return Inertia::render('Admin/Category/Edit', [
            'category' => (new CategoryResource($category))->resolve(),
            'children' => CategoryResource::collection($category->children)->resolve(),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        $this->service->updateCategory($category, $validated);

        if ($request->boolean('stay_on_page')) {
            return redirect()->back()->with('success', 'Category updated successfully.');
        }

        return redirect()->route('admin.categories')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $this->service->deleteCategory($category);

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
