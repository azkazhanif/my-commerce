<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_skus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('sku')->unique(); // e.g., "TSHIRT-RED-S"
            $table->decimal('price', 12, 2); // Always use decimal for money
            $table->integer('stock')->default(0);
            $table->string('image')->nullable(); // Specific image for this variant (like Shopee)
            $table->boolean('is_main')->default(false); // To select which price shows on the listing page
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_skus');
    }
};
