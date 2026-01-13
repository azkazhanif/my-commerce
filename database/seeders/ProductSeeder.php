<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductOption;
use App\Models\ProductOptionValue;
use App\Models\ProductSku;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 1. Create some dummy categories first
        $categories = ['Electronics', 'Fashion', 'Home & Living'];
        $catIds = [];
        foreach ($categories as $cat) {
            $c = Category::firstOrCreate([
                'slug' => Str::slug($cat),
            ], [
                'name' => $cat,
            ]);
            $catIds[] = $c->id;
        }

        // 2. Loop to create 10 Products
        for ($i = 1; $i <= 10; $i++) {
            DB::transaction(function () use ($i, $catIds) {
                // A. Create the Product
                $productName = 'Product Demo ' . $i;
                $product = Product::create([
                    'category_id' => $catIds[array_rand($catIds)],
                    'name' => $productName,
                    'slug' => Str::slug($productName) . '-' . Str::random(5),
                    'description' => 'This is a high quality product description.',
                    'is_active' => true,
                ]);

                // B. Define Options (The "Types")
                // We will create a "Color" and "Size" matrix
                $optionsData = [
                    'Warna' => ['Merah', 'Biru', 'Hitam'],
                    'Ukuran' => ['S', 'M', 'L']
                ];

                $optionValueIds = []; // To store created value IDs: ['Warna' => [1, 2, 3], 'Ukuran' => [4, 5, 6]]

                foreach ($optionsData as $optionName => $values) {
                    $option = ProductOption::create([
                        'product_id' => $product->id,
                        'name' => $optionName
                    ]);

                    foreach ($values as $val) {
                        $optVal = ProductOptionValue::create([
                            'product_option_id' => $option->id,
                            'value' => $val
                        ]);
                        // Store the ID to generate combinations later
                        $optionValueIds[$optionName][] = $optVal->id;
                    }
                }

                // C. Generate SKUs (Cartesian Product)
                // We combine every Color with every Size
                $colors = $optionValueIds['Warna'];
                $sizes = $optionValueIds['Ukuran'];

                foreach ($colors as $colorId) {
                    foreach ($sizes as $sizeId) {
                        // Create a unique SKU string
                        $skuCode = strtoupper(Str::slug($product->name)) . '-' . Str::random(4);

                        // Create the Sellable SKU Item
                        $sku = ProductSku::create([
                            'product_id' => $product->id,
                            'sku' => $skuCode,
                            'price' => rand(50000, 200000), // Random price 50k - 200k
                            'stock' => rand(10, 100),
                            'is_main' => false
                        ]);

                        // D. Link SKU to the specific Option Values (The Pivot Table)
                        // This SKU is linked to THIS specific Color and THIS specific Size
                        DB::table('sku_option_values')->insert([
                            ['product_sku_id' => $sku->id, 'product_option_value_id' => $colorId],
                            ['product_sku_id' => $sku->id, 'product_option_value_id' => $sizeId],
                        ]);
                    }
                }
            });
        }
    }
}
