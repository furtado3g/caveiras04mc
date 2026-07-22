<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#D4AF37">
        <meta name="description" content="Sistema de Gestão de Motoclube Caveira's MC Brasil">

        <link rel="manifest" href="/manifest.json">

        <title inertia>{{ config('app.name', 'Caveira\'s MC') }}</title>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-950">
        @inertia

        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => console.log('SW registered:', registration))
                        .catch(error => console.log('SW registration failed:', error));
                });
            }
        </script>
    </body>
</html>
