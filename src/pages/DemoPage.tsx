import { useNavigate } from 'react-router-dom';
import { Upload, Brain, ClipboardList, BarChart2, FileText, Rocket, ChevronRight, Play, Check } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function DemoPage() {
  const navigate = useNavigate();

  const steps = [
    {
      num: '01',
      icon: <Upload className="w-8 h-8" />,
      color: 'from-indigo-500 to-violet-600',
      glow: 'rgba(99,102,241,0.3)',
      title: 'Upload Your Resume',
      desc: 'Drag and drop your PDF, DOCX, or TXT resume file into the upload zone. Our client-side parser immediately begins reading character lines, extracting your name, skills, experience timeline, education records, and project highlights.',
      highlights: ['Supports PDF, DOCX, TXT', 'Max file size: 10MB', '100% processed in your browser', 'No server upload required'],
      duration: '~10 seconds',
    },
    {
      num: '02',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-violet-500 to-purple-600',
      glow: 'rgba(139,92,246,0.3)',
      title: 'Skill Extraction & Domain Mapping',
      desc: 'The extraction engine cross-references your parsed text against our comprehensive skill taxonomy — covering 45+ professional domains from Full Stack Development to Neurology, Civil Engineering to Corporate Law.',
      highlights: ['45+ professional domains', '300+ technical skills indexed', 'Confidence percentage scoring', 'Primary + secondary domain matches'],
      duration: '~15 seconds',
    },
    {
      num: '03',
      icon: <ClipboardList className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-600',
      glow: 'rgba(236,72,153,0.3)',
      title: 'Adaptive Assessment Challenge',
      desc: 'Take a 15-question assessment built specifically for your detected domain. Questions include MCQ, scenario-based, true/false, and logical reasoning — all randomized so they never repeat. A 60-second timer governs the full test.',
      highlights: ['15 non-repeating questions', '60-second total timer', 'MCQ + Scenario + Logic + True/False', 'Auto-scores on completion'],
      duration: '~60 seconds',
    },
    {
      num: '04',
      icon: <BarChart2 className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6,182,212,0.3)',
      title: 'Analytics Dashboard & Domain Prediction',
      desc: 'Your results are instantly plotted across four Recharts visualizations: a radar capability profile, area performance curve, bar skill breakdown, and accuracy doughnut. Your final predicted domain and confidence index appear with a breakdown of strengths and weak areas.',
      highlights: ['Radar + Area + Bar + Doughnut charts', 'Capability confidence index', 'Strengths & weak area breakdown', 'Recommended skill paths'],
      duration: 'Instant',
    },
    {
      num: '05',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-600',
      glow: 'rgba(245,158,11,0.3)',
      title: 'Download Capability Passport',
      desc: 'Generate your verified, print-ready Capability Report. It includes a unique candidate ID, domain confidence scores, verified skill badge grid, performance level indicator, and a digital integrity signature — ready to share with any recruiter or HR platform.',
      highlights: ['Unique certificate ID', 'Verified skill badges', 'Print-to-PDF ready', 'Shareable verification link'],
      duration: 'Instant PDF',
    },
  ];

  return (
    <PageShell>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              <Play className="w-3.5 h-3.5 fill-current" /> How It Works
            </div>
            <h1 style={{ fontFamily: "'EB Garamond','Georgia',serif", fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,64px)', lineHeight: 1.0, letterSpacing: '-1px', color: '#e8e8f0', margin: 0 }}>
              From Resume to <br />
              <span style={{ background: 'linear-gradient(90deg,#818cf8,#a78bfa,#c084fc,#e879f9,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                Verified Capability
              </span>
            </h1>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(0.875rem,1.6vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto' }}>
              Five deterministic steps. Under 2 minutes total. Fully private, fully client-side. Here's exactly how Mind Mirror works.
            </p>
            {/* Total time badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '13px', color: '#6ee7b7' }}>
              <Check className="w-4 h-4" /> Total time: Under 2 minutes
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[28px] top-[80px] w-0.5 h-8" style={{ background: 'linear-gradient(to bottom,rgba(168,85,247,0.3),transparent)' }} />
                )}

                <div className="soft-card p-7 sm:p-8 rounded-3xl space-y-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.28)'; e.currentTarget.style.boxShadow = `0 0 40px ${step.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}>

                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Icon + number */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-2`}>
                        {step.icon}
                      </div>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: '11px', color: 'rgba(168,85,247,0.6)', letterSpacing: '2px', textAlign: 'center' }}>{step.num}</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 700, fontSize: 'clamp(1.3rem,3vw,26px)', color: '#e8e8f0', margin: 0 }}>{step.title}</h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7', fontFamily: "'Poppins',sans-serif", fontWeight: 600, whiteSpace: 'nowrap' }}>
                          ⏱ {step.duration}
                        </span>
                      </div>

                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{step.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {step.highlights.map((hl, j) => (
                          <div key={j} className="flex items-center gap-2.5"
                            style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6ee7b7' }} />{hl}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 py-12 px-6 rounded-3xl"
            style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(168,85,247,0.06))', border: '1px solid rgba(168,85,247,0.2)' }}>
            <h2 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,42px)', color: '#e8e8f0', margin: 0 }}>
              Ready to Try It Yourself?
            </h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.55)', margin: '12px auto 0', maxWidth: '400px' }}>
              Create your free account and get your Capability Passport in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button onClick={() => navigate('/auth')}
                className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)', padding: '16px 40px', borderRadius: '16px', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 0 35px rgba(168,85,247,0.35)' }}>
                <Rocket className="w-5 h-5" /> Start Free Analysis <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
