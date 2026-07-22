<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Crypt;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'full_address',
        'birth_date',
        'spouse_name',
        'work_address',
        'mobile_phone',
        'emergency_contact_name',
        'emergency_contact_phone',
        'previous_mc_member',
        'previous_mc_name',
        'club_join_date',
        'cpf',
        'rg',
        'status',
        'photo_path',
    ];

    protected $hidden = ['cpf', 'rg'];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'club_join_date' => 'date',
            'previous_mc_member' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    public function health(): HasOne
    {
        return $this->hasOne(MemberHealth::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(MemberDocument::class);
    }

    public function fiscal(): HasOne
    {
        return $this->hasOne(MemberFiscal::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function birthdayImages(): HasMany
    {
        return $this->hasMany(BirthdayImage::class);
    }

    public function getAgeAttribute(): int
    {
        return $this->birth_date->age;
    }

    public function getClubYearsAttribute(): int
    {
        return $this->club_join_date->diffInYears(now());
    }

    public function getMaskedCpfAttribute(): string
    {
        $cpf = $this->attributes['cpf'] ?? '';
        if (strlen($cpf) === 11) {
            return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
        }
        return $cpf;
    }

    public function setCpfAttribute(string $value): void
    {
        $this->attributes['cpf'] = preg_replace('/\D/', '', $value);
    }

    public function setRgAttribute(string $value): void
    {
        $this->attributes['rg'] = preg_replace('/\D/', '', $value);
    }

    public function scopeActive($query)
    {
        return $query->where('status', '!=', 'removed');
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}
