<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSku extends Model
{
    // Access the Product parent
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Access the specific values (e.g., This SKU is linked to "Red" and "Small")
    public function optionValues()
    {
        return $this->belongsToMany(
            ProductOptionValue::class,
            'sku_option_values',
            'product_sku_id',
            'product_option_value_id'
        );
    }
}
