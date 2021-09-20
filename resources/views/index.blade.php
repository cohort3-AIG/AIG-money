<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/library/library.js') }}"></script>
    <script src="{{ asset('js/index.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/cleave.min.js"></script>
    <script src="{{ asset('js/main.js') }}"></script>
</body>

</html>
