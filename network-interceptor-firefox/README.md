# Network Editor & Resend - Firefox

Firefox DevTools extension to edit and resend network requests.

## Installation

### From Source
1. Download and extract this folder
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select any file in the extracted folder

### Permanent Installation
To install permanently, you need to sign the extension:
1. Go to https://addons.mozilla.org/developers/
2. Create a free developer account
3. Submit the extension for review (free)
4. Once approved, install from Firefox Add-ons store

## Usage

1. Open DevTools (F12)
2. Go to "Edit & Resend" tab
3. Click any request to edit and resend

## Features

- Captures all network requests via Firefox DevTools API
- Edit URL, HTTP method, headers, and request body
- Resend modified requests
- View response status, headers, and body
- Filter requests by URL or method

## License

MIT
