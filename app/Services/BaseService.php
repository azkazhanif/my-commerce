<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseService
{
    protected BaseRepository $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function findById(int $id): ?Model
    {
        return $this->repository->findById($id);
    }

    public function findMultipleId(array $ids): Collection
    {
        return $this->repository->findMultipleId($ids);
    }

    public function create(array $data): Model
    {
        return $this->repository->store($data);
    }

    public function update(Model $model, array $data): bool
    {
        return $this->repository->update($model, $data);
    }

    public function delete(Model $model): bool
    {
        return $this->repository->delete($model);
    }
}
