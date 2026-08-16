/* ============================================================
   UCHIHA CLAN — SITE CONFIG
   ------------------------------------------------------------
   This is the ONLY file you should need to touch to update the
   website with new clan info. Everything below is plain data —
   no HTML/CSS knowledge required.

   Fields left as null / empty / "—" are PLACEHOLDERS. The site
   will display them as "TBD" or hide them gracefully until you
   fill them in. Never guess at real numbers — leave them null.
   ============================================================ */

const CLAN_CONFIG = {

  // ---------------------------------------------------------
  // CORE IDENTITY
  // ---------------------------------------------------------
  clan: {
    name: "UCHIHA CLAN",
    tagline: "BUILT DIFFERENT. FIGHT TOGETHER.",
    game: "The Strongest Battlegrounds",
    platform: "Roblox",
    status: "ACTIVE", // shown as a live badge
    logoText: "UC",   // used in the crest mark if no logo image is supplied
    logoImage: "logo.png",  // set to null to fall back to the CSS crest instead
  },

  // ---------------------------------------------------------
  // STATS BAR — leave as null until real numbers exist.
  // Values can be a number (e.g. 12) OR a string (e.g. "50+")
  // ---------------------------------------------------------
  stats: {
    tournamentsHosted: 1,     // confirmed
    members: "50+",           // confirmed — too many to list individually
    tournamentWins: "1",     // placeholder — unknown
    activePlayers: null,      // placeholder — unknown
  },

  // ---------------------------------------------------------
  // SOCIALS
  // ---------------------------------------------------------
  socials: {
    discordInvite: "https://discord.gg/V3yEqscTW",
    instagramGroup: "https://www.instagram.com/direct/t/993635223372334/?hl=en", // Instagram group chat
    ownerInstagram: "https://www.instagram.com/madaraff12345/?hl=en",
    moderatorInstagram: "https://www.instagram.com/itz_me_aswath_ssa/?hl=en",
    discordModeratorHandle: "that_oneguy007",
  },

  // ---------------------------------------------------------
  // MEMBERS SECTION NOTE
  // Shown instead of individual profile cards when the roster
  // is too large to list member-by-member.
  // ---------------------------------------------------------
  membersNote: {
    headline: "50+ MEMBERS",
    subline: "Active Moderators",
  },

  // ---------------------------------------------------------
  // SITE CREDITS — who built the website
  // ---------------------------------------------------------
  credits: {
    name: "that_oneguy077",
    instagram: "https://www.instagram.com/that_oneguy077/?hl=en",
  },

  // ---------------------------------------------------------
  // NEXT TOURNAMENT GATE
  // ---------------------------------------------------------
  nextTournament: {
    condition: "AT 2,000 OWNER INSTAGRAM FOLLOWERS",
    goalFollowers: 2000,
    currentFollowers: "1300+", // placeholder — do not invent, update manually
  },

  // ---------------------------------------------------------
  // STAFF
  // ---------------------------------------------------------
  staff: [
    {
      role: "OWNER",
      roleIcon: "crown",
      name: "Uchiha_Madara", // real name not disclosed — leave null
      instagram: "https://www.instagram.com/madaraff12345/?hl=en",
      discord: "prasanth0233",
    },
    {
      role: "CO-OWNER",
      roleIcon: "crown",
      name: "Shoyo", // real name not disclosed — leave null
      instagram: "https://www.instagram.com/x._shoyo._x/?hl=en",
      discord: "shoyo.hinata20",
    },
    {
      role: "DISCORD MODERATOR",
      roleIcon: "shield",
      name: "That_OneGuy",
      instagram: null,
      discord: "that_oneguy007",
    },
    {
      role: "INSTAGRAM MODERATOR",
      roleIcon: "shield",
      name: "Black Goku",
      instagram: "https://www.instagram.com/itz_me_aswath_ssa/?hl=en",
      discord: null,
      label: "Moderator",
    },
    {
      role: "INSTAGRAM MODERATOR",
      roleIcon: "shield",
      name: "ℕ𝔸𝕍𝔸ℕ𝔼𝔼𝕋ℍ",
      instagram: "https://www.instagram.com/navaneeth3381/?hl=en",
      discord: "navaneeth3381",
      label: "Moderator",
    },
  ],

  // ---------------------------------------------------------
  // MEMBER ROSTER
  // Add new members by copying an existing object in the
  // matching category array. Any field can be left null.
  // ---------------------------------------------------------
  members: {
    owner: [
      {
        username: "Uchiha_madara",
        discord: "prasanth0233",
        role: "Owner",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      },
      {
        username: "Shoyo",
        discord: "shoyo.hinata20",
        role: "Co-Owner",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      },
    ],
    moderators: [
      {
        username: "Black_Goku",
        discord: "aswath_ssa_yt_gamer",
        role: "Moderator",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      },
      {
        username: "ℕ𝔸𝕍𝔸ℕ𝔼𝔼𝕋ℍ",
        discord: "navaneeth3381",
        role: "Moderator",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      }, 
      {
        username: "That_OneGuy",
        discord: "that_oneguy007",
        role: "Moderator",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      },
    ],
    elite: [
       {
        username: "xShadowx",
        discord: null,
        role: "Traitor",
        main: "Garou / Saitama",
        wins: null,
        kills: null,
        points: null,
        instagram: null,
        roblox: null,
        avatar: null,
      },
    ],
    members: [],
  },

  // ---------------------------------------------------------
  // TOURNAMENTS
  // ---------------------------------------------------------
  tournaments: [
    {
      id: 1,
      name: "Uchiha_Tournament!(Hosted by owner)",        // TBD
      status: "COMPLETED",
      date: "10/8/26",        // TBD
      participants: "12+",// TBD
      winner: "Chicken(that_oneguy077)",       // TBD
      runnerUp: "naveen",     // TBD
      thirdPlace: "drown",   // TBD
      prize: "Emote 2nd page choosed by winner",        // TBD
    },
  ],

  // ---------------------------------------------------------
  // BRACKET — placeholder structure, populate when live
  // ---------------------------------------------------------
  bracket: {
    quarterFinals: [
      ["PLAYER", "PLAYER"],
      ["PLAYER", "PLAYER"],
      ["PLAYER", "PLAYER"],
      ["PLAYER", "PLAYER"],
    ],
    semiFinals: [
      ["TBD", "TBD"],
      ["TBD", "TBD"],
    ],
    grandFinal: ["TBD", "TBD"],
    winner: "TBD",
  },

  // ---------------------------------------------------------
  // LEADERBOARD — placeholder rows
  // ---------------------------------------------------------
  leaderboard: [
    { rank: 1, player: "PLAYER", wins: 0, kills: 0, points: 0 },
    { rank: 2, player: "PLAYER", wins: 0, kills: 0, points: 0 },
    { rank: 3, player: "PLAYER", wins: 0, kills: 0, points: 0 },
    { rank: 4, player: "PLAYER", wins: 0, kills: 0, points: 0 },
    { rank: 5, player: "PLAYER", wins: 0, kills: 0, points: 0 },
  ],

    // ---------------------------------------------------------
  // HIGHLIGHTS / MEDIA — placeholder cards until real clips added
  // Add { type: "video"|"image", src: "assets/...", title: "" }
  // ---------------------------------------------------------
  highlights: [
    { type: "placeholder", title: "TSB Clip" },
    { type: "video", src: "Roblox 2026-08-08 11-10-02.mp4", title: "Tournament Clip" },
    { type: "placeholder", title: "1v1 Moment" },
    { type: "placeholder", title: "Combo" },
    { type: "placeholder", title: "Funny Moment" },
    { type: "placeholder", title: "Clan Edit" },
  ],


  // ---------------------------------------------------------
  // NEWS & ANNOUNCEMENTS
  // ---------------------------------------------------------
  news: [
    {
      title: "TOURNAMENT #01",
      body: "Our first tournament has been completed.",
      date: "10/8/26",
    },
    {
      title: "NEXT TOURNAMENT",
      body: "The next tournament will take place when the owner reaches 2,000 Instagram followers.",
      date: null,
    },
    {
      title: "CLAN Moderation Update",
      body: "Added 3 Moderator, 1 Devloper, 1 Traitor In Insta gc.",
      date: "15/8/26",
    },
  ],

  // ---------------------------------------------------------
  // HISTORY / TIMELINE
  // ---------------------------------------------------------
  history: [
    {
      milestone: "01",
      title: "FIRST TOURNAMENT",
      body: "The clan successfully hosted its first tournament.",
      date: "10/8/2026",
    },
    {
      milestone: "02",
      title: "2K FOLLOWER TOURNAMENT",
      body: "Next tournament planned for when the owner reaches 2,000 Instagram followers.",
      date: null,
    },
  ],

  // ---------------------------------------------------------
  // RULES
  // ---------------------------------------------------------
  rules: [
    "Respect clan members.",
    "No cheating or exploiting.",
    "No harassment.",
    "Follow tournament rules.",
    "Follow Discord rules.",
    "Maintain good sportsmanship.",
    "No Racism."
    "Respect others and never hate Anyone."
  ],

};
