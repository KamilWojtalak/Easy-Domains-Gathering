<?php

use App\Http\Controllers\DomainController;
use App\Http\Controllers\FolderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::resource('folders', FolderController::class)->only(['index', 'store', 'show']);
    Route::post('folders/{folder}/domains', [DomainController::class, 'store'])
        ->name('domains.store');
});
