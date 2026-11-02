/* ==========================================================================
   CONFIGURE ME  -  the only file you normally need to edit.
   --------------------------------------------------------------------------
   1. Create a free project at https://supabase.com (choose an EU region,
      e.g. Frankfurt, so tutor data stays in the EU).
   2. In the Supabase dashboard go to:  Project Settings > API
   3. Copy the "Project URL" and the "anon public" key below.
   4. The anon key is SAFE to publish - it can only do what the database's
      Row-Level-Security rules allow (read availability; never read who
      registered). See app/supabase/schema.sql.

   Leave these as the placeholder values to run the site in offline PREVIEW
   mode (it shows the real catalogue but cannot take live registrations).
   ========================================================================== */
window.MSP_CONFIG = {
  SUPABASE_URL: "https://jrjimjtpcofcnpynredc.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyamltanRwY29mY25weW5yZWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzQ1NDAsImV4cCI6MjA5NzIxMDU0MH0.FDj0yH2M4hGelnB2cx1uyQPea0hsDOyr7tpzE3LjP2g",

  // ------------------------------------------------------------------------
  // SAFE TO EDIT ANY TIME (these are just text shown on the website).
  // Change the words inside the quotes, keep the quotes and the comma.
  // ------------------------------------------------------------------------
  // The academic year shown in the page header.
  ACADEMIC_YEAR: "2026 / 2027",
  // The email shown as the "Questions?" contact (footer + after sign-up).
  CONTACT_EMAIL: "msp-operations@maastrichtuniversity.nl"
};
