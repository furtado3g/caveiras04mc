<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BirthdayTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'circle_x',
        'circle_y',
        'circle_diameter',
        'name_text_x',
        'name_text_y',
        'name_text_max_width',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function birthdayImages(): HasMany
    {
        return $this->hasMany(BirthdayImage::class);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public static function getActive(): ?self
    {
        return static::where('active', true)->first();
    }
}
