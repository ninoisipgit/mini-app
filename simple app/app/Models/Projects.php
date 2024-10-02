<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'title',
        'startDate',
        'endDate',
        'assignedEngrID',
        'status',
        'contructor',
        'amount'
    ];

    protected $casts = [
        'startDate' => 'date',
        'endDate' => 'date'
    ];
}
