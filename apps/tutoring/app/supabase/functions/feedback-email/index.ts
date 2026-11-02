// ============================================================================
// feedback-email - Supabase Edge Function
// ----------------------------------------------------------------------------
// Emails each new website feedback to the MSP office. It is triggered by a
// Supabase *Database Webhook* on INSERT into the `feedback` table (server to
// server), so the email API key never touches the browser. See
// app/supabase/FEEDBACK-SETUP.md for the one-time setup.
//
// Required secrets (supabase secrets set ...):
//   RESEND_API_KEY   API key from https://resend.com  (free tier is plenty)
//   FEEDBACK_FROM    verified sender, e.g. "MSP Tutoring <feedback@your-domain>"
//                    (for a quick test you can use "onboarding@resend.dev")
//   WEBHOOK_SECRET   any long random string; must match the webhook's header
// Optional:
//   FEEDBACK_TO      recipient (default: msp-operations@maastrichtuniversity.nl)
// ============================================================================

const TO = Deno.env.get("FEEDBACK_TO") ?? "msp-operations@maastrichtuniversity.nl";
const FROM = Deno.env.get("FEEDBACK_FROM") ?? "onboarding@resend.dev";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? "";

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  // Verify the shared secret so only our webhook can trigger emails.
  if (WEBHOOK_SECRET) {
    const got = req.headers.get("x-webhook-secret") ?? "";
    if (got !== WEBHOOK_SECRET) return new Response("Unauthorized", { status: 401 });
  }

  let body: any;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }

  // Supabase DB webhooks send { type, table, record, ... }; allow a raw row too.
  const f = body?.record ?? body ?? {};
  if (!f.message) return new Response("No feedback message", { status: 400 });

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set - cannot send email.");
    return new Response("Email not configured", { status: 500 });
  }

  const who = [f.name, f.email].filter(Boolean).join(" · ") || "Anonymous";
  const subject = `MSP Tutoring feedback - ${f.category ?? "Feedback"}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#101b2c;line-height:1.55">
      <h2 style="margin:0 0 4px;color:#001C3D">New website feedback</h2>
      <p style="margin:0 0 16px;color:#566072">From the MSP Tutor Registration site.</p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#566072">Type</td><td><strong>${esc(f.category)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#566072">From</td><td>${esc(who)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#566072">Page</td><td>${esc(f.page)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#566072">When</td><td>${esc(f.created_at)}</td></tr>
      </table>
      <div style="margin-top:16px;padding:14px 16px;background:#f5f7f9;border-left:4px solid #E84E10;border-radius:6px;white-space:pre-wrap">${esc(f.message)}</div>
      ${f.email ? `<p style="margin-top:16px;font-size:13px;color:#566072">Reply to: <a href="mailto:${esc(f.email)}">${esc(f.email)}</a></p>` : ""}
    </div>`;

  const payload: Record<string, unknown> = {
    from: FROM, to: [TO], subject, html,
  };
  if (f.email) payload.reply_to = f.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", res.status, detail);
    return new Response("Email failed", { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
});
