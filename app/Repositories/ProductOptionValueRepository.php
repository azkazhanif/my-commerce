<?php

namespace App\Repositories;

use App\Models\ProductOptionValue;

class ProductOptionValueRepository
{
  public function create(array $data): ProductOptionValue
  {
    return ProductOptionValue::create($data);
  }

  public function update(ProductOptionValue $value, array $data): ProductOptionValue
  {
    $value->update($data);
    return $value;
  }

  public function delete(ProductOptionValue $value): bool
  {
    return $value->delete();
  }
}
