/* ==========================================================================
   MSP Tutor Registration - discipline icons (window.MSPDISC)
   --------------------------------------------------------------------------
   Maps a course code to its subject, a flat line icon and a subtle colour
   tint, so the course list / timetable / dashboard are scannable by subject.
   Colour is derived purely from the code prefix - no data change needed.
   Muted palette on purpose; the brand orange stays reserved for CTAs.
   ========================================================================== */
(function () {
  // Feather-style 24x24 stroke paths.
  const ICON = {
    leaf:   '<path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 9-4 16-9 16z"/><path d="M11 20c0-5 2-9 6-11"/>',
    flask:  '<path d="M9 3h6"/><path d="M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3.5L14 9V3"/><path d="M7 15h10"/>',
    atom:   '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.4"/><ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)"/>',
    graph:  '<path d="M4 4v16h16"/><path d="M4 15c4 0 5-9 9-9 3 0 3 5 7 5"/>',
    network:'<circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><path d="M8 11l8-3.7M8 13l8 3.7"/>',
    pulse:  '<path d="M3 12h4l2.5 7 5-15 2.5 8H21"/>',
    wrench: '<path d="M14.6 6.3a3.8 3.8 0 0 0-5.1 5.1L3 18l3 3 6.6-6.5a3.8 3.8 0 0 0 5.1-5.1l-2.6 2.6-2.3-.6-.6-2.3z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    book:   '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  };

  const MAP = {
    BIO: { label: "Biology",          color: "#1d7a4f", bg: "#e7f4ec", icon: ICON.leaf },
    CHE: { label: "Chemistry",        color: "#6b46c1", bg: "#efeafe", icon: ICON.flask },
    PHY: { label: "Physics",          color: "#0c6f93", bg: "#e3f2fb", icon: ICON.atom },
    MAT: { label: "Maths & Computing",color: "#0f766e", bg: "#e3f4f1", icon: ICON.graph },
    INT: { label: "Interdisciplinary",color: "#475569", bg: "#eef1f5", icon: ICON.network },
    NEU: { label: "Neuroscience",     color: "#b3306f", bg: "#fbe9f2", icon: ICON.pulse },
    PRA: { label: "Practical / skill",color: "#8a5d00", bg: "#fdf0d6", icon: ICON.wrench },
    PRO: { label: "Research project", color: "#1e3a5f", bg: "#e8eef6", icon: ICON.target },
  };
  const DEF = { label: "Course", color: "#334155", bg: "#eef1f5", icon: ICON.book };

  const key = (code) => (code || "").trim().slice(0, 3).toUpperCase();
  const get = (code) => MAP[key(code)] || DEF;

  // Returns an HTML string: a tinted chip containing the subject's icon.
  function chip(code, small) {
    const d = get(code);
    const cls = "disc-chip" + (small ? " sm" : "");
    return `<span class="${cls}" style="background:${d.bg};color:${d.color}" title="${d.label}" aria-hidden="true">` +
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d.icon}</svg></span>`;
  }

  window.MSPDISC = { get, chip, key };
})();
