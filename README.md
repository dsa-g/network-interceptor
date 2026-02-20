# Network Editor & Resend

A Chrome DevTools extension to intercept, edit, and resend network requests - similar to Firefox's built-in "Edit and Resend" feature.

## Install

1. Download `network-interceptor-chrome.zip` from the `network-interceptor-chrome/` folder
2. Extract and go to `chrome://extensions/`
3. Enable "Developer mode" → "Load unpacked" → Select extracted folder

## Usage

1. Open DevTools (F12)
2. Go to **"Edit & Resend"** tab
3. Browse any website - requests appear automatically
4. Click a request to edit URL, method, headers, or body
5. Click **Send** to resend with modifications

## Features

- Captures all network requests via Chrome DevTools API
- Edit URL, HTTP method, headers, and request body
- Resend modified requests
- View response status, headers, and body
- Filter requests by URL or method
- Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

## License

MIT
