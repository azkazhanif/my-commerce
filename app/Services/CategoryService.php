<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService
{
    public function __construct(protected CategoryRepository $repository) {}

    public function getPaginated(int $perPage = 25)
    {
        return $this->repository->getPaginated($perPage);
    }
}
