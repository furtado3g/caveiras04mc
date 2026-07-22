<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\MemberDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberDocumentController extends Controller
{
    public function index(Request $request, Member $member)
    {
        $documents = $member->documents()->latest()->get();

        return Inertia::render('Members/Documents', [
            'member' => $member,
            'documents' => $documents,
        ]);
    }

    public function store(Request $request, Member $member)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:cnh,comprovante_residencia,outro',
            'number' => 'nullable|string|max:100',
            'expiry_date' => 'nullable|date',
            'file' => 'required|file|max:10240',
        ]);

        $filePath = $request->file('file')->store('documents', 'public');

        $member->documents()->create([
            'type' => $validated['type'],
            'number' => $validated['number'] ?? null,
            'expiry_date' => $validated['expiry_date'] ?? null,
            'file_path' => $filePath,
        ]);

        return redirect()->route('members.documents.index', $member)
            ->with('success', 'Documento cadastrado com sucesso.');
    }

    public function destroy(Member $member, MemberDocument $document)
    {
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('members.documents.index', $member)
            ->with('success', 'Documento removido com sucesso.');
    }

    public function download(Member $member, MemberDocument $document)
    {
        $path = Storage::disk('public')->path($document->file_path);

        return response()->download($path, basename($document->file_path));
    }
}
