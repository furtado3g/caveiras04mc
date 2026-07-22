<?php

namespace App\Jobs;

use App\Models\BirthdayImage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class GenerateBirthdayImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;

    public function __construct(public BirthdayImage $birthdayImage)
    {
    }

    public function handle(): void
    {
        $this->birthdayImage->update(['status' => 'processing']);

        try {
            $template = $this->birthdayImage->template;
            $member = $this->birthdayImage->member;

            $templatePath = Storage::disk('public')->path($template->file_path);
            $photoPath = Storage::disk('public')->path($this->birthdayImage->source_photo_path);

            $manager = ImageManager::gd();
            $templateImage = $manager->read($templatePath);
            $photoImage = $manager->read($photoPath);

            $diameter = $template->circle_diameter;
            $croppedPhoto = $photoImage->cover($diameter, $diameter);

            $canvas = $templateImage->resize($templateImage->width(), $templateImage->height());

            $canvas->place(
                $croppedPhoto,
                'top-left',
                $template->circle_x,
                $template->circle_y
            );

            $fontSize = 32;
            $maxWidth = $template->name_text_max_width;
            $textWidth = $this->estimateTextWidth($member->full_name, $fontSize);

            while ($textWidth > $maxWidth && $fontSize > 14) {
                $fontSize -= 2;
                $textWidth = $this->estimateTextWidth($member->full_name, $fontSize);
            }

            $canvas->text($member->full_name, function ($font) use ($fontSize, $template) {
                $font->size($fontSize);
                $font->color('#FFFFFF');
                $font->align('center');
                $font->valign('middle');
                $font->filename(storage_path('app/fonts/arial.ttf'));
            }, $template->name_text_x + ($maxWidth / 2), $template->name_text_y);

            $outputPath = 'birthday/generated/' . uniqid('birthday_', true) . '.png';
            $fullOutputPath = Storage::disk('public')->path($outputPath);

            $canvas->save($fullOutputPath, 'png');

            $this->birthdayImage->update([
                'status' => 'done',
                'generated_image_path' => $outputPath,
            ]);
        } catch (\Exception $e) {
            $this->birthdayImage->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    private function estimateTextWidth(string $text, int $fontSize): int
    {
        return (int) (strlen($text) * $fontSize * 0.6);
    }

    public function failed(\Throwable $exception): void
    {
        $this->birthdayImage->update([
            'status' => 'failed',
            'error_message' => $exception->getMessage(),
        ]);
    }
}
