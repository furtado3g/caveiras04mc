<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = Member::with(['vehicles', 'health'])
            ->active();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('cpf', 'like', "%{$search}%")
                  ->orWhere('mobile_phone', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->byStatus($status);
        }

        $members = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Members/Index', [
            'members' => $members,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'full_address' => 'required|string',
            'birth_date' => 'required|date|before:today',
            'spouse_name' => 'nullable|string|max:255',
            'work_address' => 'nullable|string|max:255',
            'mobile_phone' => 'required|string|max:20',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'previous_mc_member' => 'boolean',
            'previous_mc_name' => 'nullable|string|max:255',
            'club_join_date' => 'required|date',
            'cpf' => 'required|string|max:14|unique:members,cpf',
            'rg' => 'nullable|string|max:20',
            'status' => 'required|in:prospect,member,veteran,inactive,removed',
            'photo' => 'nullable|image|max:2048',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $userId = \App\Models\User::create([
            'name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'member',
        ])->id;

        $memberData = collect($validated)->except(['email', 'password', 'photo']);
        $memberData['user_id'] = $userId;
        $memberData['cpf'] = preg_replace('/\D/', '', $validated['cpf']);

        if ($request->hasFile('photo')) {
            $memberData['photo_path'] = $request->file('photo')->store('photos', 'public');
        }

        $member = Member::create($memberData->toArray());

        return redirect()->route('members.show', $member)
            ->with('success', 'Membro cadastrado com sucesso.');
    }

    public function show(Member $member)
    {
        $member->load(['vehicles', 'health', 'documents', 'fiscal', 'payments']);

        return Inertia::render('Members/Show', [
            'member' => $member,
        ]);
    }

    public function edit(Member $member)
    {
        $member->load(['vehicles', 'health']);

        return Inertia::render('Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'full_address' => 'required|string',
            'birth_date' => 'required|date|before:today',
            'spouse_name' => 'nullable|string|max:255',
            'work_address' => 'nullable|string|max:255',
            'mobile_phone' => 'required|string|max:20',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'previous_mc_member' => 'boolean',
            'previous_mc_name' => 'nullable|string|max:255',
            'club_join_date' => 'required|date',
            'cpf' => 'required|string|max:14|unique:members,cpf,' . $member->id,
            'rg' => 'nullable|string|max:20',
            'status' => 'required|in:prospect,member,veteran,inactive,removed',
            'photo' => 'nullable|image|max:2048',
        ]);

        $memberData = collect($validated)->except(['photo']);
        $memberData['cpf'] = preg_replace('/\D/', '', $validated['cpf']);

        if ($request->hasFile('photo')) {
            if ($member->photo_path) {
                Storage::disk('public')->delete($member->photo_path);
            }
            $memberData['photo_path'] = $request->file('photo')->store('photos', 'public');
        }

        $member->update($memberData->toArray());

        return redirect()->route('members.show', $member)
            ->with('success', 'Membro atualizado com sucesso.');
    }

    public function destroy(Member $member)
    {
        $member->update(['status' => 'removed']);

        return redirect()->route('members.index')
            ->with('success', 'Membro removido com sucesso.');
    }
}
