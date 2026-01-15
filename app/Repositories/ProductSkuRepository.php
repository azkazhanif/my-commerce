<?php

namespace App\Repositories;

use App\Models\ProductSku;

class ProductSkuRepository
{
  public function create(array $data): ProductSku
  {
    return ProductSku::create($data);
  }

  public function update(ProductSku $sku, array $data): ProductSku
  {
    $sku->update($data);
    return $sku;
  }

  public function delete(ProductSku $sku): bool
  {
    return $sku->delete();
  }

  public function linkOptionValues(ProductSku $sku, array $links): void
  {
    if (!empty($links)) {
      foreach ($links as $link) {
        $sku->optionValues()->attach($link['product_option_value_id']);
      }
    }
  }
}
