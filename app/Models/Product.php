<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    // Relationship to Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relationship to Options (Color, Size)
    public function options()
    {
        return $this->hasMany(ProductOption::class);
    }

    // Relationship to the actual Sellable Items (SKUs)
    public function skus()
    {
        return $this->hasMany(ProductSku::class);
    }

    // Helper to get the starting price (Show "Rp 10.000 - Rp 50.000")
    public function getPriceRangeAttribute()
    {
        $min = $this->skus->min('price');
        $max = $this->skus->max('price');
        return $min == $max ? $min : "$min - $max";
    }
}
