import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Clock, Award, Rocket, ArrowRight, Brain, Cloud,
  FileText, Sparkles, ChevronDown, Star, Check, Users,
  Shield, BarChart2, Send, Activity, ChevronRight, Zap,
  Target, CheckCircle2, Play
} from 'lucide-react';

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [trigger, target, duration]);
  return val;
}

/* ── Scroll-triggered reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Floating ghost icon ── */
function Ghost({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none text-white/[0.045] ${className}`}>
      {children}
    </div>
  );
}

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const count = 55;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,120,255,${d.alpha})`;
        ctx.fill();
      });
      // draw connecting lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(140,80,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [_heroVisible, _setHeroVisible] = useState(false);

  /* contact */
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cSubject, setCSubject] = useState('');
  const [cMsg, setCMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formErr, setFormErr] = useState('');

  /* scroll reveals */
  const statsReveal   = useReveal(0.2);
  const featReveal    = useReveal(0.1);
  const worksReveal   = useReveal(0.1);
  const testiReveal   = useReveal(0.1);
  const faqReveal     = useReveal(0.1);
  const contactReveal = useReveal(0.1);
  const ctaReveal     = useReveal(0.15);

  /* counters */
  const acc     = useCountUp(98,   1600, statsReveal.visible);
  const clients = useCountUp(18500,2000, statsReveal.visible);
  const domains = useCountUp(45,   1400, statsReveal.visible);

  /* hero entrance — handled by CSS animation classes now */
  useEffect(() => { _setHeroVisible(true); }, []);

  /* features */
  const features = [
    { icon: <Brain className="w-6 h-6" />, color: 'from-violet-500 to-purple-600', title: 'Cognitive Skill Profiling', desc: 'Our structural text parser extracts complex keywords and maps multi-disciplinary skills with 98% accuracy across 45+ professional domains.' },
    { icon: <Zap className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500', title: 'Adaptive Domain Mapping', desc: 'Dynamically aligns resume experience against live industry taxonomy, suggesting alternative career pathways with confidence ratings.' },
    { icon: <BarChart2 className="w-6 h-6" />, color: 'from-pink-500 to-rose-600', title: 'Real-Time Assessment Engine', desc: 'Instantly constructs 15 custom scenario questions targeting exact domain knowledge, logic, and reasoning metrics.' },
    { icon: <Shield className="w-6 h-6" />, color: 'from-emerald-500 to-teal-600', title: 'Integrity Verification Protocol', desc: 'Calculates discrepancy alarms when claimed experience length clashes with release dates of the specific tech stack.' },
    { icon: <Target className="w-6 h-6" />, color: 'from-amber-500 to-orange-500', title: 'Dynamic Visual Analytics', desc: 'Renders interactive multi-dimensional performance radar scorecards perfect for talent acquisition stakeholders.' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % features.length), 4200);
    return () => clearInterval(t);
  }, [features.length]);

  /* testimonials */
  const testimonials = [
    { name: 'Marcus Vance',       role: 'VP Talent Acquisition',  company: 'Symantic Cloud',        quote: 'Mind Mirror revolutionised our candidate filter. We cut manual verification by 74% and eliminated resume inflation completely.' },
    { name: 'Sophia Chen',        role: 'Lead Systems Architect',  company: 'Aura Health Networks',  quote: 'The assessments are astonishingly accurate — testing genuine architectural understanding, not surface-level definitions.' },
    { name: 'Dr. Ethan Gallagher',role: 'Clinical Director',       company: 'Neuron Research Group', quote: 'Excellent domain mapping. It surfaced high-potential neurological researchers who might otherwise have been overlooked.' },
  ];

  /* faqs */
  const faqs = [
    { q: 'How does the resume parsing algorithm categorise applicant profiles?',
      a: 'The platform reads structural metadata, scanning for complex keywords and industry synonyms. It then compares patterns against our predefined database maps of Technical, Medical, Engineering, Business and Creative fields to determine primary, secondary and tertiary domain fits.' },
    { q: 'Is any external API key or network call required?',
      a: 'No. The system runs fully self-contained on responsive client-side evaluation engines, maintaining zero-latency execution, full offline reliability, and compliance with corporate data-protection policies.' },
    { q: 'What is the Verification Integrity Index?',
      a: 'Our discrepancy audit mechanism. If a candidate claims 5 years of experience in a recently released technology, the engine flags this anomaly in the report, maintaining high professional hiring standards.' },
    { q: 'Can I download or print the generated Capability Report?',
      a: 'Absolutely. The Report screen features an interactive printable layout with a verified candidate ID badge, capability radars, and detailed performance breakdown ready for PDF export.' },
  ];

  /* contact submit */
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    if (!cName.trim() || !cEmail.trim() || !cSubject.trim() || !cMsg.trim()) { setFormErr('All fields are required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) { setFormErr('Please enter a valid email address.'); return; }
    if (cMsg.length < 15) { setFormErr('Message must be at least 15 characters.'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false); setSent(true);
      setCName(''); setCEmail(''); setCSubject(''); setCMsg('');
      setTimeout(() => setSent(false), 5000);
    }, 1800);
  };

  /* ── transition helper ── */
  const tx = (visible: boolean, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ''} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

        {/* ── Deep professional dark base ── */}
        <div className="absolute inset-0" style={{ background: '#07070e' }} />

        {/* ── Very subtle dark grid ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* ── Faint central purple glow — reduced ── */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(80,20,140,0.11) 0%, transparent 70%)' }} />

        {/* ── Very faint pink lower accent — reduced ── */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 35% at 50% 65%, rgba(120,20,100,0.05) 0%, transparent 65%)' }} />

        {/* ── Edge vignette back to pure black ── */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #080808 100%)' }} />

        {/* Animated particle network */}
        <ParticleCanvas />

        {/* ── Ambient glow blob — dim, dark ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '38%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '65vw', height: '35vw',
            maxWidth: '800px', maxHeight: '450px',
            background: 'radial-gradient(ellipse, rgba(100,30,180,0.09) 0%, rgba(150,30,120,0.04) 50%, transparent 75%)',
            borderRadius: '50%',
            animation: 'glowPulse 4s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />

        {/* Floating ghost icons with float animation */}
        <Ghost className="top-[18%] left-[3%] animate-[float_7s_ease-in-out_infinite]">
          <Brain className="w-36 h-36 md:w-52 md:h-52" strokeWidth={0.8} />
        </Ghost>
        <Ghost className="top-[55%] left-[2%] animate-[float_9s_ease-in-out_infinite_2s]">
          <Cloud className="w-24 h-24 md:w-40 md:h-40" strokeWidth={0.8} />
        </Ghost>
        <Ghost className="top-[18%] right-[2%] animate-[float_8s_ease-in-out_infinite_1s]">
          <FileText className="w-24 h-24 md:w-36 md:h-36" strokeWidth={0.8} />
        </Ghost>
        <Ghost className="top-[58%] right-[4%] animate-[float_10s_ease-in-out_infinite_3s]">
          <BarChart2 className="w-20 h-20 md:w-28 md:h-28" strokeWidth={0.8} />
        </Ghost>
        <Ghost className="top-[78%] left-[8%] animate-[float_6s_ease-in-out_infinite_0.5s]">
          <Shield className="w-16 h-16 md:w-24 md:h-24" strokeWidth={0.8} />
        </Ghost>
        <Ghost className="top-[80%] right-[8%] animate-[float_11s_ease-in-out_infinite_4s]">
          <Sparkles className="w-14 h-14 md:w-20 md:h-20" strokeWidth={0.8} />
        </Ghost>

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto px-4" style={{ gap: '36px' }}>

          {/* ── BADGE ── */}
          <div className="hero-badge">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.3)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '2.5px',
                color: 'rgba(255,255,255,0.82)',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse flex-shrink-0" />
              Smart Analysis System
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            </div>
          </div>

          {/* ── HEADING ── */}
          <div className="select-none w-full" style={{ overflow: 'visible' }}>

            {/* Line 1 — "Candidate" — white with layered glow shadow */}
            {/* Line 1 — "Candidate" — Math Sans Classic style, deep professional white */}
            <div className="hero-line1" style={{ overflow: 'visible', marginBottom: '0.04em' }}>
              <h1 style={{
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif",
                fontWeight: 800,
                fontStyle: 'normal',
                fontSize: 'clamp(2.8rem, 7.8vw, 96px)',
                lineHeight: 0.95,
                letterSpacing: '-1px',
                color: '#e8e8f0',
                display: 'block',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                margin: 0,
              }}>
                Candidate
              </h1>
            </div>

            {/* Line 2 — "Capability Analysis" — Math Sans Classic, deep slate-indigo gradient */}
            <div className="hero-line2" style={{ overflow: 'visible' }}>
              <h1 style={{
                fontFamily: "'EB Garamond', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif",
                fontWeight: 800,
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 9.8vw, 120px)',
                lineHeight: 0.95,
                letterSpacing: '-1px',
                background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 28%, #c084fc 55%, #e879f9 78%, #ec4899 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                margin: 0,
                padding: '0.1em 0.15em',
                marginLeft: '-0.15em',
                animation: 'gradientShift 6s ease infinite',
              }}>
                Capability Analysis
              </h1>
            </div>

          </div>

          {/* ── SUBTITLE — 30px Poppins 400, max-width 950px ── */}
          <div className="hero-sub" style={{ maxWidth: '950px', width: '100%', padding: '0 1.5rem' }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2.2vw, 30px)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.82)',
              textAlign: 'center',
              margin: 0,
            }}>
              Upload your resume and let our system{' '}
              <strong style={{ color: '#fff', fontWeight: 700 }}>uncover hidden skills</strong>,{' '}
              <strong style={{ color: '#fff', fontWeight: 700 }}>match you with perfect career domains</strong>,
              {' '}and generate personalized assessments to showcase your capabilities.
            </p>
          </div>

          {/* ── STAT PILLS ── */}
          <div className="hero-pills flex flex-wrap justify-center gap-3">
            {[
              { icon: <TrendingUp className="w-4 h-4 flex-shrink-0" />, label: '98% Accuracy',       bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.28)',  color: '#6ee7b7' },
              { icon: <Clock className="w-4 h-4 flex-shrink-0" />,      label: '2 Min Analysis',      bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.28)',  color: '#a5b4fc' },
              { icon: <Award className="w-4 h-4 flex-shrink-0" />,      label: 'Fortune 500 Trusted', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.28)',  color: '#fcd34d' },
            ].map(p => (
              <div key={p.label} className="flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.04] cursor-default"
                style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color, padding: '12px 22px', borderRadius: '14px', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '14px', backdropFilter: 'blur(8px)' }}>
                {p.icon}{p.label}
              </div>
            ))}
          </div>

          {/* ── CTA BUTTONS ── */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">

            {/* Primary — gradient glow pill */}
            <button onClick={() => navigate('/upload')}
              className="group relative flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%)',
                padding: '18px 44px', borderRadius: '20px',
                fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '17px', color: '#fff',
                boxShadow: '0 0 45px rgba(168,85,247,0.5), 0 8px 32px rgba(168,85,247,0.3)',
                border: 'none', cursor: 'pointer',
              }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10 flex-shrink-0" />
              <span className="relative z-10">Start Free Analysis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" />
            </button>

            {/* Secondary — dark transparent thin border */}
            <button onClick={() => navigate('/auth')}
              className="flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] group"
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
                padding: '18px 36px', borderRadius: '20px',
                fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '15px',
                color: 'rgba(255,255,255,0.75)', cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.09)'; b.style.color='#fff'; b.style.borderColor='rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.04)'; b.style.color='rgba(255,255,255,0.75)'; b.style.borderColor='rgba(255,255,255,0.15)'; }}
            >
              <Play className="w-4 h-4 fill-current flex-shrink-0" />
              Watch Demo
            </button>

          </div>

          {/* ── SCROLL CUE ── */}
          <div className="hero-scroll flex flex-col items-center gap-1.5 mt-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUSTED BY
      ══════════════════════════════════════════ */}
      <section className="border-y border-white/5 bg-[#060606] py-10">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
            Adhering to Elite Enterprise Recruitment Verification Standards
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {['GOOGLE','MICROSOFT','AMAZON','META','NETFLIX','APPLE'].map(n => (
              <span key={n} className="font-space font-black text-xl text-gray-800 hover:text-gray-400 transition-colors duration-300 tracking-widest cursor-default select-none">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES  (id="features" for nav scroll)
      ══════════════════════════════════════════ */}
      <section id="features" className="py-28 px-4 bg-black">
        <div ref={featReveal.ref} className="max-w-6xl mx-auto space-y-14">

          <div className={`text-center space-y-4 ${tx(featReveal.visible)}`}>
            <span className="px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold tracking-widest uppercase">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-black">Deep Capability Discovery</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Every module is engineered for deep cognitive diagnostics without external latency or privacy risks.</p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start ${tx(featReveal.visible)}`} style={{ transitionDelay: '120ms' }}>
            {/* Selector */}
            <div className="lg:col-span-5 space-y-2">
              {features.map((f, i) => (
                <button key={i} onClick={() => setCarouselIdx(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                    carouselIdx === i
                      ? 'bg-violet-600/20 border-violet-500/50 text-white scale-[1.01] shadow-lg shadow-violet-500/10'
                      : 'bg-[#0d0d0d] border-white/6 text-gray-400 hover:border-white/20 hover:bg-white/3'
                  }`}>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${f.color} text-white flex-shrink-0 transition-transform ${carouselIdx === i ? 'scale-110' : ''}`}>
                    {React.cloneElement(f.icon, { className: 'w-4 h-4' })}
                  </div>
                  <span className="font-semibold text-sm">{f.title}</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/8 rounded-2xl p-8 min-h-[260px] flex flex-col justify-center space-y-5 relative overflow-hidden">
              {/* glow behind icon */}
              <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${features[carouselIdx].color} opacity-10 rounded-full blur-3xl transition-all duration-700`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${features[carouselIdx].color} flex items-center justify-center text-white transition-all duration-500`}>
                {features[carouselIdx].icon}
              </div>
              <div>
                <p className="text-xs font-mono text-violet-400 font-bold uppercase tracking-widest mb-2">STAGE 0{carouselIdx + 1}</p>
                <h3 className="text-2xl font-black mb-3 transition-all duration-300">{features[carouselIdx].title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm transition-all duration-300">{features[carouselIdx].desc}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {features.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${carouselIdx === i ? 'bg-violet-500 w-8' : 'bg-white/15 w-3 hover:bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS  (id="about")
      ══════════════════════════════════════════ */}
      <section id="about" className="py-28 px-4 bg-[#040404]">
        <div ref={worksReveal.ref} className="max-w-6xl mx-auto space-y-14">

          <div className={`text-center space-y-4 ${tx(worksReveal.visible)}`}>
            <span className="px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold tracking-widest uppercase">Platform Workflow</span>
            <h2 className="text-4xl md:text-5xl font-black">Three Steps to Full Verification</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Structured deterministic pipelines deliver objective, tamper-proof capability reports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num:'01', color:'from-violet-600 to-purple-700', icon:<FileText className="w-5 h-5 text-white"/>, title:'Upload Resume Artifact', desc:'Drag or select a PDF. Our parser reads character lines, extracts certified credentials, and detects technical domains instantly.', pct:33, delay:0 },
              { num:'02', color:'from-pink-600 to-rose-700',    icon:<Activity className="w-5 h-5 text-white"/>, title:'Objective Assessment',    desc:'Take an adaptive 15-question quiz covering scenario, logic, and core syntax — tailored specifically to your detected domain.', pct:66, delay:120 },
              { num:'03', color:'from-amber-500 to-orange-600', icon:<Award className="w-5 h-5 text-white"/>,    title:'Print Certified Report',   desc:'Receive interactive radar maps of your strengths, logical metrics, and domain-fit ratings. Ready to print, share, or present.', pct:100, delay:240 },
            ].map((s, i) => (
              <div key={i}
                className={`bg-[#0d0d0d] border border-white/8 rounded-2xl p-7 space-y-5 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 ${tx(worksReveal.visible)}`}
                style={{ transitionDelay: `${s.delay}ms` }}>
                <div className="flex items-center justify-between">
                  <span className={`text-5xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent font-mono opacity-50`}>{s.num}</span>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.color}`}>{s.icon}</div>
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <div className="h-1 bg-white/5 rounded-full">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                    style={{ width: worksReveal.visible ? `${s.pct}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <div ref={statsReveal.ref} className="py-20 px-4 bg-black border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val:`${acc}%`,                      label:'Mapping Accuracy',   color:'text-violet-400' },
            { val:`${clients.toLocaleString()}+`, label:'Parsed Résumés',     color:'text-pink-400'   },
            { val:`${domains}+`,                  label:'Professional Fields', color:'text-cyan-400'   },
            { val:'Zero',                          label:'API Key Leaks',       color:'text-emerald-400'},
          ].map((s, i) => (
            <div key={i} className={`space-y-2 transition-all duration-700 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <p className={`text-4xl md:text-5xl font-black font-space ${s.color}`}>{s.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-28 px-4 bg-[#040404]">
        <div ref={testiReveal.ref} className="max-w-6xl mx-auto space-y-14">
          <div className={`text-center space-y-4 ${tx(testiReveal.visible)}`}>
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black">Trusted by Industry Recruiters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i}
                className={`bg-[#0d0d0d] border border-white/8 rounded-2xl p-7 space-y-5 hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-500 ${tx(testiReveal.visible)}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-1">
                  {Array.from({length:5}).map((_,si) => <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400"/>)}
                </div>
                <p className="text-sm text-gray-400 italic leading-relaxed">"{t.quote}"</p>
                <div className="pt-2 border-t border-white/5">
                  <p className="font-bold text-sm text-white">{t.name}</p>
                  <p className="text-xs text-violet-400">{t.role} · {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-28 px-4 bg-black">
        <div ref={faqReveal.ref} className="max-w-3xl mx-auto space-y-12">
          <div className={`text-center space-y-4 ${tx(faqReveal.visible)}`}>
            <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black">Got Questions?</h2>
          </div>
          <div className={`space-y-3 ${tx(faqReveal.visible)}`} style={{ transitionDelay:'100ms' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden hover:border-white/16 transition-colors">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm hover:bg-white/[0.025] transition-colors gap-4"
                >
                  <span className="text-gray-200">{faq.q}</span>
                  <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? 'text-violet-400 rotate-45' : 'text-gray-600'}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${activeFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT  (id="contact")
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-28 px-4 bg-[#040404]">
        <div ref={contactReveal.ref} className="max-w-2xl mx-auto space-y-10">
          <div className={`text-center space-y-4 ${tx(contactReveal.visible)}`}>
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase">Contact</span>
            <h2 className="text-4xl md:text-5xl font-black">Get In Touch</h2>
            <p className="text-gray-500 text-sm">Have integration requests or enterprise proposals? Send a message directly to our engineering inbox.</p>
          </div>

          <div className={`bg-[#0d0d0d] border border-white/8 rounded-2xl p-8 space-y-5 ${tx(contactReveal.visible)}`} style={{ transitionDelay:'120ms' }}>
            {formErr && <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">⚠ {formErr}</div>}
            {sent   && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" /> Message sent successfully — delivered to project inbox.
              </div>
            )}
            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label:'Full Name',     val:cName,    set:setCName,    type:'text',  ph:'Sarah Connor'    },
                  { label:'Email Address', val:cEmail,   set:setCEmail,   type:'email', ph:'sarah@corp.com'  },
                ].map(f => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{f.label}</label>
                    <input value={f.val} onChange={e => f.set(e.target.value)} type={f.type} placeholder={f.ph}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Subject</label>
                <input value={cSubject} onChange={e => setCSubject(e.target.value)} type="text" placeholder="Enterprise Integration / Proposal"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Message</label>
                <textarea value={cMsg} onChange={e => setCMsg(e.target.value)} rows={5} placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-sm text-white placeholder-gray-800 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none" />
              </div>
              <button type="submit" disabled={sending}
                className="group relative w-full py-4 rounded-xl font-bold text-sm text-white overflow-hidden transition-all hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background:'linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%)' }}>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="flex items-center justify-center gap-2">
                  {sending ? <><Activity className="w-4 h-4 animate-spin"/>Sending...</> : <><Send className="w-4 h-4"/>Send Message</>}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA BAND
      ══════════════════════════════════════════ */}
      <section className="py-28 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(109,40,217,0.16),transparent)]" />
        <div ref={ctaReveal.ref} className={`relative max-w-3xl mx-auto text-center space-y-8 ${tx(ctaReveal.visible)}`}>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Ready to Discover Your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">True Potential?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Upload your resume now and get a complete capability analysis in under 2 minutes — fully private, fully client-side.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/upload')}
              className="group relative flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-white text-base overflow-hidden hover:scale-[1.04] active:scale-100 transition-all duration-300 shadow-2xl shadow-violet-500/20"
              style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)' }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <Rocket className="w-5 h-5" />Start Free Analysis<ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/auth')}
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-sm border border-white/12 text-gray-300 hover:bg-white/5 hover:border-white/25 hover:text-white transition-all duration-300">
              <Users className="w-4 h-4" />Create Account
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-gray-700">
            {['No API keys required','100% client-side privacy','Zero data leaks','Print-ready reports'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600"/>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
