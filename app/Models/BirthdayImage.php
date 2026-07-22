<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BirthdayImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'template_id',
        'source_photo_path',
        'generated_image_path',
        'status',
        'error_message',
    ];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(BirthdayTemplate::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'done');
    }
}
