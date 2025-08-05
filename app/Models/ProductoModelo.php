<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoModelo extends Model
{
    protected $guarded = [];

    public function producto()
    {
        return $this->belongsTo(Producto::class)->orderBy('order', 'asc');
    }

    public function modelo()
    {
        return $this->belongsTo(Modelo::class)->orderBy('order', 'asc');
    }
}
