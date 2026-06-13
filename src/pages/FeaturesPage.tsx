import { useNavigate } from 'react-router-dom';
import { FileText, Brain, BarChart2, Shield, Zap, Award, ChevronRight, Check } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-7 h-7" />,
      color: 'from-indigo-500 to-violet-600',
      glow: 'rgba(99,102,241,0.2)',
      tag: '01 — PARSING',
      title: 'Intelligent Resume Parsing',
      desc: 'Our structural text engine reads raw character lines from PDF, DOCX, and TXT files. It identifies names, skills, experience timelines, education records, and project highlights — all without any external API calls.',
      points: ['PDF & DOCX support', 'Skill taxonomy matching', 'Experience timeline extraction', '100% client-side privacy'],
    },
    {
      icon: <Brain className="w-7 h-7" />,
      color: 'from-violet-500 to-purple-600',
      glow: 'rgba(139,92,246,0.2)',
      tag: '02 — MAPPING',
      title: 'Domain Intelligence Mapping',
      desc: 'After skill extraction, our domain taxonomy engine cross-references your competencies against 45+ professional fields — from Full Stack Development and Neurology to Corporate Law and Environmental Science.',
      points: ['45+ professional domains', 'Confidence percentage scoring', 'Primary & secondary domain matches', 'Real-time career path alignment'],
    },
    {
      icon: <Zap className="w-7 h-7" />,
      color: 'from-pink-500 to-rose-600',
      glow: 'rgba(236,72,153,0.2)',
      tag: '03 — ASSESSMENT',
      title: 'Adaptive 15-Question Assessment',
      desc: 'The system generates a unique set of 15 non-repeating questions — MCQ, scenario-based, true/false, and logical reasoning — tailored specifically to your detected domain and skill profile.',
      points: ['Non-repeating randomized questions', '60-second timed assessment', 'MCQ + Scenario + Logic types', 'Auto-submit on timer end'],
    },
    {
      icon: <BarChart2 className="w-7 h-7" />,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.2)',
      tag: '04 — ANALYTICS',
      title: 'Interactive Performance Analytics',
      desc: 'View your capability profile through Recharts-powered radar maps, area performance curves, bar segment breakdowns, and accuracy doughnut charts — all responsive and dark-mode native.',
      points: ['Radar capability profiles', 'Performance trend tracking', 'Skill segment bar charts', 'Accuracy doughnut charts'],
    },
    {
      icon: <Award className="w-7 h-7" />,
      color: 'from-amber-500 to-orange-600',
      glow: 'rgba(245,158,11,0.2)',
      tag: '05 — REPORT',
      title: 'Printable Capability Passport',
      desc: 'Generate a verified, print-ready Capability Report with a unique candidate ID, domain confidence scores, verified skill badges, performance level indicators, and a digital integrity signature.',
      points: ['Print-to-PDF ready', 'Unique certificate ID', 'Verified skill badges', 'Shareable link generation'],
    },
    {
      icon: <Shield className="w-7 h-7" />,
      color: 'from-emerald-500 to-teal-600',
      glow: 'rgba(16,185,129,0.2)',
      tag: '06 — INTEGRITY',
      title: 'Discrepancy Verification Engine',
      desc: 'Our chronological audit system flags impossible claims — e.g., 5 years of experience in a technology released 2 years ago — maintaining the highest standards of professional hiring integrity.',
      points: ['Timeline discrepancy detection', 'Stack release date validation', 'Integrity confidence scoring', 'Transparent flagging system'],
    },
  ];

  const plans = [
    { name: 'Free', price: 'Free', desc: 'Perfect for individual candidates', features: ['1 Resume Parse', '1 Assessment', 'Basic Report', 'Client-side Privacy'], cta: 'Start Free', gradient: false },
    { name: 'Pro', price: '$9/mo', desc: 'For active job seekers', features: ['Unlimited Parses', 'Unlimited Assessments', 'Full PDF Reports', 'Enhanced Analytics', 'Priority Processing'], cta: 'Go Pro', gradient: true },
    { name: 'Enterprise', price: 'Custom', desc: 'For HR teams & recruiters', features: ['Bulk Candidate Processing', 'Team Dashboard', 'API Access', 'Custom Domains', 'Dedicated Support'], cta: 'Contact Us', gradient: false },
  ];

  return (
    <PageShell>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-28">

          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              Platform Features
            </div>
            <h1 style={{ fontFamily: "'EB Garamond','Georgia',serif", fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,64px)', lineHeight: 1.0, letterSpacing: '-1px', color: '#e8e8f0', margin: 0 }}>
              Everything You Need to <br />
              <span style={{ background: 'linear-gradient(90deg,#818cf8,#a78bfa,#c084fc,#e879f9,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                Prove Your Potential
              </span>
            </h1>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(0.875rem,1.6vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '600px', margin: '0 auto' }}>
              Six powerful modules working in sequence to transform a raw resume file into a verified, objective capability passport.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="soft-card p-7 rounded-2xl space-y-5 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', animationDelay: `${i * 80}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'; e.currentTarget.style.boxShadow = `0 0 30px ${f.glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '10px', fontWeight: 700, color: 'rgba(168,85,247,0.7)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{f.tag}</p>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4`}>{f.icon}</div>
                  <h3 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 700, fontSize: '22px', color: '#e8e8f0', margin: '0 0 10px 0', lineHeight: 1.2 }}>{f.title}</h3>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.52)', margin: 0 }}>{f.desc}</p>
                </div>
                <ul className="space-y-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  {f.points.map((pt, j) => (
                    <li key={j} className="flex items-center gap-2.5" style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6ee7b7' }} />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,48px)', color: '#e8e8f0', letterSpacing: '-0.5px' }}>Simple Pricing</h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>Start free. Upgrade when you need more.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <div key={i}
                  className="soft-card p-8 rounded-2xl space-y-6 relative"
                  style={{
                    background: plan.gradient ? 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.08))' : 'rgba(255,255,255,0.03)',
                    border: plan.gradient ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  }}>
                  {plan.gradient && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(90deg,#7c3aed,#ec4899)', fontFamily: "'Poppins',sans-serif", color: '#fff', fontSize: '10px', letterSpacing: '1.5px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{plan.name}</p>
                    <p style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: '42px', color: '#e8e8f0', lineHeight: 1.1, margin: '8px 0 4px' }}>{plan.price}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{plan.desc}</p>
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((ft, j) => (
                      <li key={j} className="flex items-center gap-2.5" style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6ee7b7' }} />{ft}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/auth')}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: plan.gradient ? 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)' : 'rgba(255,255,255,0.06)',
                      border: plan.gradient ? 'none' : '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', fontFamily: "'Poppins',sans-serif", cursor: 'pointer',
                      boxShadow: plan.gradient ? '0 0 25px rgba(168,85,247,0.25)' : 'none',
                    }}>
                    {plan.cta} <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
