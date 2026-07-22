<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'type',
        'number',
        'expiry_date',
        'file_path',
    ];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'date',
        ];
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function isExpired(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    public function expiresSoon(int $days = 30): bool
    {
        return $this->expiry_date && $this->expiry_date->diffInDays(now()) <= $days;
    }
}
