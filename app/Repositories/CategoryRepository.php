<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository
{
    public function getParentsPaginated(int $perPage = 25): LengthAwarePaginator
    {
        return Category::whereNull('parent_id')
            ->withCount('children')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getAllParents(): Collection
    {
        return Category::whereNull('parent_id')->orderBy('name')->get();
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data): bool
    {
        return $category->update($data);
    }

    public function delete(Category $category): bool
    {
        return $category->delete();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }
    
    public function getPaginated(int $perPage = 25): LengthAwarePaginator
    {
        return Category::paginate($perPage);
    }
}
