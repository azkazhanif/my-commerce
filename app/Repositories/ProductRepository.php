<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function getPaginatedProducts(int $perPage = 25)
    {
        return Product::with(['category', 'skus'])->paginate($perPage);
    }
}
