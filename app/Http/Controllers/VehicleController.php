<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request, Member $member)
    {
        $vehicles = $member->vehicles()->latest()->get();

        return Inertia::render('Members/Vehicles', [
            'member' => $member,
            'vehicles' => $vehicles,
        ]);
    }

    public function store(Request $request, Member $member)
    {
        $validated = $request->validate([
            'brand_model' => 'required|string|max:255',
            'plate' => 'required|string|max:10',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'color' => 'nullable|string|max:50',
            'engine_cc' => 'nullable|integer|min:50|max:9999',
            'renavam' => 'nullable|string|max:20',
            'license_expiry' => 'nullable|date',
            'insurance_company' => 'nullable|string|max:255',
            'insurance_policy' => 'nullable|string|max:100',
            'insurance_expiry' => 'nullable|date',
        ]);

        $validated['plate'] = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $validated['plate']));
        $validated['member_id'] = $member->id;

        $vehicle = Vehicle::create($validated);

        return redirect()->route('members.show', $member)
            ->with('success', 'Moto cadastrada com sucesso.');
    }

    public function update(Request $request, Member $member, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'brand_model' => 'required|string|max:255',
            'plate' => 'required|string|max:10',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'color' => 'nullable|string|max:50',
            'engine_cc' => 'nullable|integer|min:50|max:9999',
            'renavam' => 'nullable|string|max:20',
            'license_expiry' => 'nullable|date',
            'insurance_company' => 'nullable|string|max:255',
            'insurance_policy' => 'nullable|string|max:100',
            'insurance_expiry' => 'nullable|date',
        ]);

        $validated['plate'] = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $validated['plate']));

        $vehicle->update($validated);

        return redirect()->route('members.show', $member)
            ->with('success', 'Moto atualizada com sucesso.');
    }

    public function destroy(Member $member, Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('members.show', $member)
            ->with('success', 'Moto removida com sucesso.');
    }
}
