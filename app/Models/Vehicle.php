<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'brand_model',
        'plate',
        'year',
        'color',
        'engine_cc',
        'renavam',
        'license_expiry',
        'insurance_company',
        'insurance_policy',
        'insurance_expiry',
    ];

    protected function casts(): array
    {
        return [
            'license_expiry' => 'date',
            'insurance_expiry' => 'date',
        ];
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function getFormattedPlateAttribute(): string
    {
        $plate = $this->attributes['plate'];
        $plate = strtoupper($plate);
        if (strlen($plate) === 7) {
            return substr($plate, 0, 3) . '-' . substr($plate, 3);
        }
        return $plate;
    }
}
