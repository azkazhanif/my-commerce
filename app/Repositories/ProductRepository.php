<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function getPaginatedProducts(int $perPage = 25)
    {
        return Product::with(['category', 'skus'])->paginate($perPage);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data): Product
    {
        $product->update($data);
        return $product;
    }

    public function delete(Product $product): bool
    {
        return $product->delete();
    }
}
