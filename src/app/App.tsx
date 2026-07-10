import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Menu, X, ChevronRight, Play, Lock, Award, Users, BookOpen,
  Globe, Calendar, Bell, CheckCircle, Download,
  BarChart2, Clock, MapPin, Phone, Mail, Shield,
  FileText, Video, Home, Settings, LogOut, HelpCircle,
  GraduationCap, Building, Brain,
  Share2, Target, Zap,
  ChevronDown, ChevronLeft, Network, Plus, Filter
} from "lucide-react";

type Page =
  | "home" | "membership" | "dashboard" | "learning"
  | "state" | "district" | "certificate" | "events"
  | "login" | "contact";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const COURSES = [
  { id: 1, title: "AI Fundamentals", level: "Beginner", duration: "12 hrs", modules: 8, enrolled: 3420, tag: "Foundation", progress: 65 },
  { id: 2, title: "Generative AI & LLMs", level: "Intermediate", duration: "18 hrs", modules: 12, enrolled: 2180, tag: "Applied AI", progress: 30 },
  { id: 3, title: "Machine Learning Essentials", level: "Intermediate", duration: "24 hrs", modules: 16, enrolled: 2950, tag: "Core ML", progress: 0 },
  { id: 4, title: "AI for School Educators", level: "Beginner", duration: "8 hrs", modules: 6, enrolled: 1840, tag: "Educator", progress: 100 },
  { id: 5, title: "AI Career Readiness", level: "Advanced", duration: "20 hrs", modules: 14, enrolled: 1560, tag: "Professional", progress: 0 },
  { id: 6, title: "Data Science with Python", level: "Intermediate", duration: "30 hrs", modules: 18, enrolled: 2340, tag: "Technical", progress: 0 },
];

const STATES_DATA = [
  { name: "Maharashtra", members: 1840, districts: 12 },
  { name: "Karnataka", members: 1520, districts: 9 },
  { name: "Tamil Nadu", members: 1380, districts: 11 },
  { name: "Uttar Pradesh", members: 1260, districts: 14 },
  { name: "Delhi", members: 1140, districts: 5 },
  { name: "Telangana", members: 980, districts: 7 },
  { name: "Gujarat", members: 920, districts: 8 },
  { name: "Kerala", members: 890, districts: 6 },
  { name: "West Bengal", members: 840, districts: 8 },
  { name: "Rajasthan", members: 760, districts: 9 },
  { name: "Andhra Pradesh", members: 740, districts: 7 },
  { name: "Madhya Pradesh", members: 620, districts: 10 },
  { name: "Punjab", members: 580, districts: 6 },
  { name: "Odisha", members: 520, districts: 7 },
  { name: "Assam", members: 480, districts: 5 },
  { name: "Bihar", members: 440, districts: 8 },
  { name: "Haryana", members: 510, districts: 6 },
  { name: "Uttarakhand", members: 380, districts: 4 },
];

const EVENTS = [
  { id: 1, title: "National AI Education Summit 2025", date: "15 Aug 2025", time: "10:00 AM IST", mode: "Hybrid", audience: "All Members", type: "National", location: "New Delhi & Online" },
  { id: 2, title: "Generative AI Workshop — Batch 3", date: "22 Jul 2025", time: "2:00 PM IST", mode: "Online", audience: "Individual Members", type: "Workshop", location: "Online" },
  { id: 3, title: "AI Educators Conclave — Southern Zone", date: "5 Aug 2025", time: "9:30 AM IST", mode: "Offline", audience: "Teacher Members", type: "Regional", location: "Bengaluru, Karnataka" },
  { id: 4, title: "Student AI Challenge 2025 — Registration Open", date: "30 Jul 2025", time: "All Day", mode: "Online", audience: "Student Members", type: "Competition", location: "Online" },
  { id: 5, title: "Certificate Program Orientation — August Batch", date: "1 Aug 2025", time: "11:00 AM IST", mode: "Online", audience: "All Members", type: "Orientation", location: "Online" },
  { id: 6, title: "District Coordinator Training — North Zone", date: "10 Aug 2025", time: "10:00 AM IST", mode: "Offline", audience: "Coordinators", type: "Training", location: "Delhi NCR" },
];

const ANNOUNCEMENTS = [
  { date: "10 Jul 2025", title: "Certificate Programs in Generative AI Now Available for All Members", tag: "New Course" },
  { date: "5 Jul 2025", title: "Membership Drive 2025–26 Open — Register Before 31 July for Early Benefits", tag: "Membership" },
  { date: "1 Jul 2025", title: "NALS Crosses 12,000 Active Members Across 18 States", tag: "Milestone" },
  { date: "25 Jun 2025", title: "State Chapter Activations Completed in Uttarakhand and Assam", tag: "Chapters" },
  { date: "20 Jun 2025", title: "Updated Certification Criteria Published for Advanced Learners", tag: "Certificates" },
];

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

