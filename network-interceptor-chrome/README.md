# Network Editor & Resend

A Chrome DevTools extension to intercept, edit, and resend network requests - similar to Firefox's "Edit and Resend" feature.

## Installation

1. Open `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this folder

## Usage

1. Open DevTools (F12)
2. Go to **"Edit & Resend"** tab
3. Browse any website - requests appear automatically
4. Click a request to edit URL, method, headers, or body
5. Click **Send** to resend with modifications
6. View the response in the Response tab

## Features

- Captures all network requests via Chrome DevTools API
- Edit URL, HTTP method, headers, and request body
- Resend modified requests
- View response status, headers, and body
- Filter requests by URL or method
- Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

## License

MIT
