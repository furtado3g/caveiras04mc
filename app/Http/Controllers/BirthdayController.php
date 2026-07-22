<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateBirthdayImage;
use App\Models\BirthdayImage;
use App\Models\BirthdayTemplate;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BirthdayController extends Controller
{
    public function index()
    {
        $birthdayImages = BirthdayImage::with(['member', 'template'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Birthday/Index', [
            'birthdayImages' => $birthdayImages,
        ]);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
        ]);

        $member = Member::findOrFail($validated['member_id']);

        if (!$member->photo_path) {
            return back()->withErrors(['member_id' => 'Membro não possui foto de perfil cadastrada.']);
        }

        $template = BirthdayTemplate::getActive();
        if (!$template) {
            return back()->withErrors(['template' => 'Nenhum template de aniversário ativo encontrado.']);
        }

        $birthdayImage = BirthdayImage::create([
            'member_id' => $member->id,
            'template_id' => $template->id,
            'source_photo_path' => $member->photo_path,
            'status' => 'pending',
        ]);

        GenerateBirthdayImage::dispatch($birthdayImage);

        return redirect()->route('birthday.index')
            ->with('success', 'Geração de imagem de aniversário iniciada.');
    }

    public function download(BirthdayImage $birthdayImage)
    {
        if ($birthdayImage->status !== 'done' || !$birthdayImage->generated_image_path) {
            abort(404, 'Imagem ainda não foi gerada.');
        }

        $path = \Illuminate\Support\Facades\Storage::disk('public')->path($birthdayImage->generated_image_path);

        return response()->download($path, "aniversario-{$birthdayImage->member->full_name}.png");
    }
}
