<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(protected CategoryRepository $repository) {}

    public function getPaginated(int $perPage = 25): LengthAwarePaginator
    {
        // This was the old method, redirecting to new requirement (parents only for index usually, but keeping generic if needed)
        return $this->repository->getPaginated($perPage);
    }

    public function getParentsPaginated(int $perPage = 25): LengthAwarePaginator
    {
        return $this->repository->getParentsPaginated($perPage);
    }

    public function getAllParents(): Collection
    {
        return $this->repository->getAllParents();
    }

    public function createCategory(array $data): Category
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $data['image']->store('categories', 'public');
        }

        return $this->repository->create($data);
    }

    public function updateCategory(Category $category, array $data): bool
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // Delete old image if exists
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $data['image'] = $data['image']->store('categories', 'public');
        }

        return $this->repository->update($category, $data);
    }

    public function deleteCategory(Category $category): bool
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        
        // Also delete children images? Or prevent delete if children exist?
        // For now, let's assume cascade delete is handled by DB or we just delete the category.
        
        return $this->repository->delete($category);
    }

    public function getCategory(int $id): ?Category
    {
        return $this->repository->findById($id);
    }
}
