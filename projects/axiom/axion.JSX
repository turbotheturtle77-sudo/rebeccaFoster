import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [sideNav, setSideNav] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [settingsTab, setSettingsTab] = useState("profile");
  const [plan, setPlan] = useState("monthly");
  const [seats, setSeats] = useState(5);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const go = (p, nav) => { setPage(p); if (nav) setSideNav(nav); };

  // ── DESIGN TOKENS ────────────────────────────────────────────────
  const c = {
    bg:      "#06080F",
    bg2:     "#0B1020",
    surf:    "#101624",
    surf2:   "#161E30",
    brd:     "#1A2640",
    brdHov:  "#2A3F60",
    amber:   "#FFAA00",
    amberL:  "#FFAA0020",
    teal:    "#00D4B1",
    tealL:   "#00D4B115",
    red:     "#FF5757",
    redL:    "#FF575720",
    text:    "#DFE5F0",
    muted:   "#4A5C7A",
    sub:     "#7A8FAA",
    white:   "#FFFFFF",
  };

  const f  = { fontFamily: "'Sora', sans-serif" };
  const mo = { fontFamily: "'Space Mono', monospace" };

  // ── SHARED PRIMITIVES ────────────────────────────────────────────
  const card = { background: c.surf, border: `1px solid ${c.brd}`, borderRadius: "12px", padding: "24px" };
  const inp  = { background: c.bg2, border: `1px solid ${c.brd}`, borderRadius: "8px", padding: "12px 16px", color: c.text, fontSize: "14px", width: "100%", boxSizing: "border-box", outline: "none", ...f };
  const lbl  = { color: c.sub, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "7px", display: "block", ...f };

  const Btn = ({ children, v = "amber", onClick, full, sm }) => {
    const base = { border: "none", cursor: "pointer", borderRadius: "9px", fontWeight: 700, fontSize: sm ? "13px" : "14px", padding: sm ? "8px 16px" : "12px 24px", transition: "opacity 0.15s", width: full ? "100%" : "auto", ...f };
    const vs = {
      amber:  { background: c.amber, color: "#000" },
      ghost:  { background: "transparent", border: `1px solid ${c.brd}`, color: c.text },
      teal:   { background: c.tealL, border: `1px solid ${c.teal}40`, color: c.teal },
      danger: { background: c.redL,  border: `1px solid ${c.red}40`,  color: c.red  },
    };
    return <button style={{ ...base, ...vs[v] }} onClick={onClick}>{children}</button>;
  };

  const Badge = ({ children, col = "teal" }) => {
    const cols = { teal: [c.tealL, c.teal], amber: [c.amberL, c.amber], red: [c.redL, c.red], sub: [`${c.sub}15`, c.sub] };
    return (
      <span style={{ background: cols[col][0], color: cols[col][1], fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", letterSpacing: "0.04em", ...f }}>
        {children}
      </span>
    );
  };

  const Logo = ({ onClick }) => (
    <div onClick={onClick} style={{ fontSize: "21px", fontWeight: 800, color: c.amber, letterSpacing: "-0.02em", cursor: onClick ? "pointer" : "default", ...f }}>
      AXIOM<span style={{ color: c.teal }}>.</span>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  //  LANDING PAGE
  // ════════════════════════════════════════════════════════════════
  if (page === "landing") {
    const feats = [
      { icon: "⚡", h: "Real-time Ingestion", d: "Stream any event, from any source, with sub-100ms latency at any scale." },
      { icon: "🔗", h: "500+ Integrations", d: "Postgres, Kafka, Snowflake, S3, webhooks — connect your entire stack." },
      { icon: "🛡️", h: "SOC 2 Type II", d: "Enterprise-grade security, end-to-end encryption, full audit logs." },
      { icon: "📊", h: "Unlimited Dashboards", d: "Drag-and-drop builder. Pixel-perfect. Shareable in one click." },
      { icon: "🤖", h: "AI Anomaly Detection", d: "Let the AI surface issues, forecast trends, and write your reports." },
      { icon: "👥", h: "Team Collaboration", d: "Annotate data, share insights, comment on dashboards in real-time." },
    ];
    const pricing = [
      { name: "Starter", price: "$0", sub: "For individuals", feats: ["5 dashboards", "1 data source", "7-day retention", "Community support"] },
      { name: "Pro", price: "$49", sub: "For growing teams", hot: true, feats: ["Unlimited dashboards", "25 data sources", "90-day retention", "Priority support", "AI insights"] },
      { name: "Enterprise", price: "Custom", sub: "For large orgs", feats: ["Everything in Pro", "Unlimited sources", "Custom retention", "SSO & RBAC", "SLA guarantee"] },
    ];
    const stats = [["12B+", "Events/day"], ["99.99%", "Uptime"], ["<50ms", "Latency"], ["8,400+", "Companies"]];
    return (
      <div style={{ background: c.bg, minHeight: "100vh", color: c.text, ...f }}>
        {/* NAV */}
        <nav style={{ padding: "18px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${c.brd}`, position: "sticky", top: 0, background: c.bg + "F0", zIndex: 99, backdropFilter: "blur(12px)" }}>
          <Logo />
          <div style={{ display: "flex", gap: "30px", color: c.sub, fontSize: "14px", fontWeight: 500 }}>
            {["Features","Pricing","Docs","Blog"].map(t => <span key={t} style={{ cursor: "pointer", transition: "color 0.15s" }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Btn v="ghost" onClick={() => go("auth")}>Sign in</Btn>
            <Btn onClick={() => go("auth")}>Get started →</Btn>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "100px 40px 80px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: c.amberL, border: `1px solid ${c.amber}40`, borderRadius: "20px", padding: "6px 16px", marginBottom: "32px" }}>
            <span style={{ width: "7px", height: "7px", background: c.teal, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${c.teal}` }}></span>
            <span style={{ fontSize: "13px", color: c.amber, fontWeight: 600 }}>Now with AI-powered anomaly detection</span>
          </div>
          <h1 style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px", color: c.white }}>
            Data that moves<br />
            <span style={{ color: c.amber }}>at the speed</span> of you.
          </h1>
          <p style={{ fontSize: "17px", color: c.sub, lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 44px" }}>
            Axiom turns raw event data into live dashboards, instant alerts, and AI-generated reports — without the engineering overhead.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => go("auth")} style={{ background: c.amber, border: "none", color: "#000", padding: "15px 36px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", fontWeight: 800, ...f }}>Start for free →</button>
            <button onClick={() => go("dashboard", "dashboard")} style={{ background: "transparent", border: `1px solid ${c.brd}`, color: c.text, padding: "15px 36px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", ...f }}>View demo</button>
          </div>
          {/* STATS */}
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", marginTop: "80px", paddingTop: "56px", borderTop: `1px solid ${c.brd}` }}>
            {stats.map(([n, l]) => (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px", fontWeight: 800, color: c.white, letterSpacing: "-0.02em", ...mo }}>{n}</div>
                <div style={{ fontSize: "12px", color: c.muted, marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 800, color: c.white, marginBottom: "10px" }}>Everything you need.</h2>
            <p style={{ color: c.sub, fontSize: "15px" }}>Built for engineers, loved by analysts.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {feats.map(ft => (
              <div key={ft.h} style={card}>
                <div style={{ fontSize: "26px", marginBottom: "12px" }}>{ft.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: c.white, marginBottom: "7px" }}>{ft.h}</div>
                <div style={{ fontSize: "13px", color: c.sub, lineHeight: 1.65 }}>{ft.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 800, color: c.white, marginBottom: "10px" }}>Simple pricing.</h2>
            <p style={{ color: c.sub, fontSize: "15px" }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", alignItems: "start" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ ...card, border: `1px solid ${p.hot ? c.amber : c.brd}`, background: p.hot ? "#18120A" : c.surf, position: "relative" }}>
                {p.hot && <div style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)", background: c.amber, color: "#000", fontSize: "10px", fontWeight: 800, padding: "3px 12px", borderRadius: "10px", letterSpacing: "0.06em" }}>MOST POPULAR</div>}
                <div style={{ fontSize: "12px", fontWeight: 700, color: p.hot ? c.amber : c.sub, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</div>
                <div style={{ fontSize: "38px", fontWeight: 800, color: c.white, letterSpacing: "-0.02em", marginBottom: "4px", ...mo }}>{p.price}</div>
                <div style={{ fontSize: "12px", color: c.muted, marginBottom: "22px" }}>{p.sub}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "24px" }}>
                  {p.feats.map(ft => (
                    <div key={ft} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", color: c.sub }}>
                      <span style={{ color: c.teal, fontWeight: 700 }}>✓</span>{ft}
                    </div>
                  ))}
                </div>
                <button onClick={() => go("auth")} style={{ width: "100%", background: p.hot ? c.amber : "transparent", border: `1px solid ${p.hot ? c.amber : c.brd}`, color: p.hot ? "#000" : c.text, padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "14px", ...f }}>
                  {p.price === "Custom" ? "Contact sales" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div style={{ maxWidth: "1100px", margin: "0 auto 80px", padding: "0 40px" }}>
          <div style={{ background: `linear-gradient(135deg, #120D00, #0B1020)`, border: `1px solid ${c.amber}30`, borderRadius: "16px", padding: "60px", textAlign: "center" }}>
            <h2 style={{ fontSize: "38px", fontWeight: 800, color: c.white, marginBottom: "12px" }}>Ready to stop flying blind?</h2>
            <p style={{ color: c.sub, fontSize: "15px", marginBottom: "32px" }}>Join 8,400+ companies that trust Axiom with their data.</p>
            <button onClick={() => go("auth")} style={{ background: c.amber, border: "none", color: "#000", padding: "15px 40px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", fontWeight: 800, ...f }}>Start free trial →</button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${c.brd}`, padding: "36px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", color: c.muted, fontSize: "13px" }}>
          <Logo />
          <span>© 2026 Axiom Technologies. All rights reserved.</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy","Terms","Security"].map(i => <span key={i} style={{ cursor: "pointer" }}>{i}</span>)}
          </div>
        </footer>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  //  AUTH PAGE
  // ════════════════════════════════════════════════════════════════
  if (page === "auth") return (
    <div style={{ background: c.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...f, position: "relative" }}>
      {/* BG glow */}
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${c.amber}08 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "24px", left: "40px" }}>
        <Logo onClick={() => go("landing")} />
      </div>
      <div style={{ ...card, width: "420px", boxShadow: `0 40px 80px #00000060`, position: "relative" }}>
        {/* Toggle */}
        <div style={{ display: "flex", background: c.bg, borderRadius: "8px", padding: "4px", marginBottom: "28px" }}>
          {[["login","Sign In"],["register","Sign Up"]].map(([m, lx]) => (
            <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "none", background: authMode === m ? c.surf2 : "transparent", color: authMode === m ? c.white : c.muted, cursor: "pointer", fontSize: "13px", fontWeight: 600, ...f, transition: "all 0.2s" }}>{lx}</button>
          ))}
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: c.white, marginBottom: "5px" }}>
          {authMode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ color: c.muted, fontSize: "13px", marginBottom: "26px" }}>
          {authMode === "login" ? "Sign in to your Axiom workspace" : "Start your 14-day free trial today"}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {authMode === "register" && <div><label style={lbl}>Full Name</label><input style={inp} placeholder="Sarah Connor" /></div>}
          <div><label style={lbl}>Email</label><input style={inp} type="email" placeholder="you@company.com" /></div>
          <div><label style={lbl}>Password</label><input style={inp} type="password" placeholder="••••••••" /></div>
          {authMode === "register" && <div><label style={lbl}>Company</label><input style={inp} placeholder="Acme Corp" /></div>}
        </div>
        {authMode === "login" && (
          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <span style={{ color: c.amber, fontSize: "13px", cursor: "pointer" }}>Forgot password?</span>
          </div>
        )}
        <button onClick={() => go("dashboard", "dashboard")} style={{ width: "100%", background: c.amber, border: "none", color: "#000", padding: "14px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: 800, marginTop: "20px", ...f }}>
          {authMode === "login" ? "Sign in →" : "Create account →"}
        </button>
        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "13px", color: c.muted }}>
          {authMode === "login" ? "No account? " : "Already registered? "}
          <span style={{ color: c.amber, cursor: "pointer" }} onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
            {authMode === "login" ? "Sign up free" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  //  DASHBOARD SHELL
  // ════════════════════════════════════════════════════════════════
  const navItems = [
    { id: "dashboard", icon: "▦",  label: "Overview" },
    { id: "table",     icon: "≡",  label: "Data Explorer" },
    { id: "product",   icon: "◈",  label: "Products" },
    { id: "settings",  icon: "⚙",  label: "Settings" },
  ];

  const Sidebar = () => (
    <div style={{ width: "220px", background: c.bg2, borderRight: `1px solid ${c.brd}`, display: "flex", flexDirection: "column", minHeight: "100vh", padding: "24px 0", flexShrink: 0 }}>
      <div style={{ padding: "0 20px 28px" }}><Logo /></div>
      <div style={{ padding: "0 10px", flex: 1 }}>
        {navItems.map(item => (
          <div key={item.id}
            onClick={() => { setSideNav(item.id); setPage(item.id); }}
            style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 12px", borderRadius: "8px", cursor: "pointer", background: sideNav === item.id ? c.amberL : "transparent", color: sideNav === item.id ? c.amber : c.muted, fontSize: "13px", fontWeight: 500, marginBottom: "3px", transition: "all 0.15s", ...f }}>
            <span style={{ fontSize: "15px" }}>{item.icon}</span>{item.label}
          </div>
        ))}
      </div>
      <div style={{ padding: "16px 10px 0", borderTop: `1px solid ${c.brd}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${c.amber}, ${c.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "#000", flexShrink: 0 }}>S</div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: c.text }}>Sarah Connor</div>
            <div style={{ fontSize: "11px", color: c.muted }}>Pro Plan</div>
          </div>
        </div>
        <div onClick={() => go("landing")} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "8px", cursor: "pointer", color: c.muted, fontSize: "12px", ...f }}>
          ← Sign out
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  //  DASHBOARD HOME
  // ════════════════════════════════════════════════════════════════
  const DashboardPage = () => {
    const stats2 = [
      { l: "Total Events",    v: "1.24B",  ch: "+18.4%", up: true },
      { l: "Active Sources",  v: "47",     ch: "+3",     up: true },
      { l: "Alerts Fired",    v: "12",     ch: "-5",     up: false },
      { l: "Data Ingested",   v: "3.8 TB", ch: "+22%",   up: true },
    ];
    const activity = [
      { a: "New source connected",  s: "Postgres (prod-db)",     t: "2m ago",  col: c.teal  },
      { a: "Alert triggered",       s: "Error rate > 5%",         t: "14m ago", col: c.red   },
      { a: "Dashboard shared",      s: "Q4 Revenue Report",       t: "1h ago",  col: c.amber },
      { a: "API key created",       s: "analytics-service",       t: "3h ago",  col: c.sub   },
      { a: "Export completed",      s: "user_events_may.csv",     t: "5h ago",  col: c.teal  },
    ];
    const bars  = [32,48,41,67,58,72,88,65,91,78,84,96];
    const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];

    return (
      <div style={{ flex: 1, overflow: "auto", background: c.bg, ...f }}>
        <div style={{ padding: "32px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 800, color: c.white, marginBottom: "3px" }}>Good morning, Sarah 👋</h1>
              <p style={{ color: c.muted, fontSize: "13px" }}>Here's what's happening in your workspace today.</p>
            </div>
            <Btn sm onClick={() => {}}>+ New Dashboard</Btn>
          </div>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" }}>
            {stats2.map(s => (
              <div key={s.l} style={card}>
                <div style={{ fontSize: "11px", color: c.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "10px" }}>{s.l}</div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: c.white, letterSpacing: "-0.02em", marginBottom: "6px", ...mo }}>{s.v}</div>
                <div style={{ fontSize: "12px", color: s.up ? c.teal : c.red, fontWeight: 600 }}>{s.ch} vs last month</div>
              </div>
            ))}
          </div>

          {/* CHART + ACTIVITY */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "14px" }}>
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: c.white }}>Event Volume</div>
                  <div style={{ fontSize: "12px", color: c.muted }}>Last 12 months</div>
                </div>
                <Badge col="teal">↑ 24% YoY</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "150px" }}>
                {bars.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", height: "100%", justifyContent: "flex-end" }}>
                    <div style={{ width: "100%", background: i === 11 ? c.amber : `${c.amber}25`, borderRadius: "4px 4px 0 0", height: `${v}%`, transition: "height 0.4s" }}></div>
                    <div style={{ fontSize: "9px", color: c.muted, ...mo }}>{months[i]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: c.white, marginBottom: "18px" }}>Recent Activity</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {activity.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: a.col, marginTop: "5px", flexShrink: 0, boxShadow: `0 0 6px ${a.col}80` }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", color: c.text, marginBottom: "2px" }}>{a.a}</div>
                      <div style={{ fontSize: "11px", color: c.muted }}>{a.s}</div>
                    </div>
                    <div style={{ fontSize: "10px", color: c.muted, ...mo, flexShrink: 0 }}>{a.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════
  //  DATA TABLE
  // ════════════════════════════════════════════════════════════════
  const DataTablePage = () => {
    const rows = [
      { id: "EVT-001", src: "web-app",       type: "page_view",    cnt: "2.4M",  st: "active", upd: "2m ago"  },
      { id: "EVT-002", src: "api-server",    type: "api_call",     cnt: "890K",  st: "active", upd: "5m ago"  },
      { id: "EVT-003", src: "mobile-ios",    type: "purchase",     cnt: "12.3K", st: "active", upd: "12m ago" },
      { id: "EVT-004", src: "mobile-android",type: "session_start",cnt: "1.1M",  st: "paused", upd: "1h ago"  },
      { id: "EVT-005", src: "webhook",       type: "error",        cnt: "4.2K",  st: "error",  upd: "2h ago"  },
      { id: "EVT-006", src: "postgres",      type: "db_query",     cnt: "5.6M",  st: "active", upd: "3h ago"  },
      { id: "EVT-007", src: "kafka",         type: "stream_event", cnt: "18.9M", st: "active", upd: "4h ago"  },
      { id: "EVT-008", src: "s3-bucket",     type: "file_upload",  cnt: "33K",   st: "paused", upd: "6h ago"  },
    ];
    const filtered = rows.filter(r =>
      !search || [r.id, r.src, r.type].some(v => v.toLowerCase().includes(search.toLowerCase()))
    );
    const stCol = { active: "teal", error: "red", paused: "sub" };
    const th = { padding: "11px 14px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: c.muted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${c.brd}`, background: c.bg2, ...f };
    const td = { padding: "13px 14px", fontSize: "13px", borderBottom: `1px solid ${c.brd}60` };

    return (
      <div style={{ flex: 1, overflow: "auto", background: c.bg, ...f }}>
        <div style={{ padding: "32px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 800, color: c.white, marginBottom: "3px" }}>Data Explorer</h1>
              <p style={{ color: c.muted, fontSize: "13px" }}>Browse and query your event streams</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Btn v="ghost" sm onClick={() => {}}>⬇ Export</Btn>
              <Btn sm onClick={() => {}}>+ New Source</Btn>
            </div>
          </div>

          {/* SEARCH + FILTER BAR */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: c.muted, fontSize: "13px" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sources, types, IDs…" style={{ ...inp, paddingLeft: "36px", width: "280px", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {["All","Active","Paused","Error"].map(f2 => (
                <button key={f2} style={{ background: f2 === "All" ? c.amberL : "transparent", border: `1px solid ${f2 === "All" ? c.amber : c.brd}`, color: f2 === "All" ? c.amber : c.sub, padding: "8px 14px", borderRadius: "7px", cursor: "pointer", fontSize: "12px", fontWeight: 600, ...f }}>{f2}</button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Event ID","Source","Type","Count","Status","Updated"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? "transparent" : `${c.bg2}60`, cursor: "pointer" }}>
                    <td style={{ ...td, color: c.amber, fontWeight: 700, ...mo }}>{r.id}</td>
                    <td style={{ ...td, color: c.text }}>{r.src}</td>
                    <td style={{ ...td, color: c.sub, ...mo }}>{r.type}</td>
                    <td style={{ ...td, color: c.white, fontWeight: 700, ...mo }}>{r.cnt}</td>
                    <td style={td}><Badge col={stCol[r.st]}>{r.st}</Badge></td>
                    <td style={{ ...td, color: c.muted, ...mo }}>{r.upd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${c.brd}` }}>
              <span style={{ fontSize: "12px", color: c.muted }}>Showing {filtered.length} of {rows.length} sources</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {["←","1","2","3","→"].map(p => (
                  <button key={p} style={{ background: p === "1" ? c.amber : "transparent", border: `1px solid ${p === "1" ? c.amber : c.brd}`, color: p === "1" ? "#000" : c.muted, width: "30px", height: "30px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: p === "1" ? 800 : 400, ...f }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════
  //  SETTINGS PAGE
  // ════════════════════════════════════════════════════════════════
  const SettingsPage = () => {
    const tabs2 = [["profile","Profile"],["security","Security"],["notifications","Notifications"],["billing","Billing"]];
    return (
      <div style={{ flex: 1, overflow: "auto", background: c.bg, ...f }}>
        <div style={{ padding: "32px 36px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: c.white, marginBottom: "3px" }}>Settings</h1>
          <p style={{ color: c.muted, fontSize: "13px", marginBottom: "24px" }}>Manage your account preferences</p>

          {/* TABS */}
          <div style={{ display: "flex", gap: "2px", borderBottom: `1px solid ${c.brd}`, marginBottom: "28px" }}>
            {tabs2.map(([id, label]) => (
              <button key={id} onClick={() => setSettingsTab(id)} style={{ background: "none", border: "none", padding: "10px 16px", fontSize: "13px", fontWeight: 600, color: settingsTab === id ? c.amber : c.muted, cursor: "pointer", borderBottom: `2px solid ${settingsTab === id ? c.amber : "transparent"}`, marginBottom: "-1px", ...f, transition: "color 0.15s" }}>
                {label}
              </button>
            ))}
          </div>

          {settingsTab === "profile" && (
            <div style={{ maxWidth: "520px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "28px" }}>
                <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: `linear-gradient(135deg, ${c.amber}, ${c.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 800, color: "#000" }}>S</div>
                <div>
                  <Btn v="ghost" sm onClick={() => {}}>Upload photo</Btn>
                  <button style={{ background: "none", border: "none", color: c.muted, fontSize: "13px", cursor: "pointer", marginLeft: "8px", ...f }}>Remove</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[["Full Name","Sarah Connor"],["Email","sarah@axiom.io"],["Job Title","Head of Data"],["Company","Skynet Inc."]].map(([lx, val]) => (
                  <div key={lx}><label style={lbl}>{lx}</label><input style={inp} defaultValue={val} /></div>
                ))}
                <div><Btn onClick={() => {}}>Save Changes</Btn></div>
              </div>
            </div>
          )}

          {settingsTab === "security" && (
            <div style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={card}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: c.white, marginBottom: "4px" }}>Change Password</div>
                <p style={{ fontSize: "12px", color: c.muted, marginBottom: "18px" }}>Update your password to keep your account secure.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {["Current Password","New Password","Confirm Password"].map(lx => (
                    <div key={lx}><label style={lbl}>{lx}</label><input type="password" style={inp} placeholder="••••••••" /></div>
                  ))}
                  <div><Btn onClick={() => {}}>Update Password</Btn></div>
                </div>
              </div>
              <div style={card}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: c.white, marginBottom: "4px" }}>Two-Factor Authentication</div>
                <p style={{ fontSize: "12px", color: c.muted, marginBottom: "14px" }}>Add an extra layer of security to your account.</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Badge col="red">Not enabled</Badge>
                  <Btn v="teal" sm onClick={() => {}}>Enable 2FA</Btn>
                </div>
              </div>
            </div>
          )}

          {settingsTab === "notifications" && (
            <div style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                ["Alert notifications",  "Get notified when your alerts trigger",           true  ],
                ["Weekly digest",        "A weekly summary of your workspace activity",     false ],
                ["Product updates",      "News about Axiom features and improvements",      true  ],
                ["Security alerts",      "Important notifications about account security",  true  ],
              ].map(([title, desc, on], i) => (
                <div key={i} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: c.white, marginBottom: "3px" }}>{title}</div>
                    <div style={{ fontSize: "12px", color: c.muted }}>{desc}</div>
                  </div>
                  <div style={{ width: "42px", height: "23px", background: on ? c.amber : c.brd, borderRadius: "12px", position: "relative", cursor: "pointer", flexShrink: 0 }}>
                    <div style={{ width: "17px", height: "17px", background: "#fff", borderRadius: "50%", position: "absolute", top: "3px", left: on ? "22px" : "3px", transition: "left 0.2s" }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {settingsTab === "billing" && (
            <div style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ ...card, border: `1px solid ${c.amber}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: c.white }}>Pro Plan</div>
                  <Badge col="amber">Active</Badge>
                </div>
                <div style={{ fontSize: "34px", fontWeight: 800, color: c.white, marginBottom: "4px", ...mo }}>
                  $49<span style={{ fontSize: "15px", fontWeight: 400, color: c.muted }}>/mo</span>
                </div>
                <p style={{ fontSize: "12px", color: c.muted, marginBottom: "16px" }}>Next billing date: June 1, 2026</p>
                <Btn v="ghost" sm onClick={() => {}}>Manage subscription</Btn>
              </div>
              <div style={card}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: c.white, marginBottom: "14px" }}>Payment Method</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ background: c.bg, border: `1px solid ${c.brd}`, padding: "7px 14px", borderRadius: "7px", fontSize: "13px", color: c.text, ...mo }}>•••• •••• •••• 4242</div>
                  <span style={{ color: c.muted, fontSize: "12px" }}>Visa · Expires 08/27</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════
  //  PRODUCT DETAIL
  // ════════════════════════════════════════════════════════════════
  const ProductPage = () => {
    const feats2 = ["Unlimited event ingestion","Advanced query builder","AI anomaly detection","Custom alerting rules","SSO & RBAC","Priority support SLA"];
    const price = plan === "monthly" ? 49 : 39;

    return (
      <div style={{ flex: 1, overflow: "auto", background: c.bg, ...f }}>
        <div style={{ padding: "32px 36px" }}>
          <div style={{ fontSize: "12px", color: c.muted, marginBottom: "18px" }}>
            <span style={{ cursor: "pointer", color: c.sub }} onClick={() => go("dashboard","dashboard")}>Dashboard</span>
            <span style={{ margin: "0 7px" }}>›</span>
            <span style={{ color: c.amber }}>Axiom Pro</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "28px", alignItems: "start" }}>
            {/* LEFT */}
            <div>
              {/* Hero banner */}
              <div style={{ background: `linear-gradient(135deg, #0D1728, #1A2640)`, borderRadius: "14px", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", border: `1px solid ${c.brd}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%, ${c.amber}15 0%, transparent 60%)` }} />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div style={{ fontSize: "56px", marginBottom: "10px" }}>📊</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: c.white }}>Axiom Pro</div>
                  <div style={{ fontSize: "13px", color: c.muted, marginTop: "4px" }}>Analytics Platform · v3.8.0</div>
                </div>
              </div>

              <h1 style={{ fontSize: "28px", fontWeight: 800, color: c.white, marginBottom: "10px" }}>Axiom Pro — Analytics Suite</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ color: c.amber, fontSize: "15px", letterSpacing: "1px" }}>★★★★★</span>
                <span style={{ fontSize: "13px", color: c.muted }}>4.9 · 2,341 reviews</span>
                <Badge col="teal">Verified</Badge>
              </div>
              <p style={{ fontSize: "14px", color: c.sub, lineHeight: 1.8, marginBottom: "28px" }}>
                The complete data platform for modern engineering teams. Ingest any event, query it in milliseconds, and build dashboards that actually matter. Scales from 10 to 10 billion events without breaking a sweat.
              </p>

              <div style={{ fontSize: "14px", fontWeight: 700, color: c.white, marginBottom: "14px" }}>What's included</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
                {feats2.map(ft => (
                  <div key={ft} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: c.sub }}>
                    <span style={{ color: c.teal, fontWeight: 700 }}>✓</span>{ft}
                  </div>
                ))}
              </div>

              {/* Reviews */}
              <div style={{ marginTop: "32px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: c.white, marginBottom: "14px" }}>Recent reviews</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { name: "Alex T.", role: "Staff Engineer @ Stripe", text: "Migrated from Datadog and never looked back. Query speed is insane.", stars: 5 },
                    { name: "Priya M.", role: "Data Lead @ Notion", text: "The AI insights feature alone is worth the subscription. Incredible product.", stars: 5 },
                  ].map((r, i) => (
                    <div key={i} style={card}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: c.white }}>{r.name}</div>
                          <div style={{ fontSize: "11px", color: c.muted }}>{r.role}</div>
                        </div>
                        <span style={{ color: c.amber, fontSize: "12px" }}>{"★".repeat(r.stars)}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: c.sub, lineHeight: 1.6 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — PURCHASE CARD */}
            <div style={{ ...card, position: "sticky", top: "20px", border: `1px solid ${c.brd}` }}>
              {/* Billing toggle */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "18px" }}>
                {[["monthly","Monthly"],["annual","Annual"]].map(([pid, plabel]) => (
                  <button key={pid} onClick={() => setPlan(pid)} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: `1px solid ${plan === pid ? c.amber : c.brd}`, background: plan === pid ? c.amberL : "transparent", color: plan === pid ? c.amber : c.muted, cursor: "pointer", fontSize: "12px", fontWeight: 600, ...f }}>
                    {plabel}{pid === "annual" && <span style={{ background: c.tealL, color: c.teal, fontSize: "9px", padding: "2px 6px", borderRadius: "4px", marginLeft: "5px" }}>-20%</span>}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <div style={{ fontSize: "38px", fontWeight: 800, color: c.white, letterSpacing: "-0.02em", ...mo }}>
                  ${price}<span style={{ fontSize: "14px", fontWeight: 400, color: c.muted }}>/mo per seat</span>
                </div>
                {plan === "annual" && <div style={{ fontSize: "12px", color: c.teal, marginTop: "4px" }}>Billed annually · Save $120/year</div>}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={lbl}>Seats</label>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button onClick={() => setSeats(Math.max(1, seats - 1))} style={{ width: "34px", height: "34px", borderRadius: "7px", border: `1px solid ${c.brd}`, background: "transparent", color: c.text, cursor: "pointer", fontSize: "16px", ...f }}>−</button>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: c.white, ...mo, minWidth: "28px", textAlign: "center" }}>{seats}</span>
                  <button onClick={() => setSeats(seats + 1)} style={{ width: "34px", height: "34px", borderRadius: "7px", border: `1px solid ${c.brd}`, background: "transparent", color: c.text, cursor: "pointer", fontSize: "16px", ...f }}>+</button>
                </div>
              </div>

              <div style={{ padding: "13px", background: c.bg, borderRadius: "8px", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: c.muted, marginBottom: "6px" }}>
                  <span>${price} × {seats} seats</span>
                  <span style={{ ...mo }}>${price * seats}/mo</span>
                </div>
                {plan === "annual" && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: c.teal, marginBottom: "6px" }}>
                    <span>Annual savings</span>
                    <span style={{ ...mo }}>-${10 * seats * 12}/yr</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 800, color: c.white, paddingTop: "8px", borderTop: `1px solid ${c.brd}` }}>
                  <span>Total</span>
                  <span style={{ ...mo, color: c.amber }}>${price * seats}/mo</span>
                </div>
              </div>

              <button style={{ width: "100%", background: c.amber, border: "none", color: "#000", padding: "13px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 800, marginBottom: "10px", ...f }}>
                Start free trial →
              </button>
              <button style={{ width: "100%", background: "transparent", border: `1px solid ${c.brd}`, color: c.text, padding: "11px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", ...f }}>
                Talk to sales
              </button>
              <div style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: c.muted }}>
                14-day free trial · No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── RENDER DASHBOARD SHELL ────────────────────────────────────
  const content = {
    dashboard: <DashboardPage />,
    table:     <DataTablePage />,
    settings:  <SettingsPage />,
    product:   <ProductPage />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg }}>
      <Sidebar />
      {content[page] || <DashboardPage />}
    </div>
  );
}
