<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(protected CategoryRepository $repository) {}

    public function getPaginated(int $perPage = 25): LengthAwarePaginator
    {
        return $this->repository->getParentsPaginated($perPage);
    }

    public function create(array $data): Category
    {
        try {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $data['image']->store('categories', 'public');
            }

            return $this->repository->store($data);
        } catch (Exception $e) {
            throw new Exception('Error creating category: ' . $e->getMessage());
        }
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

        return $this->repository->delete($category);
    }

    public function getCategory(int $id): ?Category
    {
        return $this->repository->findById($id);
    }
}
