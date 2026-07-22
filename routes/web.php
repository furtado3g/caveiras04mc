<?php

use App\Http\Controllers\BirthdayController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MemberDocumentController;
use App\Http\Controllers\MemberFiscalController;
use App\Http\Controllers\MemberHealthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('members', MemberController::class)->except(['index']);

    Route::middleware('role:admin,diretoria')->group(function () {
        Route::get('/members', [MemberController::class, 'index'])->name('members.index');
    });

    Route::get('/members/{member}/vehicles', [VehicleController::class, 'index'])->name('members.vehicles.index');
    Route::post('/members/{member}/vehicles', [VehicleController::class, 'store'])->name('members.vehicles.store');
    Route::put('/members/{member}/vehicles/{vehicle}', [VehicleController::class, 'update'])->name('members.vehicles.update');
    Route::delete('/members/{member}/vehicles/{vehicle}', [VehicleController::class, 'destroy'])->name('members.vehicles.destroy');

    Route::get('/members/{member}/health', [MemberHealthController::class, 'show'])->name('members.health.show');
    Route::post('/members/{member}/health', [MemberHealthController::class, 'store'])->name('members.health.store');
    Route::put('/members/{member}/health', [MemberHealthController::class, 'update'])->name('members.health.update');

    Route::get('/members/{member}/documents', [MemberDocumentController::class, 'index'])->name('members.documents.index');
    Route::post('/members/{member}/documents', [MemberDocumentController::class, 'store'])->name('members.documents.store');
    Route::delete('/members/{member}/documents/{document}', [MemberDocumentController::class, 'destroy'])->name('members.documents.destroy');
    Route::get('/members/{member}/documents/{document}/download', [MemberDocumentController::class, 'download'])->name('members.documents.download');

    Route::get('/members/{member}/fiscal', [MemberFiscalController::class, 'index'])->name('members.fiscal.index');
    Route::put('/members/{member}/fiscal/status', [MemberFiscalController::class, 'updateStatus'])->name('members.fiscal.update-status');
    Route::post('/members/{member}/fiscal/payments', [MemberFiscalController::class, 'storePayment'])->name('members.fiscal.payments.store');

    Route::get('/birthday', [BirthdayController::class, 'index'])->name('birthday.index');
    Route::post('/birthday/generate', [BirthdayController::class, 'generate'])->name('birthday.generate');
    Route::get('/birthday/{birthdayImage}/download', [BirthdayController::class, 'download'])->name('birthday.download');
});

require __DIR__.'/auth.php';
