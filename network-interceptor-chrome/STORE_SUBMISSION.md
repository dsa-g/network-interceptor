# Chrome Web Store Submission Guide

## Required Information

### Basic Information
- **Name**: Network Editor & Resend
- **Short Description**: Edit and resend network requests from DevTools
- **Detailed Description**: 
```
A Chrome DevTools extension that allows you to intercept, edit, and resend HTTP requests - similar to Firefox's "Edit and Resend" feature.

Features:
• Captures all network requests automatically via Chrome DevTools API
• Edit request URL, HTTP method, headers, and body
• Resend modified requests with a single click
• View full response including status, headers, and body
• Filter requests by URL pattern or HTTP method
• Supports all HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
• Toggle recording on/off
• Clean, intuitive interface integrated into DevTools

Perfect for:
• API debugging and testing
• Web development
• Security testing
• Learning HTTP protocols

How to use:
1. Install the extension
2. Open DevTools (F12)
3. Go to "Edit & Resend" tab
4. Browse any website - requests appear automatically
5. Click a request to edit and resend

Open Source: https://github.com/dsa-g/network-interceptor
```

### Category
- **Category**: Developer Tools
- **Language**: English

### Screenshots Required (1280x800 or 640x400)
Take screenshots of:
1. Main interface showing captured requests
2. Request editor panel with URL/method/headers/body
3. Response viewer showing results

### Privacy
- **Single Purpose**: Edit and resend network requests for debugging
- **Permissions Justification**:
  - `debugger`: Required to access Chrome DevTools Network API for capturing requests
  - `storage`: Saves user preferences locally

### Support
- **Support URL**: https://github.com/dsa-g/network-interceptor/issues
- **Homepage URL**: https://github.com/dsa-g/network-interceptor

## Submission Steps

1. Go to https://chrome.google.com/webstore/devconsole
2. Click "Add new item"
3. Upload `network-interceptor.zip`
4. Fill in the store listing information above
5. Upload screenshots (take them from your browser)
6. Add privacy policy URL (link to PRIVACY_POLICY.md in your repo)
7. Set visibility to "Public"
8. Pay $5 one-time fee (if not already paid)
9. Submit for review

## Review Process
- Usually takes 24-48 hours
- You'll receive email notification when approved
