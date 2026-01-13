<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Models\ProductOption;
use App\Models\ProductOptionValue;
use App\Models\ProductSku;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getPaginatedProducts(int $perPage = 25)
    {
        return $this->productRepository->getPaginatedProducts($perPage);
    }

    public function createProduct(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Create the product
            $product = Product::create([
                'category_id' => $data['category_id'],
                'name' => $data['name'],
                'slug' => Str::slug($data['name']) . '-' . Str::random(5),
                'description' => $data['description'] ?? '',
                'is_active' => $data['is_active'] ?? true,
            ]);

            // Create options and values
            $optionValueIds = [];
            foreach ($data['options'] as $optionData) {
                $option = ProductOption::create([
                    'product_id' => $product->id,
                    'name' => $optionData['name'],
                ]);

                foreach ($optionData['values'] as $value) {
                    $optVal = ProductOptionValue::create([
                        'product_option_id' => $option->id,
                        'value' => $value,
                    ]);
                    $optionValueIds[$optionData['name']][] = $optVal->id;
                }
            }

            // Create SKUs
            if (empty($data['variants'])) {
                // No variants, create single SKU
                ProductSku::create([
                    'product_id' => $product->id,
                    'sku' => Str::slug($product->name) . '-' . Str::random(4),
                    'price' => $data['price'],
                    'stock' => 0, // Or set default
                    'is_main' => true,
                ]);
            } else {
                foreach ($data['variants'] as $variant) {
                    $sku = ProductSku::create([
                        'product_id' => $product->id,
                        'sku' => $variant['sku'],
                        'price' => $variant['price'],
                        'stock' => $variant['stock'],
                        'is_main' => false,
                    ]);

                    // Link SKU to option values
                    $links = [];
                    foreach ($variant['options'] as $index => $optionValue) {
                        $optionName = $data['options'][$index]['name'];
                        $valueIndex = array_search($optionValue, $data['options'][$index]['values']);
                        if ($valueIndex !== false) {
                            $valueId = $optionValueIds[$optionName][$valueIndex];
                            $links[] = ['product_sku_id' => $sku->id, 'product_option_value_id' => $valueId];
                        }
                    }

                    DB::table('sku_option_values')->insert($links);
                }
            }

            return $product;
        });
    }
}
