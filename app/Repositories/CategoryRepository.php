<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository extends BaseRepository
{
    public function __construct(Category $category)
    {
        parent::__construct($category);
    }

    public function getParentsPaginated(int $perPage = 25): LengthAwarePaginator
    {
        return $this->model->whereNull('parent_id')
            ->withCount('children')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getAllParents(): Collection
    {
        return Category::whereNull('parent_id')->orderBy('name')->get();
    }
}
