# Network Editor & Resend

A browser DevTools extension to intercept, edit, and resend network requests - similar to Firefox's built-in "Edit and Resend" feature.

Available for:
- **Chrome** - `network-interceptor-chrome/`
- **Firefox** - `network-interceptor-firefox/`
- **Edge** - `network-interceptor-edge/`

## Quick Install

### Chrome
1. Download `network-interceptor-chrome.zip` from the respective folder
2. Extract and go to `chrome://extensions/`
3. Enable "Developer mode" → "Load unpacked" → Select extracted folder

### Firefox (Free to publish!)
1. Download `network-interceptor-firefox.zip`
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on" → Select any file
4. **To publish free**: Go to https://addons.mozilla.org/developers/

### Edge (Free to publish!)
1. Download `network-interceptor-edge.zip`
2. Go to `edge://extensions/`
3. Enable "Developer mode" → "Load unpacked" → Select extracted folder
4. **To publish free**: Go to https://partner.microsoft.com/dashboard

## Usage

1. Open DevTools (F12)
2. Go to **"Edit & Resend"** tab
3. Browse any website - requests appear automatically
4. Click a request to edit URL, method, headers, or body
5. Click **Send** to resend with modifications

## Features

- Captures all network requests
- Edit URL, HTTP method, headers, and request body
- Resend modified requests
- View response status, headers, and body
- Filter requests by URL or method
- Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

## Publishing (All Free Except Chrome)

| Browser | Store | Cost |
|---------|-------|------|
| Firefox | https://addons.mozilla.org/developers/ | **Free** |
| Edge | https://partner.microsoft.com/dashboard | **Free** |
| Chrome | https://chrome.google.com/webstore/devconsole | $5 one-time |

## License

MIT
