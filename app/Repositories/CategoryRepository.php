<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getPaginated(int $perPage = 25)
    {
        return Category::paginate($perPage);
    }
}
