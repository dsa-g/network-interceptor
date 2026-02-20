let requests = [];
let selectedRequest = null;
let isRecording = true;

document.getElementById('filter').addEventListener('input', renderList);
document.getElementById('methodFilter').addEventListener('change', renderList);
document.getElementById('clearBtn').addEventListener('click', () => {
  requests = [];
  selectedRequest = null;
  renderList();
  renderEditor();
});
document.getElementById('recordCheck').addEventListener('change', (e) => {
  isRecording = e.target.checked;
});

browser.devtools.network.onRequestFinished.addListener((request) => {
  if (!isRecording) return;
  
  const entry = {
    id: Date.now() + Math.random(),
    url: request.request.url,
    method: request.request.method,
    headers: request.request.headers || [],
    postData: request.request.postData,
    status: request.response.status,
    statusText: request.response.statusText,
    time: new Date().toISOString(),
    har: request
  };
  
  requests.unshift(entry);
  if (requests.length > 200) requests.pop();
  renderList();
});

function renderList() {
  const list = document.getElementById('requestList');
  const filter = document.getElementById('filter').value.toLowerCase();
  const methodFilter = document.getElementById('methodFilter').value;
  
  const filtered = requests.filter(r => {
    if (methodFilter && r.method !== methodFilter) return false;
    if (filter && !r.url.toLowerCase().includes(filter)) return false;
    return true;
  });
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty" style="height:100%;padding:20px;text-align:center;">No requests</div>';
    return;
  }
  
  list.innerHTML = filtered.map(r => `
    <div class="request-item ${selectedRequest?.id === r.id ? 'selected' : ''}" data-id="${r.id}">
      <div>
        <span class="method method-${r.method}">${r.method}</span>
        <span class="status status-${String(r.status)[0]}xx">${r.status}</span>
      </div>
      <div class="url">${formatUrl(r.url)}</div>
    </div>
  `).join('');
  
  list.querySelectorAll('.request-item').forEach(el => {
    el.addEventListener('click', () => selectRequest(el.dataset.id));
  });
}

function formatUrl(url) {
  try {
    const u = new URL(url);
    let path = u.pathname + u.search;
    if (path.length > 40) path = path.substring(0, 40) + '...';
    return path;
  } catch { return url.substring(0, 40); }
}

function selectRequest(id) {
  selectedRequest = requests.find(r => r.id == id);
  renderList();
  renderEditor();
}

function renderEditor() {
  const editor = document.getElementById('editor');
  
  if (!selectedRequest) {
    editor.innerHTML = '<div class="empty">Select a request to edit and resend</div>';
    return;
  }
  
  const headersText = selectedRequest.headers
    .map(h => `${h.name}: ${h.value}`)
    .join('\n');
  
  let bodyText = '';
  if (selectedRequest.postData) {
    bodyText = selectedRequest.postData.text || '';
  }
  
  editor.innerHTML = `
    <div class="editor-header">${selectedRequest.method} ${formatUrl(selectedRequest.url)}</div>
    <div class="editor-content">
      <div class="tabs">
        <div class="tab active" data-tab="request">Request</div>
        <div class="tab" data-tab="response">Response</div>
      </div>
      
      <div id="tabRequest">
        <div class="form-group">
          <label>URL</label>
          <input class="form-control" id="editUrl" value="${escapeHtml(selectedRequest.url)}">
        </div>
        <div class="form-group">
          <label>Method</label>
          <select class="form-control" id="editMethod">
            ${['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => 
              `<option ${selectedRequest.method === m ? 'selected' : ''}>${m}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Headers</label>
          <textarea class="form-control" id="editHeaders" style="min-height:100px;">${escapeHtml(headersText)}</textarea>
        </div>
        <div class="form-group">
          <label>Body</label>
          <textarea class="form-control" id="editBody">${escapeHtml(bodyText)}</textarea>
        </div>
        <button class="btn btn-primary" id="sendBtn" style="width:100%;">Send</button>
      </div>
      
      <div id="tabResponse" style="display:none;">
        <div id="responseContent"></div>
      </div>
    </div>
  `;
  
  editor.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      editor.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('tabRequest').style.display = t.dataset.tab === 'request' ? 'block' : 'none';
      document.getElementById('tabResponse').style.display = t.dataset.tab === 'response' ? 'block' : 'none';
    });
  });
  
  document.getElementById('sendBtn').addEventListener('click', sendRequest);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function sendRequest() {
  const btn = document.getElementById('sendBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  const url = document.getElementById('editUrl').value;
  const method = document.getElementById('editMethod').value;
  const headersText = document.getElementById('editHeaders').value;
  const body = document.getElementById('editBody').value;
  
  const headers = {};
  headersText.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim();
      if (key) headers[key] = value;
    }
  });
  
  delete headers['Cookie'];
  delete headers['cookie'];
  delete headers['Host'];
  delete headers['host'];
  delete headers['Content-Length'];
  delete headers['content-length'];
  
  try {
    const options = { method, headers, credentials: 'include' };
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = body;
    }
    
    const response = await fetch(url, options);
    const respHeaders = {};
    response.headers.forEach((v, k) => respHeaders[k] = v);
    
    let respBody;
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try { respBody = await response.json(); } 
      catch { respBody = await response.text(); }
    } else {
      respBody = await response.text();
    }
    
    showResponse(response.status, response.statusText, respHeaders, respBody);
  } catch (err) {
    showResponse(0, 'Error', {}, err.message);
  }
  
  btn.textContent = 'Send';
  btn.disabled = false;
}

function showResponse(status, statusText, headers, body) {
  document.querySelector('.tab[data-tab="response"]').click();
  
  const statusClass = status >= 200 && status < 300 ? 's2xx' : 
                      status >= 400 ? 's4xx' : 
                      status >= 300 ? 's3xx' : 'error';
  
  const headersText = Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join('\n');
  const bodyText = typeof body === 'object' ? JSON.stringify(body, null, 2) : String(body);
  
  document.getElementById('responseContent').innerHTML = `
    <span class="status-badge ${statusClass}">${status} ${statusText}</span>
    <div class="form-group">
      <label>Response Headers</label>
      <div class="response-viewer">${escapeHtml(headersText)}</div>
    </div>
    <div class="form-group">
      <label>Response Body</label>
      <div class="response-viewer">${escapeHtml(bodyText)}</div>
    </div>
  `;
}

renderList();
