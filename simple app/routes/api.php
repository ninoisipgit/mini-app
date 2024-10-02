<?php

use App\Http\Controllers\EngineerController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;


Route::middleware('api')->group(function () {
    Route::apiResource('engineers', EngineerController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::post('/images/store', [ImageController::class, 'store'])->name('images.store');
    Route::get('/images/{prcID}', [ImageController::class, 'getImageByPrcID']);
});
