<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberHealth extends Model
{
    use HasFactory;

    protected $table = 'member_health';

    protected $fillable = [
        'member_id',
        'blood_type',
        'allergies',
        'medical_conditions',
        'medications',
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
