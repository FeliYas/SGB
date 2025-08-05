<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Motor extends Model
{
    protected $guarded = [];

    public function productoMotors()
    {
        return $this->hasMany(ProductoMotor::class)->orderBy('order', 'asc');
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'producto_motors')
            ->withTimestamps()
            ->orderBy('order', 'asc');
    }
}
