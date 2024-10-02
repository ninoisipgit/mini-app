<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engineers extends Model
{
    use HasFactory;

    protected $table = 'engineers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name',
        'prcID',
        'prcExpiryDate',
        'gender',
        'email',
        'projectCount',
        'issActive',
    ];

        /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'prcExpiryDate' => 'date'
    ];
}
