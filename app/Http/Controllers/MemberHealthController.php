<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\MemberHealth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberHealthController extends Controller
{
    public function show(Member $member)
    {
        $this->authorizeHealthAccess($member);

        $health = $member->health;

        return Inertia::render('Members/Health', [
            'member' => $member,
            'health' => $health,
        ]);
    }

    public function store(Request $request, Member $member)
    {
        $validated = $request->validate([
            'blood_type' => 'required|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'allergies' => 'nullable|string',
            'medical_conditions' => 'nullable|string',
            'medications' => 'nullable|string',
        ]);

        $validated['member_id'] = $member->id;

        $health = MemberHealth::create($validated);

        return redirect()->route('members.health.show', $member)
            ->with('success', 'Dados de saúde cadastrados com sucesso.');
    }

    public function update(Request $request, Member $member)
    {
        $this->authorizeHealthAccess($member);

        $validated = $request->validate([
            'blood_type' => 'required|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'allergies' => 'nullable|string',
            'medical_conditions' => 'nullable|string',
            'medications' => 'nullable|string',
        ]);

        $member->health()->updateOrCreate(
            ['member_id' => $member->id],
            $validated
        );

        return redirect()->route('members.health.show', $member)
            ->with('success', 'Dados de saúde atualizados com sucesso.');
    }

    private function authorizeHealthAccess(Member $member): void
    {
        $user = request()->user();

        if (!$user) {
            abort(401);
        }

        if ($user->id !== $member->user_id && !$user->isDiretoria()) {
            abort(403, 'Acesso restrito aos dados de saúde.');
        }
    }
}
