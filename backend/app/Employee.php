<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['nombre', 'email', 'puesto', 'f_nacimiento','domicilio','skill','image'];
}
