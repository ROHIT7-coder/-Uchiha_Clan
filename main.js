/* ============================================================
   UCHIHA CLAN — SITE LOGIC
   Reads from CLAN_CONFIG (config.js) and renders every dynamic
   section. Also handles nav behaviour, scroll reveals, tabs,
   the join form, and the highlights lightbox.
   ============================================================ */

(() => {
  const cfg = CLAN_CONFIG;

  /* ---------------- helpers ---------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const fmt = (v, fallback = "TBD") => (v === null || v === undefined || v === "" ? fallback : v);
  const fmtNum = (v) => (v === null || v === undefined ? "—" : v.toLocaleString());
  const icon = (name) => `<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;

  const ICONS = {
    crown: `<path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z"/><path d="M5 21h14"/>`,
    shield: `<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>`,
    instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>`,
    discord: `<path d="M6 8c3-2 9-2 12 0M6 16c3 2 9 2 12 0M5 8c-2 4-2 8 0 10 1.5-1 2.5-2 3-3M19 8c2 4 2 8 0 10-1.5-1-2.5-2-3-3"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>`,
    roblox: `<rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(-8 12 12)"/>`,
    play: `<path d="M6 4l14 8-14 8V4z"/>`,
    trophy: `<path d="M8 21h8M12 17v4M6 4h12v3a6 6 0 01-12 0V4zM6 5H3v2a3 3 0 003 3M18 5h3v2a3 3 0 01-3 3"/>`,
    swords: `<path d="M14 6l6 6-2 2-6-6M10 18l-6-6 2-2 6 6M4 20l4-4M20 4l-4 4"/>`,
    users: `<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15 14.2c2.3.3 4 2.4 4 4.8"/>`,
  };

  /* ---------------- resolve ${icon:name} placeholders written in index.html ---------------- */
  document.body.innerHTML = document.body.innerHTML.replace(/\$\{icon:(\w+)\}/g, (_, name) => icon(name));

  /* ============================================================
     NAV
     ============================================================ */
  const nav = $("#nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  const hamburger = $("#hamburger");
  const mobileMenu = $("#mobile-menu");
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("#mobile-menu a").forEach((a) => a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }));

  /* ============================================================
     BASIC IDENTITY / CONFIG-DRIVEN TEXT
     ============================================================ */
  $$(".js-clan-name").forEach((n) => (n.textContent = cfg.clan.name));
  $$(".js-clan-tagline").forEach((n) => (n.textContent = cfg.clan.tagline));
  $$(".js-clan-game").forEach((n) => (n.textContent = cfg.clan.game));
  $$(".js-discord-invite").forEach((n) => (n.href = cfg.socials.discordInvite));
  $$(".js-owner-ig").forEach((n) => (n.href = cfg.socials.ownerInstagram));
  $$(".js-mod-ig").forEach((n) => (n.href = cfg.socials.moderatorInstagram));
  $$(".js-insta-group").forEach((n) => (n.href = cfg.socials.instagramGroup));
  $$(".js-discord-mod").forEach((n) => (n.textContent = cfg.socials.discordModeratorHandle));

  /* ============================================================
     STATS
     ============================================================ */
  const statDefs = [
    { key: "tournamentsHosted", label: "Tournament Hosted", labelPlural: "Tournaments Hosted" },
    { key: "members", label: "Members" },
    { key: "tournamentWins", label: "Tournament Wins" },
    { key: "activePlayers", label: "Active Players" },
  ];
  const statsGrid = $("#stats-grid");
  statDefs.forEach((def) => {
    const val = cfg.stats[def.key];
    const cell = el("div", "stat-cell");
    const label = (val === 1 && def.label) ? def.label : (def.labelPlural || def.label);
    if (val === null || val === undefined) {
      cell.innerHTML = `<div class="stat-value is-placeholder" data-target="0">TBD</div><div class="stat-label">${label}</div>`;
    } else if (typeof val === "number") {
      cell.innerHTML = `<div class="stat-value" data-target="${val}">0</div><div class="stat-label">${label}</div>`;
    } else {
      // string values (e.g. "50+") — no count-up, shown as-is
      cell.innerHTML = `<div class="stat-value" data-target="text">${val}</div><div class="stat-label">${label}</div>`;
    }
    statsGrid.appendChild(cell);
  });

  /* ============================================================
     STAFF
     ============================================================ */
  const staffGrid = $("#staff-grid");
  cfg.staff.forEach((s) => {
    const card = el("div", "staff-card");
    const links = [];
    if (s.instagram) links.push(`<a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>`);
    if (s.discord) links.push(`<a href="#" aria-label="Discord username">${icon("discord")}</a>`);
    card.innerHTML = `
      <div class="staff-icon">${icon(s.roleIcon)}</div>
      <div class="staff-role">${s.role}</div>
      <div class="staff-name">${fmt(s.name || s.discord, s.label || "Clan Staff")}</div>
      ${s.instagram ? `<a class="btn btn-ghost" href="${s.instagram}" target="_blank" rel="noopener">View Instagram</a>` : ""}
      ${!s.instagram && s.discord ? `<span class="btn btn-ghost" style="cursor:default;">Discord: ${s.discord}</span>` : ""}
    `;
    staffGrid.appendChild(card);
  });

  /* ============================================================
     MEMBERS NOTE (shown when roster is too large to list)
     ============================================================ */
  const membersNoteEl = $("#members-note");
  if (membersNoteEl && cfg.membersNote) {
    membersNoteEl.innerHTML = `
      <span class="members-note-count">${cfg.membersNote.headline}</span>
      <span class="members-note-sep"></span>
      <span class="members-note-sub">${icon("shield")} ${cfg.membersNote.subline}</span>
    `;
  }

  /* ============================================================
     MEMBERS (tabs + cards)
     ============================================================ */
  const memberCategories = [
    { key: "owner", label: "Owner", icon: "crown" },
    { key: "moderators", label: "Moderators", icon: "shield" },
    { key: "elite", label: "Elite", icon: "swords" },
    { key: "members", label: "Members", icon: "users" },
  ];
  const tabsEl = $("#member-tabs");
  const memberGrid = $("#member-grid");

  function renderMemberCard(m) {
    const card = el("div", "member-card");
    const initials = (m.username || "?").slice(0, 2).toUpperCase();
    card.innerHTML = `
      <div class="member-avatar">${initials}</div>
      <div class="member-name">${fmt(m.username)}</div>
      <div class="member-role">${fmt(m.role)}</div>
      <div class="member-meta">
        <span>Discord: <strong>${fmt(m.discord)}</strong></span>
        <span>Main: <strong>${fmt(m.main)}</strong></span>
      </div>
      <div class="member-stat-row">
        <div><span class="num">${fmtNum(m.wins)}</span><span class="lbl">Wins</span></div>
        <div><span class="num">${fmtNum(m.kills)}</span><span class="lbl">Kills</span></div>
        <div><span class="num">${fmtNum(m.points)}</span><span class="lbl">Points</span></div>
      </div>
      <div class="member-links">
        ${m.instagram ? `<a href="${m.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>` : ""}
        ${m.roblox ? `<a href="${m.roblox}" target="_blank" rel="noopener" aria-label="Roblox profile">${icon("roblox")}</a>` : ""}
      </div>
    `;
    return card;
  }

  function renderMembers(catKey) {
    memberGrid.innerHTML = "";
    const list = cfg.members[catKey] || [];
    if (list.length === 0) {
      if (catKey === "members" && cfg.membersNote) {
        memberGrid.appendChild(el("div", "empty-slot members-showcase", `
          <div class="members-showcase-count">${cfg.membersNote.headline}</div>
          <div class="members-showcase-sub">${icon("users")} General clan roster — too many to list individually</div>
        `));
        return;
      }
      memberGrid.appendChild(el("div", "empty-slot", `No ${catKey} added yet — update <code>js/config.js</code> to add roster members here.`));
      return;
    }
    list.forEach((m) => memberGrid.appendChild(renderMemberCard(m)));
  }

  memberCategories.forEach((cat, i) => {
    const count = (cfg.members[cat.key] || []).length;
    const btn = el("button", "tab-btn" + (i === 0 ? " active" : ""), `${icon(cat.icon)} ${cat.label} <span class="tab-count">(${count})</span>`);
    btn.addEventListener("click", () => {
      $$(".tab-btn", tabsEl).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMembers(cat.key);
    });
    tabsEl.appendChild(btn);
  });
  renderMembers(memberCategories[0].key);

  /* ============================================================
     TOURNAMENTS
     ============================================================ */
  const tourneyWrap = $("#tournament-list");
  cfg.tournaments.forEach((t) => {
    const card = el("div", "tournament-card");
    card.innerHTML = `
      <div class="tournament-top">
        <div class="tournament-num">Tournament #${String(t.id).padStart(2, "0")}</div>
        <div class="tournament-status">${fmt(t.status, "TBD")}</div>
      </div>
      <div class="tournament-details">
        <div class="tdetail"><div class="lbl">Name</div><div class="val ${t.name ? "" : "tbd"}">${fmt(t.name)}</div></div>
        <div class="tdetail"><div class="lbl">Date</div><div class="val ${t.date ? "" : "tbd"}">${fmt(t.date)}</div></div>
        <div class="tdetail"><div class="lbl">Participants</div><div class="val ${t.participants ? "" : "tbd"}">${fmt(t.participants)}</div></div>
        <div class="tdetail"><div class="lbl">Prize</div><div class="val ${t.prize ? "" : "tbd"}">${fmt(t.prize)}</div></div>
      </div>
      <div class="podium">
        <div class="podium-slot gold"><div class="place">🥇 Winner</div><div class="name">${fmt(t.winner)}</div></div>
        <div class="podium-slot"><div class="place">🥈 Runner-up</div><div class="name">${fmt(t.runnerUp)}</div></div>
        <div class="podium-slot"><div class="place">🥉 Third</div><div class="name">${fmt(t.thirdPlace)}</div></div>
      </div>
    `;
    tourneyWrap.appendChild(card);
  });

  /* ---------------- next tournament banner ---------------- */
  $("#next-condition").textContent = cfg.nextTournament.condition;
  const goal = cfg.nextTournament.goalFollowers;
  const current = cfg.nextTournament.currentFollowers;
  $("#follower-current").textContent = current === null ? "? followers" : `${fmtNum(current)} followers`;
  $("#follower-goal").textContent = `${fmtNum(goal)} followers`;
  const barInner = $("#follower-bar-inner");
  if (current !== null && goal) {
    const pct = Math.min(100, Math.round((current / goal) * 100));
    requestAnimationFrame(() => (barInner.style.width = pct + "%"));
  } else {
    barInner.style.width = "6%";
    barInner.style.opacity = "0.35";
  }

  /* ============================================================
     BRACKET
     ============================================================ */
  function renderBracketRound(matches) {
    const round = el("div", "bracket-round");
    matches.forEach((m) => {
      const match = el("div", "bracket-match", `<div class="bracket-slot"><span>${m[0]}</span></div><div class="bracket-slot"><span>${m[1]}</span></div>`);
      round.appendChild(match);
    });
    return round;
  }
  const bracketEl = $("#bracket");
  const qf = el("div", "", "");
  qf.appendChild(el("div", "bracket-round-label", "Quarter Finals"));
  bracketEl.appendChild(wrapRound("Quarter Finals", cfg.bracket.quarterFinals));
  bracketEl.appendChild(wrapRound("Semi Finals", cfg.bracket.semiFinals));
  const grandWrap = el("div", "bracket-round");
  grandWrap.appendChild(el("div", "bracket-round-label", "Grand Final"));
  const grandMatch = el("div", "bracket-match", `<div class="bracket-slot"><span>${cfg.bracket.grandFinal[0]}</span></div><div class="bracket-slot"><span>${cfg.bracket.grandFinal[1]}</span></div>`);
  grandWrap.appendChild(grandMatch);
  bracketEl.appendChild(grandWrap);

  const winnerWrap = el("div", "bracket-round");
  winnerWrap.appendChild(el("div", "bracket-round-label", "Winner"));
  winnerWrap.appendChild(el("div", "trophy-box", `${icon("trophy")}<div class="name">${cfg.bracket.winner}</div>`));
  bracketEl.appendChild(winnerWrap);

  function wrapRound(label, matches) {
    const wrap = el("div", "bracket-round");
    wrap.appendChild(el("div", "bracket-round-label", label));
    matches.forEach((m) => {
      wrap.appendChild(el("div", "bracket-match", `<div class="bracket-slot"><span>${m[0]}</span></div><div class="bracket-slot"><span>${m[1]}</span></div>`));
    });
    return wrap;
  }

  /* ============================================================
     LEADERBOARD
     ============================================================ */
  const lbBody = $("#leaderboard-body");
  cfg.leaderboard.forEach((row) => {
    const tr = el("tr", "", `
      <td class="rank-cell">#${String(row.rank).padStart(2, "0")}</td>
      <td>${row.player}</td>
      <td class="num-cell">${String(row.wins).padStart(2, "0")}</td>
      <td class="num-cell">${String(row.kills).padStart(2, "0")}</td>
      <td class="num-cell">${String(row.points).padStart(3, "0")}</td>
    `);
    lbBody.appendChild(tr);
  });

  /* ============================================================
     HIGHLIGHTS + LIGHTBOX
     ============================================================ */
  const highlightGrid = $("#highlight-grid");
  cfg.highlights.forEach((h) => {
    const card = el("div", "highlight-card", `
      <div class="play-icon">${icon("play")}</div>
      <div class="h-title">${h.title}</div>
    `);
    card.addEventListener("click", () => openLightbox(h.title));
    highlightGrid.appendChild(card);
  });

  const lightbox = $("#lightbox");
  const lightboxInner = $("#lightbox-inner");
  function openLightbox(title) {
    lightboxInner.innerHTML = `<span>PLACEHOLDER — "${title}"</span><span>Add real clips in js/config.js → highlights</span>`;
    lightbox.classList.add("open");
  }
  $("#lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("open"); });

  /* ============================================================
     NEWS
     ============================================================ */
  const newsGrid = $("#news-grid");
  cfg.news.forEach((n) => {
    const card = el("div", "news-card", `
      <div class="news-date">${fmt(n.date, "Date TBD")}</div>
      <h4>${n.title}</h4>
      <p>${n.body}</p>
    `);
    newsGrid.appendChild(card);
  });

  /* ============================================================
     HISTORY TIMELINE
     ============================================================ */
  const timeline = $("#timeline");
  cfg.history.forEach((h) => {
    const item = el("div", "timeline-item", `
      <div class="timeline-dot">${h.milestone}</div>
      <h4>${h.title}</h4>
      <p>${h.body}</p>
      <span class="t-date">${fmt(h.date, "Date TBD")}</span>
    `);
    timeline.appendChild(item);
  });

  /* ============================================================
     RULES
     ============================================================ */
  const rulesList = $("#rules-list");
  cfg.rules.forEach((r, i) => {
    rulesList.appendChild(el("div", "rule-item", `<span class="rule-num">0${i + 1}</span><p>${r}</p>`));
  });

  /* ============================================================
     SITE CREDITS
     ============================================================ */
  const creditsEl = $("#credits-block");
  if (creditsEl && cfg.credits) {
    creditsEl.innerHTML = `
      <span>Website made by</span>
      <a href="${cfg.credits.instagram}" target="_blank" rel="noopener" class="credits-name">
        ${icon("instagram")} ${cfg.credits.name}
      </a>
    `;
  }

  /* ============================================================
     FOOTER YEAR
     ============================================================ */
  $("#footer-year").textContent = new Date().getFullYear();

  /* ============================================================
     JOIN FORM (frontend-only — no backend wired up yet)
     ============================================================ */
  const joinForm = $("#join-form");
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    $("#join-success").classList.add("show");
    joinForm.reset();
  });

  /* ============================================================
     CREST — uses the uploaded clan logo (assets/logo.png) wrapped
     in an animated spinning gradient ring. Falls back to a CSS-
     drawn crest if clan.logoImage is null.
     ============================================================ */
  const crestSVG = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crestGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ff3b52"/>
          <stop offset="100%" stop-color="#6d28d9"/>
        </linearGradient>
      </defs>
      <g class="ring-outer">
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#crestGrad)" stroke-width="1.4" stroke-dasharray="4 7" opacity="0.7"/>
      </g>
      <g class="ring-inner">
        <circle cx="50" cy="50" r="36" fill="none" stroke="#c81e3a" stroke-width="1" opacity="0.5"/>
        <circle cx="50" cy="14" r="2.6" fill="#ff3b52"/>
      </g>
      <circle cx="50" cy="50" r="27" fill="none" stroke="rgba(237,233,230,0.35)" stroke-width="1"/>
      <path d="M50 27 L61 58 L50 50 L39 58 Z" fill="url(#crestGrad)"/>
      <text x="50" y="80" text-anchor="middle" font-family="Rajdhani, sans-serif" font-weight="700" font-size="11" fill="#ede9e6" letter-spacing="1">${cfg.clan.logoText}</text>
    </svg>
  `;

  if (cfg.clan.logoImage) {
    $$(".crest-mark").forEach((n) => {
      n.innerHTML = `<span class="logo-ring logo-ring-sm"><img src="${cfg.clan.logoImage}" alt="${cfg.clan.name} logo"></span>`;
    });
    $$(".crest-big").forEach((n) => {
      n.innerHTML = `<span class="logo-ring logo-ring-lg"><img src="${cfg.clan.logoImage}" alt="${cfg.clan.name} logo"></span>`;
    });
  } else {
    $$(".crest-mark, .crest-big").forEach((n) => (n.innerHTML = crestSVG));
  }

  /* ============================================================
     HOVER SPOTLIGHT — a soft glow that tracks the cursor across
     every card-like element, giving hover states a "lit from
     within" feel instead of a flat color swap.
     ============================================================ */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const spotlightTargets = $$(
      ".member-card, .staff-card, .pillar, .tournament-card, .news-card, " +
      ".social-card, .highlight-card, .rule-item, .podium-slot, .bracket-match, .stat-cell"
    );
    spotlightTargets.forEach((card) => {
      card.classList.add("spotlight");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });

    /* ---------------- magnetic buttons ---------------- */
    $$(".btn-primary, .btn-ghost").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.5;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
    });

    /* ---------------- hero ambient cursor glow ---------------- */
    const hero = $(".hero");
    if (hero) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--hx", `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty("--hy", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }

    /* ---------------- gentle tilt on the hero crest ---------------- */
    const heroVisual = $(".hero-visual");
    if (heroVisual) {
      heroVisual.addEventListener("pointermove", (e) => {
        const r = heroVisual.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
        heroVisual.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      heroVisual.addEventListener("pointerleave", () => (heroVisual.style.transform = ""));
    }
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealEls = $$(".reveal, .reveal-stagger");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
        if (entry.target.querySelector(".stat-value")) animateStats(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((n) => io.observe(n));

  function animateStats(container) {
    $$(".stat-value", container).forEach((node) => {
      if (node.dataset.target === "text" || node.classList.contains("is-placeholder")) return;
      const target = parseInt(node.dataset.target, 10);
      if (!target) return;
      let start = 0;
      const dur = 1200;
      const t0 = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target;
      }
      requestAnimationFrame(tick);
    });
  }

  /* ============================================================
     HERO PARTICLE FIELD (lightweight canvas embers)
     ============================================================ */
  const canvas = $("#particle-canvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function makeParticles() {
      const count = Math.min(70, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.35 + 0.08,
        vx: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.7 ? "109,40,217" : "255,59,82",
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    makeParticles();
    draw();
    window.addEventListener("resize", () => { resize(); makeParticles(); }, { passive: true });
  }
})();
