/* The MSP backend for the hub pages: one Supabase project (EU, Frankfurt), shared with Tutoring.
   The URL and the anon key are public by design; what anyone may do is set by the database rules
   in backend/hub-feedback.sql. No library: plain fetch to Supabase's REST and Auth endpoints.

   MSPFeedback.open({ hub: 'students' | 'staff', tools: ['Student FAQ', ...] })
     opens the "Something not working?" form: tool, kind, message, optional name. If sending fails
     it offers the feedback email address instead, so nothing is lost. */
(function (global) {
  'use strict';

  var BACKEND = {
    url: 'https://jrjimjtpcofcnpynredc.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyamltanRwY29mY25weW5yZWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzQ1NDAsImV4cCI6MjA5NzIxMDU0MH0.FDj0yH2M4hGelnB2cx1uyQPea0hsDOyr7tpzE3LjP2g',
    feedbackEmail: 'msp-digital@maastrichtuniversity.nl'
  };

  function rpc(name, args, token) {
    return fetch(BACKEND.url + '/rest/v1/rpc/' + name, {
      method: 'POST',
      headers: { apikey: BACKEND.key, Authorization: 'Bearer ' + (token || BACKEND.key), 'Content-Type': 'application/json' },
      body: JSON.stringify(args || {})
    }).then(function (r) {
      return r.text().then(function (t) {
        var body = t ? JSON.parse(t) : null;
        if (!r.ok) throw new Error((body && (body.message || body.msg)) || ('HTTP ' + r.status));
        return body;
      });
    });
  }

  var CSS = [
    '.mspfb{border:0;padding:0;border-radius:18px;width:min(560px,calc(100vw - 32px));max-height:calc(100vh - 32px);color:#0F172A;background:#fff;box-shadow:0 30px 80px rgba(1,27,60,.45);font-family:var(--msp-font,system-ui,sans-serif)}',
    '.mspfb::backdrop{background:rgba(1,27,60,.6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}',
    '.mspfb form,.mspfb .done{padding:26px 26px 22px;display:flex;flex-direction:column;gap:16px}',
    '.mspfb h2{font-family:var(--msp-font-display,inherit);font-size:21px;margin:0;letter-spacing:-.01em;color:#011B3C}',
    '.mspfb .lede{margin:-8px 0 0;font-size:13.5px;color:#475569;line-height:1.5}',
    '.mspfb fieldset{border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}',
    '.mspfb legend,.mspfb label.l{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#475569;padding:0;margin-bottom:8px}',
    '.mspfb .chips{display:flex;flex-wrap:wrap;gap:6px}',
    '.mspfb .chips label{position:relative}',
    '.mspfb .chips input{position:absolute;opacity:0;pointer-events:none}',
    '.mspfb .chips span{display:inline-block;padding:7px 12px;border:1.5px solid #E2E8F0;border-radius:999px;font-size:13px;font-weight:600;color:#334155;cursor:pointer;transition:all .15s;background:#fff}',
    '.mspfb .chips span:hover{border-color:#6ED2EC}',
    '.mspfb .chips input:checked+span{background:#011B3C;border-color:#011B3C;color:#fff}',
    '.mspfb .chips input:focus-visible+span{outline:2px solid #6ED2EC;outline-offset:2px}',
    '.mspfb textarea,.mspfb input[type=text]{width:100%;box-sizing:border-box;border:1.5px solid #E2E8F0;border-radius:10px;padding:10px 12px;font:inherit;font-size:14px;color:#0F172A;background:#fff}',
    '.mspfb textarea{min-height:110px;resize:vertical}',
    '.mspfb textarea:focus,.mspfb input[type=text]:focus{outline:2px solid #6ED2EC;outline-offset:1px;border-color:#011B3C}',
    '.mspfb .note{font-size:12.5px;line-height:1.5;color:#64748B;margin:0}',
    '.mspfb .note a{color:#011B3C}',
    '.mspfb .hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    '.mspfb .row{display:flex;gap:10px;justify-content:flex-end;align-items:center;flex-wrap:wrap}',
    '.mspfb .err{font-size:13px;color:#B91C1C;margin:0;margin-right:auto}',
    '.mspfb button{border:0;border-radius:10px;font:inherit;font-size:14px;font-weight:700;padding:10px 18px;cursor:pointer}',
    '.mspfb .go{background:#011B3C;color:#fff}.mspfb .go:hover{background:#0A3060}.mspfb .go[disabled]{opacity:.6;cursor:wait}',
    '.mspfb .ghost{background:#F1F5F9;color:#334155}.mspfb .ghost:hover{background:#E2E8F0}',
    '.mspfb button:focus-visible{outline:2px solid #6ED2EC;outline-offset:2px}',
    '.mspfb .done{align-items:flex-start}',
    '.mspfb .tick{width:44px;height:44px;border-radius:50%;background:#F0FDF4;color:#15803D;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700}'
  ].join('\n');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function open(opts) {
    opts = opts || {};
    if (!document.getElementById('mspfb-css')) {
      var st = document.createElement('style'); st.id = 'mspfb-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var tools = (opts.tools || []).concat(['Something else']);
    var d = document.createElement('dialog');
    d.className = 'mspfb';
    d.setAttribute('aria-labelledby', 'mspfb-title');
    d.innerHTML =
      '<form novalidate>' +
        '<h2 id="mspfb-title">Something not working?</h2>' +
        '<p class="lede">Tell the team that builds these tools. We read every message.</p>' +
        '<fieldset><legend>Which tool?</legend><div class="chips">' +
          tools.map(function (t, i) { return '<label><input type="radio" name="tool" value="' + esc(t) + '"' + (i === 0 ? ' required' : '') + '><span>' + esc(t) + '</span></label>'; }).join('') +
        '</div></fieldset>' +
        '<fieldset><legend>What kind?</legend><div class="chips">' +
          ['Problem', 'Suggestion', 'Other'].map(function (k, i) { return '<label><input type="radio" name="kind" value="' + k + '"' + (i === 0 ? ' checked' : '') + '><span>' + k + '</span></label>'; }).join('') +
        '</div></fieldset>' +
        '<div><label class="l" for="mspfb-msg">Your message</label><textarea id="mspfb-msg" name="message" maxlength="4000" required placeholder="What happened, or what would make it better?"></textarea></div>' +
        '<div><label class="l" for="mspfb-name">Your name (optional)</label><input id="mspfb-name" type="text" name="name" maxlength="120" autocomplete="name"></div>' +
        '<div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
        '<p class="note">Goes to the MSP digital team and is stored in the EU. Please don\'t include sensitive details such as your student number, grades or health information. Want an answer? Email <a href="mailto:' + BACKEND.feedbackEmail + '">' + BACKEND.feedbackEmail + '</a>.</p>' +
        '<div class="row"><p class="err" role="alert"></p><button type="button" class="ghost" data-close>Cancel</button><button type="submit" class="go">Send</button></div>' +
      '</form>';
    document.body.appendChild(d);
    var f = d.querySelector('form'), err = d.querySelector('.err'), go = d.querySelector('.go');
    function close() { d.close(); }
    d.addEventListener('close', function () { d.remove(); if (opts.returnFocus) opts.returnFocus.focus(); });
    d.addEventListener('click', function (e) { if (e.target === d || e.target.hasAttribute('data-close')) close(); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var tool = (f.querySelector('input[name=tool]:checked') || {}).value;
      var message = f.elements.message.value.trim();
      if (!tool) { err.textContent = 'Choose the tool this is about.'; return; }
      if (!message) { err.textContent = 'Write a short message first.'; f.elements.message.focus(); return; }
      if (f.elements.website.value) { thanks(); return; }   // a bot filled the hidden field
      err.textContent = ''; go.disabled = true; go.textContent = 'Sending…';
      rpc('submit_hub_feedback', {
        p_tool: tool, p_message: message, p_category: f.querySelector('input[name=kind]:checked').value,
        p_name: f.elements.name.value.trim() || null, p_hub: opts.hub === 'staff' ? 'staff' : 'students',
        p_page: location.href.slice(0, 300), p_user_agent: navigator.userAgent.slice(0, 300)
      }).then(thanks, function () {
        go.disabled = false; go.textContent = 'Send';
        var mail = 'mailto:' + BACKEND.feedbackEmail + '?subject=' + encodeURIComponent('Hub feedback: ' + tool) + '&body=' + encodeURIComponent(message);
        err.innerHTML = 'Could not send right now. <a href="' + mail + '">Email it instead</a>.';
      });
    });
    function thanks() {
      d.innerHTML = '<div class="done"><div class="tick" aria-hidden="true">✓</div><h2 id="mspfb-title">Thanks, received</h2>' +
        '<p class="lede">The team will look at it. If you need an answer, email ' + BACKEND.feedbackEmail + '.</p>' +
        '<div class="row" style="align-self:stretch"><button type="button" class="go" data-close>Close</button></div></div>';
      d.querySelector('[data-close]').focus();
    }
    d.showModal();
    var first = d.querySelector('input[name=tool]'); if (first) first.focus();
  }

  global.MSPBackend = { config: BACKEND, rpc: rpc };
  global.MSPFeedback = { open: open };
})(window);
