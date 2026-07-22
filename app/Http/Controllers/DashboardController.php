<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\MemberDocument;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $totalMembers = Member::active()->count();
        $totalVehicles = \App\Models\Vehicle::count();

        $expiringDocs = MemberDocument::where('expiry_date', '>=', now())
            ->where('expiry_date', '<=', now()->addDays(30))
            ->with('member')
            ->get();

        $overduePayments = Payment::where('status', 'pending')
            ->with('member')
            ->get();

        $birthdayMembers = Member::active()
            ->whereRaw("strftime('%m-%d', birth_date) = strftime('%m-%d', 'now')")
            ->get();

        $recentMembers = Member::active()
            ->latest('created_at')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalMembers' => $totalMembers,
                'totalVehicles' => $totalVehicles,
                'expiringDocsCount' => $expiringDocs->count(),
                'overduePaymentsCount' => $overduePayments->count(),
            ],
            'expiringDocs' => $expiringDocs,
            'overduePayments' => $overduePayments,
            'birthdayMembers' => $birthdayMembers,
            'recentMembers' => $recentMembers,
        ]);
    }
}
