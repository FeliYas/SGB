<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoMotor extends Model
{
    protected $guarded = [];

    public function producto()
    {
        return $this->belongsTo(Producto::class)->orderBy('order', 'asc');
    }
    public function motor()
    {
        return $this->belongsTo(Motor::class)->orderBy('order', 'asc');
    }
}
