<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'slug' => $this->slug,
      'description' => $this->description,
      'is_active' => $this->is_active,
      'category' => $this->whenLoaded('category'),
      'skus' => $this->whenLoaded('skus'),
      'price_range' => $this->price_range,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
