/* ==========================================================================
   MSP Tutor Registration - data layer (window.MSP)
   --------------------------------------------------------------------------
   One small API used by index / register / admin pages. It runs in two modes:
     • "live"    - talks to Supabase (real first-come-first-serve + admin).
     • "preview" - config not filled in yet; reads app/assets/demo-data.js so
                    the site is fully browsable offline. Claims are disabled.
   ========================================================================== */
(function () {
  const cfg = window.MSP_CONFIG || {};
  const configured =
    cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("YOUR_") && !cfg.SUPABASE_ANON_KEY.includes("YOUR_");

  let client = null;
  if (configured && window.supabase) {
    client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  const MSP = {
    mode: client ? "live" : "preview",
    isLive: !!client,
    client,
    config: cfg,
  };

  // ---- helpers ------------------------------------------------------------
  function shapeError(error) {
    const raw = (error && (error.message || error.error_description || String(error))) || "Unknown error";
    const code = (raw.split(":")[0] || "").trim();
    const detail = raw.includes(":") ? raw.split(":").slice(1).join(":").trim() : "";
    return { code, detail, raw };
  }

  // ---- public catalogue ---------------------------------------------------
  MSP.getSettings = async function () {
    if (!client) return { registration_open: true, banner_message: null };
    const { data } = await client.from("app_settings").select("*").eq("id", 1).maybeSingle();
    return data || { registration_open: true, banner_message: null };
  };

  // Returns: [{ id, code, title, period, department, groups:[{id,label,day1,...,capacity,claimed,is_open}] }]
  //
  // Public pages only get the periods the office has made visible
  // (app_settings.active_periods). NULL or empty in the database means "show
  // everything", which is how this behaved before that column existed.
  // Pass { includeHidden: true } from the Office Dashboard, which must always
  // see every period so hidden ones can still be managed and switched back on.
  MSP.getCatalogue = async function (opts) {
    const includeHidden = !!(opts && opts.includeHidden);
    if (!client) {
      // preview mode - synthesise ids from the bundled dataset
      const demo = window.MSP_DEMO_DATA || [];
      return demo.map((c, ci) => ({
        id: "demo-c-" + ci, code: c.code, title: c.title, period: c.period, department: c.department,
        coordinator: c.coordinator, coordinator_email: c.coordinator_email,
        prerequisites: c.prerequisites, description: c.description, details: c.details || {},
        groups: c.groups.map((g, gi) => ({
          id: "demo-g-" + ci + "-" + gi, label: g.label,
          day1: g.day1, start1: g.start1, end1: g.end1, day2: g.day2, start2: g.start2, end2: g.end2,
          capacity: g.capacity, claimed: g.claimed, is_open: g.is_open,
        })),
      }));
    }
    const [{ data: courses, error: ce }, { data: groups, error: ge }, settings] = await Promise.all([
      client.from("course").select("*").order("sort"),
      client.from("tutorial_group").select("*").order("sort"),
      includeHidden ? Promise.resolve(null) : MSP.getSettings(),
    ]);
    if (ce) throw ce; if (ge) throw ge;
    const active = settings && settings.active_periods;
    const visible = (c) =>
      includeHidden || !Array.isArray(active) || !active.length || active.includes(c.period);
    const byCourse = {};
    (groups || []).forEach((g) => {
      (byCourse[g.course_id] = byCourse[g.course_id] || []).push({
        id: g.id, label: g.label, day1: g.day1, start1: g.start1, end1: g.end1,
        day2: g.day2, start2: g.start2, end2: g.end2,
        capacity: g.capacity, claimed: g.claimed_count, is_open: g.is_open, sort: g.sort,
      });
    });
    return (courses || []).filter(visible).map((c) => ({
      id: c.id, code: c.code, title: c.title, period: c.period,
      department: c.department, coordinator: c.coordinator, coordinator_email: c.coordinator_email,
      prerequisites: c.prerequisites, description: c.description, details: c.details || {},
      sort: c.sort,
      groups: byCourse[c.id] || [],
    }));
  };

  // ---- the claim (first-come-first-serve) ---------------------------------
  MSP.claim = async function (groupIds, info) {
    if (!client) {
      const e = new Error("PREVIEW_MODE"); e.code = "PREVIEW_MODE"; throw e;
    }
    const { data, error } = await client.rpc("claim_groups", {
      p_group_ids: groupIds,
      p_tutor_name: info.name,
      p_tutor_email: info.email || null,
      p_tutor_type: info.type || null,
      p_affiliation: info.affiliation || null,
      p_phone: info.phone || null,
      p_motivation: info.motivation || null,
    });
    if (error) { const s = shapeError(error); const e = new Error(s.raw); e.code = s.code; e.detail = s.detail; throw e; }
    return data;
  };

  // ---- feedback -----------------------------------------------------------
  // Saves website feedback via the submit_feedback() function (the only public
  // write path - there is no table INSERT policy). Email forwarding to the
  // office is handled SERVER-SIDE by an optional Database Webhook -> Edge
  // Function (see app/supabase/FEEDBACK-SETUP.md), so the browser never holds
  // the email key and saving always works even before email is set up.
  MSP.submitFeedback = async function (fb) {
    if (!client) { const e = new Error("PREVIEW_MODE"); e.code = "PREVIEW_MODE"; throw e; }
    const { data, error } = await client.rpc("submit_feedback", {
      p_message: fb.message,
      p_category: fb.category || "Suggestion",
      p_name: fb.name || null,
      p_email: fb.email || null,
      p_page: fb.page || null,
      p_user_agent: (navigator && navigator.userAgent) || null,
    });
    if (error) { const s = shapeError(error); const e = new Error(s.raw); e.code = s.code; e.detail = s.detail; throw e; }
    return data; // new feedback id
  };

  // ---- realtime -----------------------------------------------------------
  MSP.subscribe = function (onChange) {
    if (!client) return () => {};
    const ch = client
      .channel("msp-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "tutorial_group" }, onChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "course" }, onChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "app_settings" }, onChange)
      .subscribe();
    return () => client.removeChannel(ch);
  };

  // ---- admin --------------------------------------------------------------
  MSP.admin = {
    async signIn(email) {
      if (!client) throw new Error("Supabase not configured.");
      const { error } = await client.auth.signInWithOtp({
        email, options: { emailRedirectTo: window.location.href },
      });
      if (error) throw error;
    },
    async signOut() { if (client) await client.auth.signOut(); },
    async session() {
      if (!client) return null;
      const { data } = await client.auth.getSession();
      return data.session;
    },
    // The event name matters. onAuthStateChange also fires TOKEN_REFRESHED
    // (roughly hourly, and after the laptop wakes) and USER_UPDATED on a
    // session that is already signed in, so a caller that treats every event
    // as a fresh sign-in will re-run whatever it does on sign-in, over and
    // over, for as long as the tab is open.
    onAuth(cb) { if (client) client.auth.onAuthStateChange((event, s) => cb(s, event)); },
    // Throws if the check itself could not run. A thrown error means "we do not
    // know", which is not the same as "you are not an admin", and the dashboard
    // has to tell those two apart or a network blip looks like a rejection.
    async isAllowed() {
      if (!client) return false;
      const { data, error } = await client.rpc("is_admin");
      if (error) throw error;
      return !!data;
    },
    async listRegistrations() {
      const { data, error } = await client
        .from("registration")
        .select("*, tutorial_group(label, course(code,title,period))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async updateGroup(id, patch) {
      const { error } = await client.from("tutorial_group").update(patch).eq("id", id);
      if (error) throw error;
    },

    // ---- catalogue management (Courses & groups in the dashboard) ----------
    // These exist so the office never has to write SQL to run a new period.
    // The matching database permissions live in app/supabase/admin-catalogue.sql;
    // if these throw a "row-level security" error, that file has not been run yet.
    async createCourse(fields) {
      const { data, error } = await client.from("course").insert(fields).select().single();
      if (error) throw error;
      return data;
    },
    async updateCourse(id, patch) {
      const { error } = await client.from("course").update(patch).eq("id", id);
      if (error) throw error;
    },
    async createGroup(fields) {
      const { data, error } = await client.from("tutorial_group").insert(fields).select().single();
      if (error) throw error;
      return data;
    },
    // Deletes are refused by the database while anyone holds a confirmed place,
    // in which case the delete matches no rows rather than failing loudly. We
    // turn that silence into a real message so nobody thinks it worked.
    async deleteGroup(id) {
      const { data, error } = await client.from("tutorial_group").delete().eq("id", id).select("id");
      if (error) throw error;
      if (!data || !data.length) throw new Error("BLOCKED_BY_REGISTRATION");
    },
    async deleteCourse(id) {
      const { data, error } = await client.from("course").delete().eq("id", id).select("id");
      if (error) throw error;
      if (!data || !data.length) throw new Error("BLOCKED_BY_REGISTRATION");
    },
    // Copy a whole course, with all of its groups, into another period - the
    // fast way to build next period's catalogue. The copy always starts empty:
    // no registrations come along, and every group is open.
    async duplicateCourse(courseId, targetPeriod) {
      const { data: src, error: e1 } =
        await client.from("course").select("*").eq("id", courseId).single();
      if (e1) throw e1;
      const { data: groups, error: e2 } =
        await client.from("tutorial_group").select("*").eq("course_id", courseId).order("sort");
      if (e2) throw e2;

      const copy = Object.assign({}, src, { period: targetPeriod });
      delete copy.id; delete copy.created_at;
      const { data: made, error: e3 } =
        await client.from("course").insert(copy).select().single();
      if (e3) throw e3;

      if (groups && groups.length) {
        const rows = groups.map((g) => {
          const c = Object.assign({}, g, { course_id: made.id, claimed_count: 0, is_open: true });
          delete c.id; delete c.created_at;
          return c;
        });
        const { error: e4 } = await client.from("tutorial_group").insert(rows);
        if (e4) {
          // The course landed but its groups did not. Say so plainly; the empty
          // course can be deleted from the dashboard because nobody claimed it.
          throw new Error("The course was copied but its groups were not: " + (e4.message || e4));
        }
      }
      return made;
    },
    async withdraw(regId) {
      const { error } = await client.from("registration").update({ status: "withdrawn" }).eq("id", regId);
      if (error) throw error;
    },
    // Which periods tutors can see. Pass null (or every period) to show all.
    async setActivePeriods(periods) {
      const value = periods && periods.length ? periods : null;
      const { error } = await client.from("app_settings").update({ active_periods: value }).eq("id", 1);
      if (error) throw error;
    },
    async setRegistrationOpen(open, banner) {
      const patch = { registration_open: open };
      if (banner !== undefined) patch.banner_message = banner;
      const { error } = await client.from("app_settings").update(patch).eq("id", 1);
      if (error) throw error;
    },
    async listFeedback() {
      const { data, error } = await client
        .from("feedback").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async setFeedbackHandled(id, handled) {
      const { error } = await client.from("feedback").update({ handled }).eq("id", id);
      if (error) throw error;
    },
    async deleteFeedback(id) {
      const { error } = await client.from("feedback").delete().eq("id", id);
      if (error) throw error;
    },
  };

  // human-readable messages for claim failures
  MSP.CLAIM_MESSAGES = {
    GROUP_FULL: (d) => `Group ${d} was just taken by someone else. It has been removed from your selection - please pick another.`,
    GROUP_CLOSED: (d) => `Group ${d} has been closed by the office. Please pick another.`,
    REGISTRATION_CLOSED: () => "Registration is currently closed. Please contact the MSP office.",
    NAME_REQUIRED: () => "Please enter your full name.",
    NO_GROUPS: () => "Please select at least one tutorial group.",
    GROUP_NOT_FOUND: () => "One of the selected groups no longer exists. Please refresh and try again.",
    PREVIEW_MODE: () => "This is a preview. Connect Supabase (see app/assets/config.js) to take live registrations.",
  };

  window.MSP = MSP;
})();
