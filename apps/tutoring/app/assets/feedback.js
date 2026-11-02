/* ==========================================================================
   MSP Tutor Registration - feedback widget (shared on every page).
   Injects a "Share feedback" link into the footer and a small modal. Submits
   via MSP.submitFeedback (saved in Supabase; optionally emailed to the office).
   Defensive: if anything is missing it silently no-ops and never breaks a page.
   ========================================================================== */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (!window.MSP) return;
    const page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";

    // ---- trigger in the footer -------------------------------------------
    const footer = document.querySelector("footer .footer-inner");
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "fb-trigger";
    trigger.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Share feedback';
    if (footer) {
      const copy = footer.querySelector(".copy");
      if (copy) footer.insertBefore(trigger, copy); else footer.appendChild(trigger);
    } else {
      trigger.classList.add("fb-trigger-float");
      document.body.appendChild(trigger);
    }

    // ---- modal ------------------------------------------------------------
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="modal-overlay" id="fb-overlay"></div>
      <div class="modal" id="fb-modal" role="dialog" aria-modal="true" aria-labelledby="fb-title">
        <div class="head">
          <h3 id="fb-title">Share your feedback</h3>
          <button class="close" id="fb-close" aria-label="Close">×</button>
        </div>
        <div class="body" id="fb-body"></div>
      </div>`;
    document.body.appendChild(wrap);

    const $ = (id) => document.getElementById(id);
    const esc = (s) => (s == null ? "" : String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

    function show(on) {
      $("fb-overlay").classList.toggle("active", on);
      $("fb-modal").classList.toggle("active", on);
    }
    function close() { show(false); }

    function formHTML() {
      return `
        <p style="margin-top:0;font-size:14px;color:var(--muted)">
          Help us improve the tutor-registration site - suggestions, problems, or anything you'd change. It goes straight to the MSP office.</p>
        <div id="fb-err"></div>
        <div class="field">
          <label for="fb-cat">Type of feedback</label>
          <select id="fb-cat">
            <option>Suggestion</option>
            <option>Problem</option>
            <option>Compliment</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field">
          <label for="fb-msg">Your feedback <span class="req">*</span></label>
          <textarea id="fb-msg" placeholder="What would you improve, add, or change?"></textarea>
        </div>
        <div class="row2">
          <div class="field"><label for="fb-name">Name (optional)</label><input id="fb-name" type="text" autocomplete="name"></div>
          <div class="field"><label for="fb-email">Email (optional)</label><input id="fb-email" type="email" autocomplete="email" placeholder="If you'd like a reply"></div>
        </div>
        <button class="btn btn-primary" id="fb-send" style="width:100%">Send feedback</button>
        <p class="hint" style="text-align:center;margin-top:12px">We read every message. Name and email are optional - see the <a href="privacy.html" target="_blank" rel="noopener">privacy statement</a>.</p>`;
    }

    const errBox = (m) => `<div class="notice err" style="margin:0 0 14px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg><div>${m}</div></div>`;

    function openModal() {
      $("fb-title").textContent = "Share your feedback";
      $("fb-body").innerHTML = formHTML();
      $("fb-send").addEventListener("click", send);
      show(true);
      setTimeout(() => $("fb-msg").focus(), 60);
    }

    async function send() {
      const message = $("fb-msg").value.trim();
      const err = $("fb-err"); err.innerHTML = "";
      if (!message) { err.innerHTML = errBox("Please enter your feedback first."); $("fb-msg").focus(); return; }
      const btn = $("fb-send"); btn.disabled = true; btn.textContent = "Sending...";
      try {
        await MSP.submitFeedback({
          message, category: $("fb-cat").value,
          name: $("fb-name").value.trim(), email: $("fb-email").value.trim(), page,
        });
        success();
      } catch (e) {
        if (e.code === "PREVIEW_MODE") {
          err.innerHTML = errBox("This is a preview - connect Supabase to send feedback for real.");
        } else {
          err.innerHTML = errBox("Sorry, something went wrong. Please try again, or email the office directly.");
        }
        btn.disabled = false; btn.textContent = "Send feedback";
      }
    }

    function success() {
      $("fb-title").textContent = "Thank you!";
      $("fb-body").innerHTML = `
        <div class="success-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
        <div class="notice ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          <div>Your feedback has reached the MSP office. We really appreciate it.</div></div>
        <button class="btn btn-ghost" id="fb-done" style="width:100%">Close</button>`;
      $("fb-done").addEventListener("click", close);
    }

    trigger.addEventListener("click", openModal);
    $("fb-overlay").addEventListener("click", close);
    $("fb-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  });
})();
