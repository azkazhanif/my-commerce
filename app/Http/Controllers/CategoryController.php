<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $service) {}

    public function index()
    {
        $categories = $this->service->getParentsPaginated(10); // Adjust perPage as needed

        return Inertia::render('Admin/Category/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create', [
            'parents' => CategoryResource::collection($this->service->getAllParents())->resolve(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // 2MB
            'is_active' => 'boolean',
        ]);

        // Fallback slug generation if empty (though frontend usually handles it)
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $this->service->createCategory($validated);

        if ($request->boolean('stay_on_page')) {
            return redirect()->back()->with('success', 'Category created successfully.');
        }

        return redirect()->route('admin.categories')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        // Load children for the list
        $category->load(['children']);

        return Inertia::render('Admin/Category/Edit', [
            'category' => new CategoryResource($category),
            'parents' => CategoryResource::collection($this->service->getAllParents())->resolve(),
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