function GlobalStyles() {
  return (
    <style>{`
      @keyframes gradientShift {
        0%,100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
      }
      @keyframes floatOrb {
        0%,100% { transform: translateY(0px) scale(1); }
        50%      { transform: translateY(-28px) scale(1.06); }
      }
      @keyframes floatOrb2 {
        0%,100% { transform: translateY(0px) translateX(0px) scale(1); }
        33%      { transform: translateY(-18px) translateX(12px) scale(1.04); }
        66%      { transform: translateY(10px) translateX(-8px) scale(0.97); }
      }
      @keyframes twinkle {
        0%,100% { opacity: 0.12; transform: scale(0.7) rotate(0deg); }
        50%      { opacity: 0.9; transform: scale(1.35) rotate(18deg); }
      }
      @keyframes rippleOut {
        from { transform: scale(0); opacity: 0.55; }
        to   { transform: scale(5); opacity: 0; }
      }
      @keyframes spinConic {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes orbitDot {
        from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
        to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
      }
      @keyframes orbitDot2 {
        from { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
        to   { transform: rotate(540deg) translateX(80px) rotate(-540deg); }
      }
      @keyframes pulseRing {
        0%   { transform: scale(1); opacity: 0.4; }
        100% { transform: scale(1.65); opacity: 0; }
      }
      .gradient-headline {
        background: linear-gradient(90deg, #ffffff 0%, #67E8F9 22%, #ffffff 44%, #B8C8F8 66%, #67E8F9 88%, #ffffff 100%);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 6s ease-in-out infinite;
      }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(26,47,107,0.22); border-radius: 3px; }
      @media (prefers-reduced-motion: reduce) {
        .gradient-headline { animation: none; -webkit-text-fill-color: #fff; }
        * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}

// ─── EFFECTS COMPONENTS ───────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = W() * dpr;
      canvas.height = H() * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    interface P { x: number; y: number; vx: number; vy: number; r: number; op: number; gold: boolean }
    const pts: P[] = Array.from({ length: 52 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.4, op: Math.random() * 0.32 + 0.06,
      gold: Math.random() > 0.65,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      const w = W(), h = H();
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "#C4A44B" : "#ffffff";
        ctx.globalAlpha = p.op; ctx.fill();
      }
      const CONN = 108;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "#7aaace"; ctx.globalAlpha = (1 - d / CONN) * 0.07;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function GlowOrb({ style, animName = "floatOrb", dur = 10 }: { style: React.CSSProperties; animName?: string; dur?: number }) {
  return (
    <div className="absolute pointer-events-none rounded-full"
      style={{ filter: "blur(88px)", animation: `${animName} ${dur}s ease-in-out infinite`, opacity: 0.1, ...style }} />
  );
}

function SparkleAccents({ count = 8 }: { count?: number }) {
  const [sparks] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i, left: `${8 + Math.random() * 84}%`, top: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 3.5, dur: 1.8 + Math.random() * 2,
      size: 5 + Math.random() * 6, gold: Math.random() > 0.45,
    }))
  );
  return (
    <>
      {sparks.map((s) => (
        <div key={s.id} className="absolute pointer-events-none"
          style={{ left: s.left, top: s.top, animation: `twinkle ${s.dur}s ease-in-out infinite`, animationDelay: `${s.delay}s` }}>
          <svg width={s.size} height={s.size} viewBox="0 0 8 8" fill="none">
            <path d="M4 0 L4.6 3.4 L8 4 L4.6 4.6 L4 8 L3.4 4.6 L0 4 L3.4 3.4 Z" fill={s.gold ? "#C4A44B" : "#a0c4f8"} />
          </svg>
        </div>
      ))}
    </>
  );
}

function HeroOrbit() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hov = useRef(false);
  const ang = useRef(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    const loop = () => {
      if (!hov.current) { ang.current += 0.15; setTilt({ x: Math.sin(ang.current * 0.009) * 5, y: Math.cos(ang.current * 0.007) * 5 }); }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setTilt({ x: -((e.clientY - r.top) / r.height - 0.5) * 16, y: ((e.clientX - r.left) / r.width - 0.5) * 16 });
  };
  return (
    <div ref={containerRef} className="relative flex items-center justify-center select-none"
      style={{ width: 320, height: 320, perspective: "900px", cursor: "grab" }}
      onMouseEnter={() => { hov.current = true; }} onMouseLeave={() => { hov.current = false; }} onMouseMove={onMove}>
      <div style={{ width: 260, height: 260, transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: hov.current ? "transform 0.08s ease" : "transform 0.6s ease", transformStyle: "preserve-3d", position: "relative" }}>
        {[1, 1.5].map((s, i) => (
          <div key={i} className="absolute inset-0 rounded-full border border-[#0891B2]/18"
            style={{ animation: `pulseRing ${2.5 + i}s ease-out infinite`, animationDelay: `${i * 1.3}s`, borderRadius: "50%" }} />
        ))}
        <div className="absolute inset-0 rounded-full" style={{ border: "1.5px solid rgba(8,145,178,0.28)", borderRadius: "50%" }} />
        <div className="absolute rounded-full flex items-center justify-center"
          style={{ inset: 18, borderRadius: "50%", background: "radial-gradient(circle at 32% 30%, #1A2F6B 0%, #0D1B3E 100%)", border: "1.5px solid rgba(8,145,178,0.32)", boxShadow: "0 0 55px rgba(8,145,178,0.16), 0 0 28px rgba(196,164,75,0.07), inset 0 0 30px rgba(0,0,0,0.5)" }}>
          <Brain size={78} style={{ color: "#22D3EE", filter: "drop-shadow(0 0 20px rgba(34,211,238,0.55))" }} />
        </div>
        <div className="absolute rounded-full pointer-events-none" style={{ inset: 18, borderRadius: "50%", background: "linear-gradient(135deg, rgba(8,145,178,0.17) 0%, transparent 55%)" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ width: "100%", height: "100%", position: "absolute", animation: "orbitDot 7s linear infinite" }}>
            <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0891B2]" style={{ top: "50%", left: "50%", marginTop: -7, marginLeft: -7, boxShadow: "0 0 13px rgba(8,145,178,0.9)" }} />
          </div>
          <div style={{ width: "100%", height: "100%", position: "absolute", animation: "orbitDot2 5s linear infinite" }}>
            <div className="absolute w-2 h-2 rounded-full bg-[#C4A44B]" style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4, boxShadow: "0 0 8px rgba(196,164,75,0.9)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [s, setS] = useState<React.CSSProperties>({});
  const onM = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    setS({ transform: `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.025)`, boxShadow: `${-x * 13}px ${y * 13 + 6}px 30px rgba(13,27,62,0.13)`, transition: "transform 0.12s ease, box-shadow 0.12s ease" });
  };
  const onL = () => setS({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)", boxShadow: "", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease" });
  return <div className={className} style={s} onMouseMove={onM} onMouseLeave={onL}>{children}</div>;
}

function RippleButton({ children, onClick, className = "", disabled = false }: { children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  const [rps, setRps] = useState<{ x: number; y: number; id: number }[]>([]);
  const h = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRps((p) => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRps((p) => p.filter((rp) => rp.id !== id)), 750);
    onClick?.();
  };
  return (
    <button onClick={h} disabled={disabled} className={`relative overflow-hidden ${className}`}>
      {rps.map((rp) => (
        <span key={rp.id} style={{ position: "absolute", left: rp.x, top: rp.y, width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: "rgba(255,255,255,0.3)", pointerEvents: "none", animation: "rippleOut 750ms ease-out forwards" }} />
      ))}
      {children}
    </button>
  );
}

function FadeRise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function SpinningBorder({ children, size = 3, radius = "0.5rem" }: { children: React.ReactNode; size?: number; radius?: string }) {
  return (
    <div style={{ position: "relative", isolation: "isolate", borderRadius: radius }}>
      <div style={{ position: "absolute", inset: -size, borderRadius: radius, background: "conic-gradient(from 0deg, #0D1B3E, #0891B2, #C4A44B, #ffffff, #0891B2, #0D1B3E)", animation: "spinConic 4s linear infinite", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = { Beginner: "bg-emerald-50 text-emerald-700 border border-emerald-200", Intermediate: "bg-blue-50 text-blue-700 border border-blue-200", Advanced: "bg-rose-50 text-rose-700 border border-rose-200" };
  return <span className={`text-[11px] px-2 py-0.5 rounded font-semibold tracking-wide ${map[level] || "bg-gray-100 text-gray-700"}`}>{level}</span>;
}
function TagBadge({ label, color = "teal" }: { label: string; color?: string }) {
  const map: Record<string, string> = { teal: "bg-[#E0F7FA] text-[#0E7490]", navy: "bg-[#EEF2FB] text-[#1A2F6B]", green: "bg-[#DCFCE7] text-[#166534]", orange: "bg-[#FEF3C7] text-[#92400E]", purple: "bg-[#F3E8FF] text-[#6B21A8]", red: "bg-[#FEE2E2] text-[#991B1B]" };
  return <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${map[color]}`}>{label}</span>;
}
function SectionHeader({ label, title, subtitle, light = false }: { label?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-10">
      {label && <span className={`text-xs font-semibold tracking-widest uppercase mb-2 block ${light ? "text-[#67E8F9]" : "text-[#0891B2]"}`}>{label}</span>}
      <h2 className={`text-3xl font-bold mb-3 ${light ? "text-white" : "text-[#0D1B3E]"}`} style={{ fontFamily: "'Fraunces', serif" }}>{title}</h2>
      {subtitle && <p className={`text-base max-w-2xl leading-relaxed ${light ? "text-[#94A3B8]" : "text-[#64748B]"}`}>{subtitle}</p>}
    </div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function Logo({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <button onClick={() => navigate("home")} className="flex items-center gap-3 shrink-0 group">
      <div className="w-9 h-9 bg-[#0891B2] rounded-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#0891B2]/40">
        <Brain size={20} className="text-white" />
      </div>
      <div className="text-left">
        <div className="text-white text-[13px] font-bold leading-tight tracking-wide">NATIONAL AI</div>
        <div className="text-[#67E8F9] text-[10px] leading-tight tracking-[0.2em] uppercase font-medium">Learning Society</div>
      </div>
    </button>
  );
}

// ─── ANNOUNCEMENT BANNER ──────────────────────────────────────────────────────

function AnnouncementBanner() {
  return (
    <div className="bg-[#0891B2] text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Bell size={12} className="shrink-0 text-[#67E8F9]" />
          <span className="font-medium truncate">New: Certificate Programs in Generative AI now open for registered members.&nbsp;|&nbsp; National AI Education Summit 2025 — Register Now.&nbsp;|&nbsp; Membership Drive 2025–26 is open.</span>
        </div>
        <a href="#" className="shrink-0 underline underline-offset-2 hover:text-[#E0F7FA] transition-colors">View All</a>
      </div>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

const NAV_ITEMS: { label: string; page?: Page }[] = [
  { label: "Home", page: "home" }, { label: "About" }, { label: "Membership", page: "membership" },
  { label: "Learning", page: "learning" }, { label: "States", page: "state" }, { label: "Districts", page: "district" },
  { label: "Events", page: "events" }, { label: "Certificates", page: "certificate" }, { label: "Contact", page: "contact" },
];

function Header({ page, navigate, isLoggedIn, logout }: { page: Page; navigate: (p: Page) => void; isLoggedIn: boolean; logout: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-[#0D1B3E] sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        <Logo navigate={navigate} />
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <button key={item.label} onClick={() => item.page && navigate(item.page)}
              className={`px-2.5 py-1.5 text-[12.5px] font-medium rounded transition-all duration-200 ${page === item.page ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {isLoggedIn ? (
            <>
              <RippleButton onClick={() => navigate("dashboard")} className="px-4 py-1.5 text-[13px] font-semibold text-white bg-[#0891B2] rounded hover:bg-[#0E7490] transition-colors">My Dashboard</RippleButton>
              <button onClick={logout} className="p-1.5 text-white/45 hover:text-white transition-colors"><LogOut size={16} /></button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("login")} className="px-4 py-1.5 text-[13px] font-medium text-white/70 hover:text-white border border-white/20 rounded hover:border-white/40 transition-all">Member Login</button>
              <RippleButton onClick={() => navigate("membership")} className="px-4 py-1.5 text-[13px] font-semibold text-white bg-[#0891B2] rounded hover:bg-[#0E7490] transition-colors">Join Membership</RippleButton>
            </>
          )}
        </div>
        <button className="lg:hidden text-white/75 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Bell size={20} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#0D1B3E] border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.label} onClick={() => { item.page && navigate(item.page); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded">{item.label}</button>
          ))}
          <div className="pt-2 flex gap-2">
            <button onClick={() => { navigate("login"); setOpen(false); }} className="flex-1 py-2 text-sm text-white border border-white/20 rounded">Login</button>
            <button onClick={() => { navigate("membership"); setOpen(false); }} className="flex-1 py-2 text-sm text-white bg-[#0891B2] rounded">Join Now</button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#0D1B3E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Logo navigate={navigate} />
            <p className="text-white/40 text-sm mt-4 leading-relaxed">A national initiative for AI education, certification, and community outreach across India.</p>
            <div className="flex gap-3 mt-4">
              {["X", "Li", "YT", "Fb"].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-[11px] font-bold text-white/50 hover:bg-[#0891B2] hover:text-white cursor-pointer transition-all duration-300">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#0891B2] mb-4">Organisation</p>
            <ul className="space-y-2">{["About NALS", "Leadership", "Governing Council", "Affiliated Institutions", "Annual Reports"].map((l) => (<li key={l}><a href="#" className="text-white/40 text-sm hover:text-white transition-colors">{l}</a></li>))}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#0891B2] mb-4">Members</p>
            <ul className="space-y-2">
              {[{ l: "Membership Plans", p: "membership" as Page }, { l: "Member Login", p: "login" as Page }, { l: "Learning Portal", p: "learning" as Page }, { l: "Certificates", p: "certificate" as Page }, { l: "Events & Webinars", p: "events" as Page }].map(({ l, p }) => (
                <li key={l}><button onClick={() => navigate(p)} className="text-white/40 text-sm hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#0891B2] mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/40 text-sm"><Mail size={13} className="text-[#0891B2] mt-0.5 shrink-0" />info@nals.edu.in</li>
              <li className="flex items-start gap-2 text-white/40 text-sm"><Bell size={13} className="text-[#0891B2] mt-0.5 shrink-0" />+91-11-4567-8900</li>
              <li className="flex items-start gap-2 text-white/40 text-sm"><Mail size={13} className="text-[#0891B2] mt-0.5 shrink-0" />Plot 14, Institutional Area, New Delhi – 110003</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/22 text-xs">© 2025 National AI Learning Society. All rights reserved.</p>
          <div className="flex gap-5">{["Privacy Policy", "Terms of Use", "Grievance Redressal", "Accessibility"].map((l) => (<a key={l} href="#" className="text-white/22 text-xs hover:text-white/50 transition-colors">{l}</a>))}</div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const features = [
    { icon: Video, label: "Recorded Sessions", desc: "Access structured video lessons anytime, at your own pace." },
    { icon: Users, label: "Membership Benefits", desc: "Exclusive resources, events, and peer network access." },
    { icon: Award, label: "Certificate Programs", desc: "Earn verifiable certificates after completing courses." },
    { icon: Globe, label: "State & District Network", desc: "Connect with chapters and coordinators across India." },
    { icon: Bell, label: "Events & Webinars", desc: "Attend national and regional learning events." },
    { icon: GraduationCap, label: "Student Outreach", desc: "Dedicated programs for school and college students." },
  ];
  const benefits = [
    { icon: BookOpen, title: "Structured Learning Tracks", desc: "Curated pathways from beginner to advanced AI topics." },
    { icon: Shield, title: "Verified Certification", desc: "Industry-recognised certificates with verification codes." },
    { icon: Network, title: "National Community", desc: "Connect with 12,000+ professionals and students." },
    { icon: Target, title: "Career Development", desc: "AI career readiness programs and professional tracks." },
    { icon: Zap, title: "Continuous Updates", desc: "Content updated regularly with the latest AI developments." },
    { icon: Building, title: "Institutional Support", desc: "Dedicated programs for schools, colleges, and organisations." },
  ];
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0D1B3E] relative overflow-hidden min-h-[90vh] flex items-center">
        <ParticleCanvas />
        <GlowOrb style={{ width: 540, height: 540, background: "radial-gradient(circle, #0891B2, #1A2F6B, transparent)", top: "-130px", right: "-90px" }} dur={10} />
        <GlowOrb style={{ width: 420, height: 420, background: "radial-gradient(circle, #C4A44B, #0D1B3E, transparent)", bottom: "-90px", left: "-80px" }} animName="floatOrb2" dur={13} />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 text-xs text-[#67E8F9] font-medium mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />Established 2020 · 18 States · 12,000+ Members
              </div>
            </motion.div>
            <motion.h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Fraunces', serif" }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-white">Empowering India</span><br />
              <span className="gradient-headline">Through AI Learning</span><br />
              <span className="text-white">and Certification</span>
            </motion.h1>
            <motion.p className="text-white/55 text-lg leading-relaxed mb-9 max-w-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              Join India's premier national network for AI education. Access recorded sessions, complete structured assessments, and earn verifiable certificates — for students, educators, and professionals.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <RippleButton onClick={() => navigate("membership")} className="px-8 py-3.5 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors text-sm">Join Membership →</RippleButton>
              <RippleButton onClick={() => navigate("learning")} className="px-8 py-3.5 border border-white/22 text-white font-medium rounded hover:bg-white/8 transition-colors text-sm">Explore Courses</RippleButton>
            </motion.div>
            <motion.div className="flex gap-6 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}>
              {[{ v: "12,400+", l: "Members" }, { v: "18", l: "States" }, { v: "142", l: "Districts" }].map(({ v, l }) => (
                <div key={l}><div className="text-[#22D3EE] font-bold text-xl" style={{ fontFamily: "'Fraunces', serif" }}>{v}</div><div className="text-white/35 text-xs mt-0.5">{l}</div></div>
              ))}
            </motion.div>
          </div>
          <motion.div className="flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="relative"><HeroOrbit /><SparkleAccents count={10} /></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1 bg-[#FF9933]" /><div className="flex-1 bg-white/25" /><div className="flex-1 bg-[#138808]" />
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#1A2F6B] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ t: 12400, s: "+", l: "Active Members" }, { t: 18, s: " States", l: "State Chapters" }, { t: 142, s: "", l: "District Networks" }, { t: 6, s: " Programs", l: "Certificate Courses" }].map(({ t, s, l }) => (
            <FadeRise key={l}>
              <div className="text-2xl font-bold text-[#22D3EE]" style={{ fontFamily: "'Fraunces', serif" }}><CountUp target={t} suffix={s} /></div>
              <div className="text-white/40 text-xs font-medium tracking-wide mt-0.5">{l}</div>
            </FadeRise>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <section className="bg-[#F8FAFF] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeRise><SectionHeader label="What We Offer" title="A Complete AI Education Ecosystem" subtitle="From recorded lessons and member resources to regional chapters and verified certificates." /></FadeRise>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, label, desc }, i) => (
              <FadeRise key={label} delay={i * 75}>
                <TiltCard className="bg-white border border-[#1A2F6B]/10 rounded-lg p-6 cursor-default h-full">
                  <div className="w-10 h-10 bg-[#EEF2FB] rounded-lg flex items-center justify-center mb-4"><Icon size={20} className="text-[#1A2F6B]" /></div>
                  <h3 className="font-semibold text-[#0D1B3E] mb-1.5 text-[15px]">{label}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
                </TiltCard>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeRise><SectionHeader label="Why Choose NALS" title="Built for Serious Learners and Educators" subtitle="NALS is structured as a national professional society, built to serve the educational advancement of India." /></FadeRise>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <FadeRise key={title} delay={i * 65}>
                <div className="flex gap-4 p-5 border border-[#1A2F6B]/10 rounded-lg hover:bg-[#F8FAFF] hover:border-[#0891B2]/20 transition-all duration-300 cursor-default">
                  <div className="w-9 h-9 bg-[#0891B2]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Icon size={16} className="text-[#0891B2]" /></div>
                  <div><h4 className="font-semibold text-[#0D1B3E] mb-1 text-[14px]">{title}</h4><p className="text-[#64748B] text-sm leading-relaxed">{desc}</p></div>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-[#F8FAFF] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeRise>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <SectionHeader label="Learning Programs" title="Featured Certificate Courses" subtitle="Structured, assessed, and certifiable programs for every stage of the AI learning journey." />
              <button onClick={() => navigate("learning")} className="text-[#0891B2] text-sm font-semibold hover:underline hidden md:block shrink-0 mb-12">View All Courses →</button>
            </div>
          </FadeRise>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((course, i) => (
              <FadeRise key={course.id} delay={i * 75}>
                <TiltCard className="bg-white border border-[#1A2F6B]/10 rounded-lg p-5 cursor-default h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3"><TagBadge label={course.tag} color="navy" /><LevelBadge level={course.level} /></div>
                  <h3 className="font-semibold text-[#0D1B3E] mb-3 text-[15px] leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-4 text-[#64748B] text-xs mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen size={11} />{course.modules} modules</span>
                    <span className="flex items-center gap-1"><Users size={11} />{course.enrolled.toLocaleString()}</span>
                  </div>
                  {course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-[#64748B] mb-1"><span>{course.progress === 100 ? "Completed" : "In Progress"}</span><span>{course.progress}%</span></div>
                      <div className="h-1.5 bg-[#EEF2FB] rounded-full overflow-hidden"><div className={`h-full rounded-full ${course.progress === 100 ? "bg-[#16A34A]" : "bg-[#0891B2]"}`} style={{ width: `${course.progress}%` }} /></div>
                    </div>
                  )}
                  <div className="flex-1" />
                  <RippleButton onClick={() => navigate("learning")} className="w-full mt-3 py-2.5 text-[13px] font-semibold text-[#1A2F6B] border border-[#1A2F6B]/20 rounded hover:bg-[#1A2F6B] hover:text-white transition-all duration-300">
                    {course.progress === 100 ? "View Certificate" : course.progress > 0 ? "Continue Learning" : "Enrol Now"}
                  </RippleButton>
                </TiltCard>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>

      {/* National Presence */}
      <section className="bg-[#0D1B3E] py-20 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 600, height: 600, background: "radial-gradient(circle, #0891B2, transparent)", top: "-200px", right: "-150px" }} dur={12} />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeRise><SectionHeader label="State & District Network" title="National Presence Across India" subtitle="NALS operates through a structured chapter system with state coordinators, district networks, and institutional partnerships." light /></FadeRise>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {STATES_DATA.map((s, i) => (
              <FadeRise key={s.name} delay={i * 38}>
                <button onClick={() => navigate("state")} className="w-full bg-white/5 border border-white/8 rounded-lg p-3 text-left hover:bg-white/12 hover:border-[#0891B2]/45 transition-all duration-300 group">
                  <div className="text-[#22D3EE] text-lg font-bold mb-0.5 group-hover:text-white transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.members.toLocaleString()}</div>
                  <div className="text-white/70 text-xs font-medium mb-0.5">{s.name}</div>
                  <div className="text-white/28 text-[11px]">{s.districts} districts</div>
                </button>
              </FadeRise>
            ))}
          </div>
          <FadeRise delay={200} className="mt-8 flex flex-wrap gap-3">
            <RippleButton onClick={() => navigate("state")} className="px-5 py-2.5 bg-[#0891B2] text-white text-sm font-semibold rounded hover:bg-[#0E7490] transition-colors">View State Chapters</RippleButton>
            <button onClick={() => navigate("district")} className="px-5 py-2.5 border border-white/18 text-white text-sm font-medium rounded hover:bg-white/8 transition-colors">Browse Districts</button>
          </FadeRise>
        </div>
      </section>

      {/* Announcements + Events */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <FadeRise><SectionHeader label="Latest Updates" title="Announcements & Notices" /></FadeRise>
            <div className="border border-[#1A2F6B]/10 rounded-lg overflow-hidden">
              {ANNOUNCEMENTS.map((a, i) => (
                <FadeRise key={i} delay={i * 55}>
                  <div className="flex gap-4 p-4 border-b border-[#1A2F6B]/06 last:border-0 hover:bg-[#F8FAFF] transition-colors cursor-pointer group">
                    <div className="shrink-0 text-center min-w-[52px]">
                      <div className="text-[10px] text-[#64748B] font-medium">{a.date.split(" ")[1]} {a.date.split(" ")[2]}</div>
                      <div className="text-lg font-bold text-[#1A2F6B]" style={{ fontFamily: "'Fraunces', serif" }}>{a.date.split(" ")[0]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#0D1B3E] font-medium leading-snug mb-1.5 group-hover:text-[#0891B2] transition-colors">{a.title}</p>
                      <TagBadge label={a.tag} color={a.tag === "New Course" ? "teal" : a.tag === "Milestone" ? "green" : "navy"} />
                    </div>
                    <ChevronRight size={16} className="text-[#94A3B8] shrink-0 mt-1 group-hover:translate-x-1 group-hover:text-[#0891B2] transition-all" />
                  </div>
                </FadeRise>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <FadeRise><SectionHeader label="Upcoming" title="Events & Webinars" /></FadeRise>
            <div className="space-y-3">
              {EVENTS.slice(0, 3).map((e, i) => (
                <FadeRise key={e.id} delay={i * 75}>
                  <TiltCard className="border border-[#1A2F6B]/10 rounded-lg p-4 bg-white cursor-default">
                    <div className="flex items-start justify-between gap-2 mb-2"><span className="text-xs font-semibold text-[#0891B2]">{e.date}</span><TagBadge label={e.mode} color={e.mode === "Online" ? "teal" : "navy"} /></div>
                    <h4 className="text-[14px] font-semibold text-[#0D1B3E] leading-snug mb-1">{e.title}</h4>
                    <div className="flex items-center gap-1 text-[#64748B] text-xs"><Bell size={11} />{e.location}</div>
                  </TiltCard>
                </FadeRise>
              ))}
              <FadeRise delay={300}>
                <RippleButton onClick={() => navigate("events")} className="w-full py-2.5 text-[13px] font-semibold text-[#0891B2] border border-[#0891B2]/25 rounded hover:bg-[#0891B2] hover:text-white transition-all duration-300">View All Events →</RippleButton>
              </FadeRise>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeRise>
        <section className="bg-[#1A2F6B] py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,100 C240,0 480,200 720,100 C960,0 1200,200 1440,100 L1440,200 L0,200 Z" fill="#0891B2" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Ready to Begin Your AI Learning Journey?</h2>
            <p className="text-white/50 mb-8 text-base">Join thousands of students, educators, and professionals through a structured, certified, and nationally recognised program.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <RippleButton onClick={() => navigate("membership")} className="px-8 py-3 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors">Join as a Member</RippleButton>
              <button onClick={() => navigate("contact")} className="px-8 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/8 transition-colors">Contact Our Team</button>
            </div>
          </div>
        </section>
      </FadeRise>
    </div>
  );
}

// ─── MEMBERSHIP PAGE ──────────────────────────────────────────────────────────

function MembershipPage({ navigate }: { navigate: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const plans = [
    { name: "Student Membership", price: "₹500", period: "/year", tag: "Most Popular", highlight: false, features: ["All recorded learning sessions", "Student events & webinars", "Certificate eligibility", "District & state membership", "Email support"], not: ["Institutional login", "Priority registration"] },
    { name: "Teacher Membership", price: "₹1,000", period: "/year", tag: "Educator", highlight: false, features: ["All Student benefits", "Educator learning tracks", "Professional development certs", "Educator conclaves", "Resource library", "Priority email support"], not: ["Institutional licensing"] },
    { name: "Individual Membership", price: "₹1,500", period: "/year", tag: "Recommended", highlight: true, features: ["Full access to all programs", "Priority event registration", "AI Career Readiness Program", "All certificate levels", "Chapter participation", "Dedicated support", "Early course access"], not: [] },
    { name: "Institutional Membership", price: "₹15,000", period: "/year", tag: "Organisation", highlight: false, features: ["Up to 50 member logins", "Bulk certificate enrollment", "Coordinator access", "Custom outreach support", "Priority event branding", "Annual impact report", "Account manager"], not: [] },
  ];
  const faqs = [
    { q: "How long does a membership remain active?", a: "All memberships are valid for one year from activation. Renewal notices are sent 30 days before expiry." },
    { q: "Can I access all courses immediately after joining?", a: "Yes. Upon successful membership activation and email verification, you gain immediate access to all courses for your plan." },
    { q: "How are certificates issued and verified?", a: "Certificates are issued digitally upon course completion and assessment. Each certificate carries a unique verification code at verify.nals.edu.in." },
    { q: "Is Institutional Membership suitable for schools?", a: "Yes. Institutional Membership includes bulk enrollment support and coordination with district chapter networks, designed for schools, colleges, and organisations." },
    { q: "Can I upgrade my membership plan?", a: "Yes. Members can upgrade at any point during the membership year by paying the differential amount. Contact support to initiate an upgrade." },
  ];
  return (
    <div>
      <div className="bg-[#0D1B3E] py-16 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 400, height: 400, background: "radial-gradient(circle, #0891B2, transparent)", top: "-100px", right: "-100px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0891B2]">Member Portal</span>
          <h1 className="text-4xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Become a Member and Unlock<br />Full Learning Access</h1>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto">NALS membership connects you to India's national AI learning network — recorded sessions, certificate programs, events, and state-level community.</p>
        </div>
      </div>
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeRise><SectionHeader label="Membership Plans" title="Choose the Right Plan for You" subtitle="All plans include access to the national learning portal." /></FadeRise>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, i) => (
              <FadeRise key={plan.name} delay={i * 75}>
                <TiltCard className={`rounded-lg border p-6 flex flex-col relative h-full ${plan.highlight ? "border-[#0891B2] shadow-lg shadow-[#0891B2]/10 bg-[#F0FAFF]" : "border-[#1A2F6B]/15 bg-white"}`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0891B2] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">RECOMMENDED</div>}
                  <TagBadge label={plan.tag} color={plan.highlight ? "teal" : "navy"} />
                  <h3 className="font-bold text-[#0D1B3E] mt-3 mb-1 text-[15px]">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-bold text-[#1A2F6B]" style={{ fontFamily: "'Fraunces', serif" }}>{plan.price}</span>
                    <span className="text-[#64748B] text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-[13px] text-[#374151]"><CheckCircle size={13} className="text-[#16A34A] mt-0.5 shrink-0" />{f}</li>))}
                    {plan.not.map((f) => (<li key={f} className="flex items-start gap-2 text-[13px] text-[#94A3B8]"><X size={13} className="mt-0.5 shrink-0" />{f}</li>))}
                  </ul>
                  <RippleButton onClick={() => navigate("login")} className={`w-full py-2.5 text-sm font-semibold rounded transition-all duration-300 ${plan.highlight ? "bg-[#0891B2] text-white hover:bg-[#0E7490]" : "border border-[#1A2F6B]/25 text-[#1A2F6B] hover:bg-[#1A2F6B] hover:text-white"}`}>Join Now</RippleButton>
                </TiltCard>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F8FAFF] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeRise><SectionHeader label="Getting Started" title="How to Join NALS" /></FadeRise>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {[{ step: "01", icon: Plus, title: "Register", desc: "Fill in your details and create your NALS member account." }, { step: "02", icon: Mail, title: "Verify Profile", desc: "Verify your email and complete your member profile." }, { step: "03", icon: CheckCircle, title: "Choose Plan", desc: "Select the membership plan that suits your goals." }, { step: "04", icon: Play, title: "Start Learning", desc: "Access the full learning portal and begin your AI journey." }].map(({ step, icon: Icon, title, desc }, i) => (
              <FadeRise key={step} delay={i * 90}>
                <div className="text-center p-6 border border-[#1A2F6B]/10 rounded-lg relative bg-white hover:shadow-md transition-all duration-300">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0891B2] text-white text-[11px] font-bold flex items-center justify-center">{step}</div>
                  <div className="w-12 h-12 bg-[#EEF2FB] rounded-full flex items-center justify-center mx-auto mb-4 mt-2"><Icon size={20} className="text-[#1A2F6B]" /></div>
                  <h4 className="font-bold text-[#0D1B3E] mb-2">{title}</h4>
                  <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeRise><SectionHeader label="FAQ" title="Frequently Asked Questions" /></FadeRise>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeRise key={i} delay={i * 55}>
                <div className="border border-[#1A2F6B]/12 rounded-lg bg-white overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFF] transition-colors">
                    <span className="font-semibold text-[#0D1B3E] text-[14px] pr-4">{faq.q}</span>
                    <ChevronDown size={16} className={`text-[#64748B] transition-transform duration-300 shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.32s cubic-bezier(0.16,1,0.3,1)" }}>
                    <div className="px-4 pb-4 text-[#64748B] text-sm leading-relaxed border-t border-[#1A2F6B]/08 pt-3">{faq.a}</div>
                  </div>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────

function DashboardPage({ navigate, memberName, membershipType }: { navigate: (p: Page) => void; memberName: string; membershipType: string }) {
  const [active, setActive] = useState("dashboard");
  const sideNav = [{ id: "dashboard", icon: Home, label: "Dashboard" }, { id: "courses", icon: BookOpen, label: "My Courses" }, { id: "sessions", icon: Video, label: "Recorded Sessions" }, { id: "quizzes", icon: FileText, label: "Quizzes" }, { id: "certs", icon: Award, label: "Certificates" }, { id: "events", icon: Bell, label: "Events" }, { id: "profile", icon: Settings, label: "Profile" }, { id: "support", icon: HelpCircle, label: "Support" }];
  return (
    <div className="flex min-h-[calc(100vh-56px)] bg-[#F8FAFF]">
      <aside className="w-56 bg-[#0D1B3E] shrink-0 hidden md:flex flex-col py-6">
        <div className="px-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-white font-semibold text-[13px] truncate">{memberName}</div>
            <div className="text-[#0891B2] text-[11px] mt-0.5">{membershipType}</div>
            <div className="flex items-center gap-1 mt-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /><span className="text-[#16A34A] text-[11px] font-medium">Active · Expires Aug 2026</span></div>
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {sideNav.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => { if (id === "sessions") navigate("learning"); else if (id === "certs") navigate("certificate"); else if (id === "events") navigate("events"); else setActive(id); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-200 text-left ${active === id ? "bg-[#0891B2] text-white font-semibold" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              <Icon size={15} />{label}
            </button>
          ))}
        </nav>
        <div className="px-2 mt-4"><button onClick={() => navigate("home")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/30 hover:text-white/50 transition-colors"><LogOut size={15} />Sign Out</button></div>
      </aside>
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="bg-[#0D1B3E] rounded-xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute right-6 top-6 opacity-7 pointer-events-none"><Brain size={90} className="text-[#0891B2]" /></div>
              <GlowOrb style={{ width: 300, height: 300, background: "radial-gradient(circle, #0891B2, transparent)", right: 0, top: "-50px" }} dur={9} />
              <div className="text-xs font-semibold tracking-widest uppercase text-[#0891B2] mb-1 relative z-10">Member Dashboard</div>
              <h2 className="text-2xl font-bold text-white mb-1 relative z-10" style={{ fontFamily: "'Fraunces', serif" }}>Welcome back, {memberName.split(" ")[0]}</h2>
              <p className="text-white/40 text-sm mb-4 relative z-10">Continue your AI learning journey. You have 2 courses in progress.</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <RippleButton onClick={() => navigate("learning")} className="px-4 py-2 bg-[#0891B2] text-white text-sm font-semibold rounded hover:bg-[#0E7490] transition-colors">Continue Learning</RippleButton>
                <button onClick={() => navigate("certificate")} className="px-4 py-2 bg-white/8 text-white text-sm font-medium rounded hover:bg-white/15 transition-colors">View Certificates</button>
                <button onClick={() => navigate("events")} className="px-4 py-2 bg-white/8 text-white text-sm font-medium rounded hover:bg-white/15 transition-colors">Browse Events</button>
              </div>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {[{ label: "Lessons Completed", value: "34", icon: CheckCircle, color: "text-[#16A34A]" }, { label: "Avg. Quiz Score", value: "87%", icon: BarChart2, color: "text-[#0891B2]" }, { label: "Certificates Earned", value: "1", icon: Award, color: "text-[#C4A44B]" }, { label: "Active Courses", value: "2", icon: BookOpen, color: "text-[#7C3AED]" }].map(({ label, value, icon: Icon, color }) => (
              <TiltCard key={label} className="bg-white border border-[#1A2F6B]/10 rounded-lg p-4">
                <Icon size={18} className={`${color} mb-2`} />
                <div className="text-2xl font-bold text-[#0D1B3E]" style={{ fontFamily: "'Fraunces', serif" }}>{value}</div>
                <div className="text-[#64748B] text-xs mt-0.5">{label}</div>
              </TiltCard>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="bg-white border border-[#1A2F6B]/10 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-[#0D1B3E] text-[15px]">Continue Where You Left Off</h3><button onClick={() => navigate("learning")} className="text-[#0891B2] text-xs font-semibold hover:underline">View All</button></div>
                  <div className="border border-[#0891B2]/20 rounded-lg p-4 bg-[#F0FAFF] mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center shrink-0"><Play size={16} className="text-white" /></div>
                      <div className="flex-1">
                        <div className="text-[13px] text-[#64748B] mb-0.5">AI Fundamentals · Module 6</div>
                        <div className="font-semibold text-[#0D1B3E] text-[14px] mb-2">Neural Networks: Concepts and Applications</div>
                        <div className="flex items-center justify-between text-xs text-[#64748B] mb-2"><span>65% complete</span><span>~25 min remaining</span></div>
                        <div className="h-1.5 bg-[#DBEAFE] rounded-full overflow-hidden"><div className="h-full bg-[#0891B2] rounded-full" style={{ width: "65%" }} /></div>
                      </div>
                    </div>
                    <RippleButton onClick={() => navigate("learning")} className="mt-3 w-full py-2 bg-[#0891B2] text-white text-sm font-semibold rounded hover:bg-[#0E7490] transition-colors">Resume Lesson</RippleButton>
                  </div>
                  <div className="space-y-2">
                    {[{ title: "Introduction to Deep Learning", course: "AI Fundamentals", dur: "42 min", done: true }, { title: "Supervised vs Unsupervised Learning", course: "AI Fundamentals", dur: "38 min", done: true }, { title: "Prompt Engineering Basics", course: "Generative AI & LLMs", dur: "51 min", done: false }].map((l, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8FAFF] cursor-pointer border border-transparent hover:border-[#1A2F6B]/08 transition-all">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${l.done ? "bg-[#DCFCE7]" : "bg-[#EEF2FB]"}`}>{l.done ? <CheckCircle size={14} className="text-[#16A34A]" /> : <Play size={13} className="text-[#1A2F6B]" />}</div>
                        <div className="flex-1 min-w-0"><div className="text-[13px] font-medium text-[#0D1B3E] truncate">{l.title}</div><div className="text-[11px] text-[#64748B]">{l.course}</div></div>
                        <span className="text-[11px] text-[#94A3B8] shrink-0">{l.dur}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <div className="bg-white border border-[#1A2F6B]/10 rounded-lg p-5">
                  <h3 className="font-bold text-[#0D1B3E] text-[15px] mb-3">Certificates</h3>
                  <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1A2F6B] rounded-lg p-4 text-white mb-3">
                    <Award size={24} className="text-[#C4A44B] mb-2" />
                    <div className="text-xs text-white/50 mb-0.5">Certificate of Completion</div>
                    <div className="font-semibold text-[14px]">AI for School Educators</div>
                    <div className="text-[#0891B2] text-xs mt-1">Issued: 5 Jun 2025</div>
                  </div>
                  <button onClick={() => navigate("certificate")} className="w-full py-2 text-[13px] font-semibold text-[#0891B2] border border-[#0891B2]/25 rounded hover:bg-[#0891B2] hover:text-white transition-all duration-300">View All Certificates</button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <div className="bg-[#F8FAFF] border border-[#1A2F6B]/12 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-[12px] font-semibold text-[#64748B]">Membership Status</span><TagBadge label="Active" color="green" /></div>
                  <div className="text-[13px] font-semibold text-[#0D1B3E] mb-0.5">{membershipType}</div>
                  <div className="text-[12px] text-[#64748B]">Expires: 15 Aug 2026</div>
                  <div className="mt-3 h-1.5 bg-[#EEF2FB] rounded-full overflow-hidden"><div className="h-full bg-[#0891B2] rounded-full" style={{ width: "20%" }} /></div>
                  <div className="text-[11px] text-[#94A3B8] mt-1">2 months elapsed of 12</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── LEARNING PAGE ────────────────────────────────────────────────────────────

function LearningPage({ navigate }: { navigate: (p: Page) => void }) {
  const [sel, setSel] = useState<typeof COURSES[0] | null>(null);
  const [lesIdx, setLesIdx] = useState(0);
  const [tab, setTab] = useState("outline");
  const [filter, setFilter] = useState("All");
  const lessons = [
    { title: "Introduction & Course Overview", dur: "18 min", done: true },
    { title: "What is Artificial Intelligence?", dur: "32 min", done: true },
    { title: "History and Evolution of AI", dur: "28 min", done: true },
    { title: "Types of AI: Narrow, General, Super", dur: "35 min", done: false },
    { title: "Machine Learning Fundamentals", dur: "42 min", done: false },
    { title: "Neural Networks: Concepts & Applications", dur: "51 min", done: false },
    { title: "Natural Language Processing Basics", dur: "38 min", done: false },
    { title: "Assessment Quiz: Module 1", dur: "20 min", done: false },
  ];
  if (sel) {
    return (
      <div className="min-h-screen bg-[#F8FAFF]">
        <div className="bg-[#0D1B3E] px-6 py-3 flex items-center gap-3">
          <button onClick={() => setSel(null)} className="text-white/50 hover:text-white flex items-center gap-1.5 text-sm transition-colors"><ChevronLeft size={16} />Back to Library</button>
          <span className="text-white/22">/</span><span className="text-white/50 text-sm truncate">{sel.title}</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="bg-[#0D1B3E] rounded-xl aspect-video flex items-center justify-center relative overflow-hidden mb-4 cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A2F6B] to-[#0D1B3E]" />
              <GlowOrb style={{ width: 300, height: 300, background: "radial-gradient(circle, #0891B2, transparent)", right: 0, top: 0 }} />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0891B2] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#0891B2]/40"><Play size={28} className="text-white ml-1" /></div>
                <div className="text-white font-semibold text-[15px]">{lessons[lesIdx].title}</div>
                <div className="text-white/40 text-sm mt-1">{sel.title} · {lessons[lesIdx].dur}</div>
              </div>
            </div>
            <div className="bg-white border border-[#1A2F6B]/10 rounded-lg overflow-hidden">
              <div className="flex border-b border-[#1A2F6B]/10">
                {["outline", "notes", "resources", "quiz", "discussion"].map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-[13px] font-medium capitalize border-b-2 transition-all duration-200 ${tab === t ? "border-[#0891B2] text-[#0891B2]" : "border-transparent text-[#64748B] hover:text-[#0D1B3E]"}`}>{t}</button>
                ))}
              </div>
              <div className="p-5 min-h-[90px]">
                {tab === "outline" && <p className="text-[#64748B] text-sm leading-relaxed">This lesson covers the fundamental concepts of neural networks, including perceptrons, activation functions, forward propagation, and backpropagation.</p>}
                {tab === "notes" && <textarea className="w-full text-sm text-[#374151] resize-none outline-none" rows={4} placeholder="Add your notes for this lesson..." />}
                {tab === "resources" && <div className="space-y-2">{["Lesson Slides (PDF)", "Supplementary Reading: Neural Networks Explained", "Code Notebook: Perceptron Demo"].map((r) => (<div key={r} className="flex items-center gap-2 text-[13px] text-[#0891B2] hover:underline cursor-pointer"><Download size={13} />{r}</div>))}</div>}
                {tab === "quiz" && <div className="text-center py-4"><FileText size={28} className="text-[#0891B2] mx-auto mb-2" /><p className="text-[#374151] font-medium text-[14px] mb-1">Module Quiz available after completing all lessons</p><p className="text-[#64748B] text-sm">Complete 3 more lessons to unlock.</p></div>}
                {tab === "discussion" && <div className="text-[#64748B] text-sm">Discussion forum available for active members.</div>}
              </div>
            </div>
          </motion.div>
          <motion.div className="bg-white border border-[#1A2F6B]/10 rounded-lg overflow-hidden" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="p-4 border-b border-[#1A2F6B]/10 bg-[#F8FAFF]">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">Course Progress</div>
              <div className="flex items-center gap-2 mb-1"><div className="flex-1 h-1.5 bg-[#EEF2FB] rounded-full overflow-hidden"><div className="h-full bg-[#0891B2] rounded-full" style={{ width: "38%" }} /></div><span className="text-xs font-semibold text-[#0891B2]">38%</span></div>
              <div className="text-xs text-[#64748B]">3 of 8 lessons complete</div>
            </div>
            <div className="overflow-y-auto max-h-[420px]">
              {lessons.map((l, i) => (
                <button key={i} onClick={() => setLesIdx(i)} className={`w-full flex items-center gap-3 p-3 border-b border-[#1A2F6B]/06 text-left hover:bg-[#F8FAFF] transition-colors ${lesIdx === i ? "bg-[#EEF2FB] border-l-2 border-l-[#0891B2]" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${l.done ? "bg-[#DCFCE7] text-[#16A34A]" : lesIdx === i ? "bg-[#0891B2] text-white" : "bg-[#EEF2FB] text-[#64748B]"}`}>{l.done ? <CheckCircle size={13} /> : i + 1}</div>
                  <div className="flex-1 min-w-0"><div className="text-[12px] font-medium text-[#0D1B3E] leading-snug truncate">{l.title}</div><div className="text-[11px] text-[#94A3B8]">{l.dur}</div></div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-[#1A2F6B]/10 bg-[#F8FAFF]"><div className="flex items-center gap-2 text-[12px] text-[#64748B]"><Lock size={12} className="text-[#94A3B8]" />Certificate unlocks after completing all lessons and passing the quiz</div></div>
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <div className="bg-[#0891B2]/10 border-b border-[#0891B2]/20 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[13px] text-[#0E7490]"><Lock size={14} className="shrink-0" /><span className="font-medium">Members-Only Area:</span><span>This content is exclusively available to registered NALS members.</span></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <FadeRise><SectionHeader label="Learning Portal" title="Recorded Learning Sessions" subtitle="Access the full library of structured AI learning programs." /></FadeRise>
          <div className="flex gap-2 flex-wrap">{["All", "Beginner", "Intermediate", "Advanced"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${filter === f ? "bg-[#0891B2] text-white" : "bg-white border border-[#1A2F6B]/15 text-[#64748B] hover:border-[#0891B2]/30 hover:text-[#0891B2]"}`}>{f}</button>))}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.filter((c) => filter === "All" || c.level === filter).map((course, i) => (
            <FadeRise key={course.id} delay={i * 65}>
              <TiltCard className="bg-white border border-[#1A2F6B]/10 rounded-lg overflow-hidden cursor-default h-full flex flex-col">
                <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1A2F6B] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-7"><Brain size={80} className="text-white" /></div>
                  <TagBadge label={course.tag} color="teal" />
                  <h3 className="text-white font-bold mt-2 text-[15px] leading-snug">{course.title}</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3"><LevelBadge level={course.level} /><span className="flex items-center gap-1 text-xs text-[#64748B]"><Clock size={11} />{course.duration}</span><span className="flex items-center gap-1 text-xs text-[#64748B]"><BookOpen size={11} />{course.modules}m</span></div>
                  {course.progress > 0 && (<div className="mb-3"><div className="flex justify-between text-xs text-[#64748B] mb-1"><span>{course.progress === 100 ? "Completed" : "In Progress"}</span><span>{course.progress}%</span></div><div className="h-1.5 bg-[#EEF2FB] rounded-full overflow-hidden"><div className={`h-full rounded-full ${course.progress === 100 ? "bg-[#16A34A]" : "bg-[#0891B2]"}`} style={{ width: `${course.progress}%` }} /></div></div>)}
                  <div className="flex-1" />
                  <RippleButton onClick={() => setSel(course)} className="w-full mt-3 py-2.5 text-[13px] font-semibold bg-[#EEF2FB] text-[#1A2F6B] rounded hover:bg-[#1A2F6B] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <Play size={13} />{course.progress === 100 ? "Review Course" : course.progress > 0 ? "Continue" : "Start Course"}
                  </RippleButton>
                </div>
              </TiltCard>
            </FadeRise>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STATE PAGE ───────────────────────────────────────────────────────────────

function StatePage({ navigate }: { navigate: (p: Page) => void }) {
  const districts = [
    { name: "Bangalore Urban", members: 380, schools: 24, coordinator: "Dr. Meera Krishnan" },
    { name: "Mysuru", members: 210, schools: 18, coordinator: "Prof. Suresh Naik" },
    { name: "Hubballi-Dharwad", members: 185, schools: 15, coordinator: "Ms. Priya Patil" },
    { name: "Belagavi", members: 165, schools: 13, coordinator: "Mr. Rajesh Bhat" },
    { name: "Tumkuru", members: 148, schools: 11, coordinator: "Dr. Kavitha Gowda" },
    { name: "Mangaluru", members: 142, schools: 12, coordinator: "Prof. Anand Shetty" },
    { name: "Shivamogga", members: 128, schools: 10, coordinator: "Ms. Deepa Rao" },
    { name: "Dakshina Kannada", members: 162, schools: 14, coordinator: "Dr. Harish Kumar" },
  ];
  return (
    <div>
      <div className="bg-[#0D1B3E] py-14 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 500, height: 500, background: "radial-gradient(circle, #0891B2, transparent)", right: "-100px", top: "-150px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[#0891B2] text-xs font-semibold mb-3"><Globe size={13} />State Chapter</div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Karnataka Chapter</h1>
              <p className="text-white/45 text-base max-w-xl leading-relaxed">The Karnataka chapter of NALS coordinates AI education outreach across 9 districts with active programs in schools, colleges, and professional institutions.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {[{ v: "1,520", l: "Members" }, { v: "9", l: "Districts" }, { v: "142", l: "Institutions" }].map(({ v, l }) => (
                <div key={l} className="bg-white/8 border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-[#22D3EE]" style={{ fontFamily: "'Fraunces', serif" }}>{v}</div>
                  <div className="text-white/40 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FadeRise><SectionHeader label="Chapter Structure" title="Districts Under Karnataka" /></FadeRise>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {districts.map((d, i) => (
                <FadeRise key={d.name} delay={i * 55}>
                  <TiltCard className="border border-[#1A2F6B]/12 rounded-lg p-4 bg-white cursor-pointer hover:border-[#0891B2]/28 transition-all" onClick={() => navigate("district")}>
                    <div className="flex items-start justify-between mb-2"><h4 className="font-semibold text-[#0D1B3E] text-[14px]">{d.name}</h4><ChevronRight size={14} className="text-[#94A3B8] mt-0.5" /></div>
                    <div className="flex items-center gap-4 text-xs text-[#64748B] mb-2"><span className="flex items-center gap-1"><Users size={11} />{d.members} members</span><span className="flex items-center gap-1"><Building size={11} />{d.schools} schools</span></div>
                    <div className="text-xs text-[#64748B]">Coordinator: <span className="text-[#374151] font-medium">{d.coordinator}</span></div>
                  </TiltCard>
                </FadeRise>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <FadeRise>
              <div className="bg-white border border-[#1A2F6B]/12 rounded-lg p-5">
                <h3 className="font-bold text-[#0D1B3E] text-[15px] mb-4 border-b border-[#1A2F6B]/10 pb-3">State Leadership</h3>
                {[{ name: "Prof. Kavitha Rao", role: "State Coordinator", org: "IISc Bangalore" }, { name: "Dr. Venkatesh Murthy", role: "Deputy Coordinator", org: "NIE Mysuru" }, { name: "Ms. Anitha Sharma", role: "Student Outreach Lead", org: "BMSCE Bangalore" }].map((l, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className="w-9 h-9 rounded-full bg-[#EEF2FB] flex items-center justify-center text-[#1A2F6B] font-bold text-sm shrink-0">{l.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div>
                    <div><div className="text-[13px] font-semibold text-[#0D1B3E]">{l.name}</div><div className="text-[11px] text-[#0891B2]">{l.role}</div><div className="text-[11px] text-[#94A3B8]">{l.org}</div></div>
                  </div>
                ))}
              </div>
            </FadeRise>
            <FadeRise delay={80}>
              <RippleButton onClick={() => navigate("membership")} className="w-full py-3 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors text-sm">Join Karnataka Chapter →</RippleButton>
            </FadeRise>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DISTRICT PAGE ────────────────────────────────────────────────────────────

function DistrictPage({ navigate }: { navigate: (p: Page) => void }) {
  const institutions = [
    { name: "RV College of Engineering", type: "Engineering College", members: 84 },
    { name: "National Public School, Koramangala", type: "Senior Secondary School", members: 52 },
    { name: "Christ University", type: "Deemed University", members: 71 },
    { name: "Kendriya Vidyalaya, Bangalore South", type: "Central School", members: 38 },
    { name: "Government ITI, Peenya", type: "Technical Institute", members: 29 },
  ];
  return (
    <div>
      <div className="bg-[#0D1B3E] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[#0891B2] text-xs font-semibold mb-2">
            <button onClick={() => navigate("state")} className="hover:text-[#22D3EE] transition-colors">Karnataka Chapter</button>
            <ChevronRight size={12} /><span>Bangalore Urban</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Bangalore Urban District</h1>
              <p className="text-white/40 text-sm max-w-lg">Karnataka Chapter · District Network · Active since 2021</p>
            </div>
            <div className="grid grid-cols-4 gap-3 shrink-0">
              {[{ v: "380", l: "Members" }, { v: "24", l: "Schools" }, { v: "3", l: "Programs" }, { v: "92%", l: "Cert Rate" }].map(({ v, l }) => (
                <div key={l} className="bg-white/8 border border-white/10 rounded-lg p-2.5 text-center">
                  <div className="text-xl font-bold text-[#22D3EE]" style={{ fontFamily: "'Fraunces', serif" }}>{v}</div>
                  <div className="text-white/40 text-[11px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FadeRise><SectionHeader label="Associated Institutions" title="Schools & Colleges in the Network" /></FadeRise>
        <div className="border border-[#1A2F6B]/10 rounded-lg overflow-hidden bg-white">
          {institutions.map((inst, i) => (
            <FadeRise key={i} delay={i * 55}>
              <div className="flex items-center gap-4 p-4 border-b border-[#1A2F6B]/06 last:border-0 hover:bg-[#F8FAFF] transition-colors">
                <div className="w-9 h-9 bg-[#EEF2FB] rounded-lg flex items-center justify-center shrink-0"><Building size={16} className="text-[#1A2F6B]" /></div>
                <div className="flex-1 min-w-0"><div className="font-semibold text-[#0D1B3E] text-[13px] truncate">{inst.name}</div><div className="text-[11px] text-[#64748B]">{inst.type}</div></div>
                <div className="text-right shrink-0"><div className="text-[13px] font-semibold text-[#0D1B3E]">{inst.members}</div><div className="text-[11px] text-[#64748B]">members</div></div>
              </div>
            </FadeRise>
          ))}
        </div>
        <FadeRise delay={300} className="mt-6">
          <RippleButton onClick={() => navigate("membership")} className="px-6 py-3 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors text-sm">Join Bangalore Urban Network →</RippleButton>
        </FadeRise>
      </div>
    </div>
  );
}

// ─── CERTIFICATE PAGE ──────────────────────────────────────────────────────────

function CertificatePage({ memberName }: { memberName: string }) {
  const certs = [
    { course: "AI for School Educators", issued: "5 Jun 2025", code: "NALS-EDU-2025-00482", status: "Issued" },
    { course: "AI Fundamentals", issued: "Pending — 65% complete", code: "—", status: "In Progress" },
    { course: "Generative AI & LLMs", issued: "Pending — 30% complete", code: "—", status: "In Progress" },
  ];
  return (
    <div>
      <div className="bg-[#0D1B3E] py-12 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 400, height: 400, background: "radial-gradient(circle, #C4A44B, transparent)", bottom: "-100px", left: "30%", opacity: 0.07 }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Award size={32} className="text-[#C4A44B] mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Certificates & Achievements</h1>
          <p className="text-white/40 text-sm">Certificates earned through the NALS learning and assessment system</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <FadeRise><h2 className="text-xl font-bold text-[#0D1B3E] mb-6" style={{ fontFamily: "'Fraunces', serif" }}>Issued Certificates</h2></FadeRise>
        <FadeRise delay={80} className="max-w-2xl mx-auto mb-10">
          <SpinningBorder radius="0.5rem">
            <div className="border-2 border-[#1A2F6B]/28 rounded-lg p-1">
              <div className="rounded-lg p-8 bg-gradient-to-br from-[#F8FAFF] to-white relative overflow-hidden">
                {[["top-0 left-0", "M0 0 L80 0 L80 10 L10 10 L10 80 L0 80 Z"], ["top-0 right-0", "M80 0 L0 0 L0 10 L70 10 L70 80 L80 80 Z"], ["bottom-0 left-0", "M0 80 L80 80 L80 70 L10 70 L10 0 L0 0 Z"], ["bottom-0 right-0", "M80 80 L0 80 L0 70 L70 70 L70 0 L80 0 Z"]].map(([pos, path]) => (
                  <div key={pos} className={`absolute w-20 h-20 opacity-10 ${pos}`}><svg viewBox="0 0 80 80"><path d={path} fill="#1A2F6B" /></svg></div>
                ))}
                <div className="text-center relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#0891B2] rounded-sm flex items-center justify-center"><Brain size={24} className="text-white" /></div>
                    <div><div className="text-[#1A2F6B] font-bold text-sm tracking-wide">NATIONAL AI LEARNING SOCIETY</div><div className="text-[#0891B2] text-[10px] tracking-[0.2em] uppercase">India · Established 2020</div></div>
                  </div>
                  <div className="h-px bg-[#1A2F6B]/15 mb-5" />
                  <div className="text-[#64748B] text-xs tracking-widest uppercase mb-2">Certificate of Completion</div>
                  <div className="text-[#0D1B3E] text-sm mb-3">This is to certify that</div>
                  <div className="text-3xl font-bold text-[#1A2F6B] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>{memberName}</div>
                  <div className="text-[#64748B] text-sm mb-2">has successfully completed the course</div>
                  <div className="text-xl font-bold text-[#0D1B3E] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>AI for School Educators</div>
                  <div className="text-[#0891B2] text-xs font-medium mb-5">Foundation Level · 8 Hours · 6 Modules</div>
                  <div className="h-px bg-[#1A2F6B]/15 mb-5" />
                  <div className="flex items-end justify-between">
                    <div className="text-left"><div className="font-bold text-[#0D1B3E] text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Prof. A. K. Sharma</div><div className="text-[#64748B] text-[11px]">Director General, NALS</div></div>
                    <div className="text-center"><Award size={32} className="text-[#C4A44B] mx-auto mb-1" /><div className="text-[10px] text-[#64748B]">Issued: 5 Jun 2025</div></div>
                    <div className="text-right"><div className="font-bold text-[#0D1B3E] text-sm" style={{ fontFamily: "'Fraunces', serif" }}>Dr. R. Menon</div><div className="text-[#64748B] text-[11px]">Academic Dean, NALS</div></div>
                  </div>
                  <div className="mt-4 bg-[#F1F5F9] rounded p-2">
                    <div className="text-[10px] text-[#64748B] mb-0.5">Verification Code</div>
                    <div className="font-mono text-[#1A2F6B] font-bold text-sm tracking-wider">NALS-EDU-2025-00482</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">Verify at verify.nals.edu.in</div>
                  </div>
                </div>
              </div>
            </div>
          </SpinningBorder>
          <div className="flex gap-3 justify-center mt-5">
            <RippleButton className="flex items-center gap-2 px-5 py-2.5 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors text-sm"><Download size={15} />Download PDF</RippleButton>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-[#1A2F6B]/20 text-[#1A2F6B] font-medium rounded hover:bg-[#EEF2FB] transition-colors text-sm"><Share2 size={15} />Share</button>
          </div>
        </FadeRise>
        <FadeRise delay={200}>
          <h2 className="text-xl font-bold text-[#0D1B3E] mb-5" style={{ fontFamily: "'Fraunces', serif" }}>All Certificate Programs</h2>
          <div className="space-y-3">
            {certs.map((c, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 border rounded-lg ${c.status === "Issued" ? "border-[#16A34A]/25 bg-[#F0FDF4]" : "border-[#1A2F6B]/10 bg-[#F8FAFF]"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${c.status === "Issued" ? "bg-[#DCFCE7]" : "bg-[#EEF2FB]"}`}>{c.status === "Issued" ? <Award size={18} className="text-[#16A34A]" /> : <Lock size={16} className="text-[#94A3B8]" />}</div>
                <div className="flex-1 min-w-0"><div className="font-semibold text-[#0D1B3E] text-[14px]">{c.course}</div><div className="text-[12px] text-[#64748B] mt-0.5">{c.status === "Issued" ? `Issued: ${c.issued}` : c.issued}</div></div>
                <div className="text-right shrink-0">{c.status === "Issued" ? (<><div className="font-mono text-[11px] text-[#0891B2] font-medium">{c.code}</div><TagBadge label="Verified" color="green" /></>) : <TagBadge label="Pending" color="orange" />}</div>
              </div>
            ))}
          </div>
        </FadeRise>
      </div>
    </div>
  );
}

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────

function EventsPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "National", "Regional", "Workshop", "Online", "Competition"];
  const typeColors: Record<string, string> = { National: "navy", Workshop: "teal", Regional: "purple", Competition: "orange", Orientation: "green", Training: "navy" };
  const filtered = filter === "All" ? EVENTS : EVENTS.filter((e) => e.type === filter || (filter === "Online" && e.mode === "Online"));
  return (
    <div>
      <div className="bg-[#0D1B3E] py-14 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 500, height: 500, background: "radial-gradient(circle, #0891B2, transparent)", right: "-100px", top: "-100px" }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <TagBadge label="National Event" color="teal" />
            <h1 className="text-3xl font-bold text-white mt-3 mb-3" style={{ fontFamily: "'Fraunces', serif" }}>National AI Education Summit 2025</h1>
            <p className="text-white/45 text-sm leading-relaxed mb-5">India's foremost annual gathering of AI educators, students, practitioners, and institutional leaders. Join thousands of members for keynotes, workshops, and networking.</p>
            <div className="flex flex-wrap gap-4 text-white/60 text-sm mb-6">
              <span className="flex items-center gap-1"><Bell size={14} className="text-[#0891B2]" />15 August 2025</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-[#0891B2]" />10:00 AM IST</span>
              <span className="flex items-center gap-1"><Globe size={14} className="text-[#0891B2]" />New Delhi & Online</span>
            </div>
            <RippleButton onClick={() => navigate("membership")} className="px-6 py-3 bg-[#0891B2] text-white font-semibold rounded hover:bg-[#0E7490] transition-colors text-sm">Register Now →</RippleButton>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              {["Keynote: AI Policy & Education in India", "Panel: Generative AI in Classrooms", "Workshop: Hands-on ML for Educators", "Awards: Best State Chapter 2024–25", "Demo: AI Tools for School Teaching"].map((h, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0 text-white/60 text-sm"><ChevronRight size={12} className="text-[#0891B2]" />{h}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Filter size={15} className="text-[#64748B]" />
          {filters.map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${filter === f ? "bg-[#1A2F6B] text-white" : "bg-[#EEF2FB] text-[#64748B] hover:bg-[#1A2F6B]/10 hover:text-[#1A2F6B]"}`}>{f}</button>))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((e, i) => (
              <FadeRise key={e.id} delay={i * 55}>
                <TiltCard className="bg-white border border-[#1A2F6B]/10 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0D1B3E] text-white rounded-lg p-3 text-center min-w-[52px] shrink-0">
                      <div className="text-[10px] font-medium text-white/50">{e.date.split(" ")[1]}</div>
                      <div className="text-xl font-bold leading-tight">{e.date.split(" ")[0]}</div>
                      <div className="text-[10px] text-[#0891B2] font-semibold">{e.date.split(" ")[2]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#0D1B3E] text-[15px] leading-snug mb-2">{e.title}</h3>
                      <div className="flex flex-wrap gap-3 text-[12px] text-[#64748B] mb-2"><span className="flex items-center gap-1"><Clock size={11} />{e.time}</span><span className="flex items-center gap-1"><Globe size={11} />{e.location}</span></div>
                      <div className="flex items-center gap-2"><TagBadge label={e.type} color={typeColors[e.type] || "navy"} /><TagBadge label={e.mode} color={e.mode === "Online" ? "teal" : "navy"} /></div>
                    </div>
                    <RippleButton onClick={() => navigate("membership")} className="shrink-0 px-4 py-2 bg-[#EEF2FB] text-[#1A2F6B] text-[12px] font-semibold rounded hover:bg-[#1A2F6B] hover:text-white transition-all duration-300">Register</RippleButton>
                  </div>
                </TiltCard>
              </FadeRise>
            ))}
          </div>
          <div>
            <FadeRise><h2 className="text-xl font-bold text-[#0D1B3E] mb-5" style={{ fontFamily: "'Fraunces', serif" }}>Latest Announcements</h2></FadeRise>
            <div className="space-y-3">
              {ANNOUNCEMENTS.map((a, i) => (
                <FadeRise key={i} delay={i * 55}>
                  <div className="bg-white border border-[#1A2F6B]/10 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer hover:border-[#0891B2]/22">
                    <div className="flex items-center justify-between mb-2"><span className="text-[11px] text-[#64748B]">{a.date}</span><TagBadge label={a.tag} color={a.tag === "New Course" ? "teal" : a.tag === "Milestone" ? "green" : "navy"} /></div>
                    <p className="text-[13px] text-[#0D1B3E] font-medium leading-snug">{a.title}</p>
                  </div>
                </FadeRise>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

function LoginPage({ login, navigate }: { login: () => void; navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReg, setIsReg] = useState(false);
  return (
    <div className="min-h-screen bg-[#F8FAFF] flex">
      <div className="hidden lg:flex flex-col bg-[#0D1B3E] w-[420px] shrink-0 p-12 relative overflow-hidden">
        <ParticleCanvas />
        <GlowOrb style={{ width: 400, height: 400, background: "radial-gradient(circle, #0891B2, transparent)", bottom: "-100px", left: "-100px" }} />
        <div className="relative z-10">
          <Logo navigate={navigate} />
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>India's National AI Learning Network</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10">Access your member dashboard, continue learning, and track your progress toward AI certification.</p>
            <div className="space-y-5">
              {[{ icon: BookOpen, title: "Structured Learning Programs", desc: "6 certificate-eligible AI courses" }, { icon: Award, title: "Verifiable Certificates", desc: "Unique verification codes" }, { icon: Globe, title: "National Community", desc: "18 state chapters, 142 districts" }].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#0891B2]/18 rounded-lg flex items-center justify-center shrink-0"><Icon size={16} className="text-[#0891B2]" /></div>
                  <div><div className="text-white text-[13px] font-semibold">{title}</div><div className="text-white/32 text-[12px]">{desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-auto flex gap-6">
          {[{ v: "12,400+", l: "Members" }, { v: "18", l: "States" }, { v: "6", l: "Courses" }].map(({ v, l }) => (
            <div key={l}><div className="text-[#22D3EE] font-bold text-lg" style={{ fontFamily: "'Fraunces', serif" }}>{v}</div><div className="text-white/30 text-xs">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div className="w-full max-w-[400px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <div className="lg:hidden mb-8"><Logo navigate={navigate} /></div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#0D1B3E] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>{isReg ? "Create Your Account" : "Member Login"}</h1>
            <p className="text-[#64748B] text-sm">{isReg ? "Register to access the NALS learning portal." : "Sign in to access your member dashboard and courses."}</p>
          </div>
          <div className="bg-white border border-[#1A2F6B]/12 rounded-xl p-7 shadow-sm">
            <div className="space-y-4">
              {isReg && <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Full Name</label><input type="text" placeholder="Priya Sharma" className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10 transition-all" /></div>}
              <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Email Address</label><input type="email" placeholder="member@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10 transition-all" /></div>
              <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Password</label><input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10 transition-all" /></div>
              {isReg && <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Membership Type</label><select className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] bg-white"><option>Student Membership</option><option>Teacher Membership</option><option>Individual Membership</option><option>Institutional Membership</option></select></div>}
              {!isReg && <div className="text-right"><a href="#" className="text-[#0891B2] text-xs hover:underline">Forgot password?</a></div>}
              <RippleButton onClick={login} className="w-full py-3 bg-[#1A2F6B] text-white font-semibold rounded-lg hover:bg-[#0D1B3E] transition-colors text-sm mt-2">{isReg ? "Create Account & Continue" : "Sign In to Dashboard →"}</RippleButton>
            </div>
          </div>
          <div className="text-center mt-5"><span className="text-[#64748B] text-sm">{isReg ? "Already a member? " : "New to NALS? "}</span><button onClick={() => setIsReg(!isReg)} className="text-[#0891B2] text-sm font-semibold hover:underline">{isReg ? "Sign In" : "Create Account"}</button></div>
          <div className="mt-5 text-center"><button onClick={() => navigate("home")} className="text-[#94A3B8] text-xs hover:text-[#64748B] transition-colors">← Return to Home</button></div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      <div className="bg-[#0D1B3E] py-14 px-6 relative overflow-hidden">
        <GlowOrb style={{ width: 400, height: 400, background: "radial-gradient(circle, #0891B2, transparent)", right: "-80px", bottom: "-80px" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Contact NALS</h1>
          <p className="text-white/40 text-base">Reach out for membership queries, institutional partnerships, or program information.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <FadeRise><SectionHeader label="Get in Touch" title="Send Us a Message" subtitle="Our team typically responds within 2 working days." /></FadeRise>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#F0FDF4] border border-[#16A34A]/20 rounded-xl p-8 text-center">
                <CheckCircle size={40} className="text-[#16A34A] mx-auto mb-3" />
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Message Received</h3>
                <p className="text-[#64748B] text-sm">Thank you for contacting NALS. Our team will respond within 2 working days.</p>
              </motion.div>
            ) : (
              <FadeRise delay={80}>
                <div className="bg-white border border-[#1A2F6B]/12 rounded-xl p-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Full Name</label><input type="text" placeholder="Your name" className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] transition-all" /></div>
                    <div><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Email Address</label><input type="email" placeholder="your@email.com" className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] transition-all" /></div>
                  </div>
                  <div className="mb-4"><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Subject</label><select className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] bg-white"><option>Membership Enquiry</option><option>Course Information</option><option>Certificate Query</option><option>Institutional Partnership</option><option>State/District Chapter</option><option>Technical Support</option></select></div>
                  <div className="mb-5"><label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Message</label><textarea rows={4} placeholder="Describe your query in detail..." className="w-full px-3.5 py-2.5 text-sm border border-[#1A2F6B]/20 rounded-lg outline-none focus:border-[#0891B2] resize-none transition-all" /></div>
                  <RippleButton onClick={() => setSubmitted(true)} className="w-full py-3 bg-[#1A2F6B] text-white font-semibold rounded-lg hover:bg-[#0D1B3E] transition-colors text-sm">Submit Message</RippleButton>
                </div>
              </FadeRise>
            )}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <FadeRise><SectionHeader label="Contact Information" title="Reach Our Team" /></FadeRise>
            <FadeRise delay={80}>
              <div className="bg-white border border-[#1A2F6B]/12 rounded-xl p-5">
                <h4 className="font-bold text-[#0D1B3E] text-[14px] mb-4 pb-3 border-b border-[#1A2F6B]/10">National Secretariat</h4>
                <div className="space-y-3 text-[13px]">
                  <div className="flex items-start gap-3"><MapPin size={15} className="text-[#0891B2] mt-0.5 shrink-0" /><span className="text-[#374151]">National AI Learning Society, Plot 14, Institutional Area, Lodhi Road, New Delhi – 110003</span></div>
                  <div className="flex items-center gap-3"><Phone size={15} className="text-[#0891B2] shrink-0" /><span className="text-[#374151]">+91-11-4567-8900</span></div>
                  <div className="flex items-center gap-3"><Mail size={15} className="text-[#0891B2] shrink-0" /><span className="text-[#374151]">info@nals.edu.in</span></div>
                </div>
              </div>
            </FadeRise>
            {[{ city: "Mumbai", email: "mumbai@nals.edu.in" }, { city: "Bengaluru", email: "bangalore@nals.edu.in" }, { city: "Kolkata", email: "kolkata@nals.edu.in" }].map((o, i) => (
              <FadeRise key={o.city} delay={160 + i * 55}>
                <div className="bg-[#F8FAFF] border border-[#1A2F6B]/10 rounded-xl p-4">
                  <div className="text-[13px] font-bold text-[#0D1B3E] mb-1">{o.city} — Regional Office</div>
                  <div className="text-[12px] text-[#0891B2]">{o.email}</div>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const memberName = "Priya Sharma";
  const membershipType = "Individual Membership";

  const navigate = (p: Page) => {
    if ((p === "dashboard" || p === "learning" || p === "certificate") && !isLoggedIn) {
      setPage("login");
    } else {
      setPage(p);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const showHeader = page !== "login";
  const showFooter = page !== "login" && page !== "dashboard" && page !== "learning";

  return (
    <div className="min-h-screen bg-background">
      <GlobalStyles />
      {showHeader && (
        <>
          <AnnouncementBanner />
          <Header page={page} navigate={navigate} isLoggedIn={isLoggedIn} logout={() => { setIsLoggedIn(false); setPage("home"); }} />
        </>
      )}
      <motion.main
        key={page}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "membership" && <MembershipPage navigate={navigate} />}
        {page === "dashboard" && <DashboardPage navigate={navigate} memberName={memberName} membershipType={membershipType} />}
        {page === "learning" && <LearningPage navigate={navigate} />}
        {page === "state" && <StatePage navigate={navigate} />}
        {page === "district" && <DistrictPage navigate={navigate} />}
        {page === "certificate" && <CertificatePage memberName={memberName} />}
        {page === "events" && <EventsPage navigate={navigate} />}
        {page === "login" && <LoginPage login={() => { setIsLoggedIn(true); setPage("dashboard"); }} navigate={navigate} />}
        {page === "contact" && <ContactPage navigate={navigate} />}
      </motion.main>
      {showFooter && <Footer navigate={navigate} />}
    </div>
  );
}
