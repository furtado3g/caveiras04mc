<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberFiscalController extends Controller
{
    public function index(Request $request, Member $member)
    {
        $fiscal = $member->fiscal;
        $payments = $member->payments()->latest('payment_date')->get();

        return Inertia::render('Members/Fiscal', [
            'member' => $member,
            'fiscal' => $fiscal,
            'payments' => $payments,
        ]);
    }

    public function updateStatus(Request $request, Member $member)
    {
        $validated = $request->validate([
            'monthly_fee_status' => 'required|in:paid,pending,overdue',
        ]);

        $member->fiscal()->updateOrCreate(
            ['member_id' => $member->id],
            $validated
        );

        return redirect()->route('members.fiscal.index', $member)
            ->with('success', 'Status da mensalidade atualizado.');
    }

    public function storePayment(Request $request, Member $member)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'description' => 'nullable|string|max:255',
        ]);

        $validated['member_id'] = $member->id;
        $validated['status'] = 'paid';

        Payment::create($validated);

        return redirect()->route('members.fiscal.index', $member)
            ->with('success', 'Pagamento registrado com sucesso.');
    }
}
