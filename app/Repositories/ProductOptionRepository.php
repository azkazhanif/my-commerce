<?php

namespace App\Repositories;

use App\Models\ProductOption;

class ProductOptionRepository
{
  public function create(array $data): ProductOption
  {
    return ProductOption::create($data);
  }

  public function update(ProductOption $option, array $data): ProductOption
  {
    $option->update($data);
    return $option;
  }

  public function delete(ProductOption $option): bool
  {
    return $option->delete();
  }
}
