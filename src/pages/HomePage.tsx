import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, TrendingUp, Clock, Award, ChevronDown, Play, Sparkles, Brain, Cloud, FileText, BarChart2, Shield } from 'lucide-react';
import MarqueeStrip from '../components/Marquee';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.3 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${d.alpha})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) { ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.strokeStyle = `rgba(140,80,255,${0.06 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function HomePage() {
  const navigate = useNavigate();

  const pills = [
    { icon: <TrendingUp className="w-4 h-4 flex-shrink-0" />, label: '98% Accuracy',       bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  color: '#6ee7b7' },
    { icon: <Clock className="w-4 h-4 flex-shrink-0" />,      label: '2 Min Analysis',      bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.25)',  color: '#a5b4fc' },
    { icon: <Award className="w-4 h-4 flex-shrink-0" />,      label: 'Fortune 500 Trusted', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  color: '#fcd34d' },
  ];

  return (
    <>
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: '#07070e' }}>

      {/* Backgrounds */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(168,85,247,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.03) 1px,transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(80,20,140,0.11) 0%, transparent 70%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 35% at 50% 65%, rgba(120,20,100,0.05) 0%, transparent 65%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #07070e 100%)' }} />
      <ParticleCanvas />

      {/* Ambient blob */}
      <div className="absolute pointer-events-none" style={{
        top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '65vw', height: '35vw', maxWidth: '800px', maxHeight: '450px',
        background: 'radial-gradient(ellipse, rgba(100,30,180,0.09) 0%, rgba(150,30,120,0.04) 50%, transparent 75%)',
        borderRadius: '50%', filter: 'blur(60px)', animation: 'glowPulse 4s ease-in-out infinite',
      }} />

      {/* Ghost icons */}
      {[
        { cls: 'top-[18%] left-[3%]',  icon: <Brain className="w-36 h-36 md:w-48 md:h-48" strokeWidth={0.7} />,   anim: '7s' },
        { cls: 'top-[55%] left-[2%]',  icon: <Cloud className="w-24 h-24 md:w-36 md:h-36" strokeWidth={0.7} />,   anim: '9s' },
        { cls: 'top-[18%] right-[2%]', icon: <FileText className="w-24 h-24 md:w-32 md:h-32" strokeWidth={0.7} />,anim: '8s' },
        { cls: 'top-[58%] right-[4%]', icon: <BarChart2 className="w-20 h-20 md:w-28 md:h-28" strokeWidth={0.7} />,anim: '10s'},
        { cls: 'top-[78%] left-[8%]',  icon: <Shield className="w-16 h-16 md:w-22 md:h-22" strokeWidth={0.7} />,  anim: '6s' },
      ].map((g, i) => (
        <div key={i} className={`absolute pointer-events-none select-none ${g.cls}`}
          style={{ color: 'rgba(255,255,255,0.045)', animation: `float ${g.anim} ease-in-out infinite` }}>
          {g.icon}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto px-4" style={{ gap: '32px' }}>

        {/* Badge */}
        <div className="hero-badge">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse flex-shrink-0" />
            Smart Analysis System
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Heading */}
        <div className="select-none w-full" style={{ overflow: 'visible' }}>
          <div className="hero-line1" style={{ overflow: 'visible', marginBottom: '0.04em' }}>
            <h1 style={{
              fontFamily: "'EB Garamond','Cormorant Garamond','Georgia',serif",
              fontWeight: 800, fontStyle: 'normal',
              fontSize: 'clamp(2.6rem,7.5vw,92px)',
              lineHeight: 0.95, letterSpacing: '-1px',
              color: '#e8e8f0', display: 'block', textAlign: 'center',
              whiteSpace: 'nowrap', margin: 0,
            }}>Candidate</h1>
          </div>
          <div className="hero-line2" style={{ overflow: 'visible' }}>
            <h1 style={{
              fontFamily: "'EB Garamond','Cormorant Garamond','Georgia',serif",
              fontWeight: 800, fontStyle: 'italic',
              fontSize: 'clamp(2.2rem,9.8vw,120px)',
              lineHeight: 0.95, letterSpacing: '-1px',
              background: 'linear-gradient(90deg,#818cf8 0%,#a78bfa 28%,#c084fc 55%,#e879f9 78%,#ec4899 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block', textAlign: 'center', whiteSpace: 'nowrap',
              margin: 0, padding: '0.1em 0.15em', marginLeft: '-0.15em',
              animation: 'gradientShift 6s ease infinite',
            }}>Capability Analysis</h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="hero-sub" style={{ maxWidth: '850px', width: '100%', padding: '0 1.5rem' }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 'clamp(0.95rem,2vw,26px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', textAlign: 'center', margin: 0 }}>
            Upload your resume and let our system{' '}
            <strong style={{ color: '#fff', fontWeight: 700 }}>uncover hidden skills</strong>,{' '}
            <strong style={{ color: '#fff', fontWeight: 700 }}>match you with perfect career domains</strong>,
            {' '}and generate personalized assessments to showcase your capabilities.
          </p>
        </div>

        {/* Pills */}
        <div className="hero-pills flex flex-wrap justify-center gap-3">
          {pills.map(p => (
            <div key={p.label} className="flex items-center gap-2.5 cursor-default transition-all duration-300 hover:scale-[1.03]"
              style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color, padding: '11px 20px', borderRadius: '12px', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '13px', backdropFilter: 'blur(8px)' }}>
              {p.icon}{p.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button onClick={() => navigate('/auth')}
            className="group relative flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%)', padding: '17px 42px', borderRadius: '18px', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff', boxShadow: '0 0 40px rgba(168,85,247,0.35),0 8px 30px rgba(168,85,247,0.2)', border: 'none', cursor: 'pointer' }}>
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }} />
            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10 flex-shrink-0" />
            <span className="relative z-10">Start Free Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" />
          </button>

          <button onClick={() => navigate('/demo')}
            className="flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', padding: '17px 34px', borderRadius: '18px', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.72)', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.08)'; b.style.color='#fff'; b.style.borderColor='rgba(255,255,255,0.28)'; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.04)'; b.style.color='rgba(255,255,255,0.72)'; b.style.borderColor='rgba(255,255,255,0.14)'; }}>
            <Play className="w-4 h-4 fill-current flex-shrink-0" />
            Watch Demo
          </button>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll flex flex-col items-center gap-1.5 mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

      </div>
    </section>

    {/* ══════════════════════════════════════════
        MARQUEE BAND — below hero, full width
    ══════════════════════════════════════════ */}
    <div
      style={{
        background: '#07070e',
        borderTop:    '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingTop:    '32px',
        paddingBottom: '32px',
      }}
    >
      {/* Label */}
      <p className="text-center mb-5" style={{
        fontFamily: "'Poppins',sans-serif", fontSize: '10px', fontWeight: 600,
        letterSpacing: '3px', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase',
      }}>
        Skills &amp; Domains We Analyse
      </p>

      {/* Row 1 — left → right */}
      <div className="mb-3">
        <MarqueeStrip speed="30s" items={[
          { label: 'React.js',           icon: '⚛️' },
          { label: 'Python',             icon: '🐍' },
          { label: 'Node.js',            icon: '🟩' },
          { label: 'TypeScript',         icon: '🔷' },
          { label: 'PostgreSQL',         icon: '🐘' },
          { label: 'Docker',             icon: '🐳' },
          { label: 'Kubernetes',         icon: '☸️' },
          { label: 'Machine Learning',   icon: '🧠' },
          { label: 'Neurology',          icon: '🫀' },
          { label: 'Civil Engineering',  icon: '🏗️' },
          { label: 'Cardiology',         icon: '❤️' },
          { label: 'Digital Marketing',  icon: '📈' },
          { label: 'UI/UX Design',       icon: '🎨' },
          { label: 'Cybersecurity',      icon: '🔒' },
          { label: 'Cloud Computing',    icon: '☁️' },
        ]} />
      </div>

      {/* Row 2 — right → left */}
      <MarqueeStrip speed="36s" reverse items={[
        { label: 'DevOps',              icon: '⚙️' },
        { label: 'Blockchain',          icon: '⛓️' },
        { label: 'Data Science',        icon: '📊' },
        { label: 'Mechanical Eng.',     icon: '🔧' },
        { label: 'Corporate Law',       icon: '⚖️' },
        { label: 'Graphic Design',      icon: '✏️' },
        { label: 'AWS',                 icon: '🌩️' },
        { label: 'Finance Analytics',   icon: '💹' },
        { label: 'Robotics',            icon: '🤖' },
        { label: 'Nursing Care',        icon: '💊' },
        { label: 'SEO Strategy',        icon: '🔍' },
        { label: 'Full Stack Dev',      icon: '🌐' },
        { label: 'Radiology',           icon: '🩻' },
        { label: 'Environmental Sci.',  icon: '🌿' },
        { label: 'iOS / Android',       icon: '📱' },
      ]} />
    </div>
    </>
  );
}
