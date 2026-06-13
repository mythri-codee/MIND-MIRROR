import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Shield, Users, Award, ChevronRight } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function AboutPage() {
  const navigate = useNavigate();

  const stats = [
    { value: '98%',    label: 'Mapping Accuracy',   color: '#a78bfa' },
    { value: '18,500+',label: 'Resumes Parsed',      color: '#ec4899' },
    { value: '45+',    label: 'Professional Fields', color: '#818cf8' },
    { value: 'Zero',   label: 'API Key Leaks',        color: '#6ee7b7' },
  ];

  const values = [
    { icon: <Brain className="w-6 h-6" />, title: 'Intelligent Parsing', desc: 'Our structural text parser reads raw character lines, extracts certified credentials, and maps multi-disciplinary skills with 98% accuracy across 45+ professional domains.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Privacy First', desc: 'Everything runs fully client-side. No external API calls, no data leaks. Your resume never leaves your browser — guaranteed.' },
    { icon: <Target className="w-6 h-6" />, title: 'Precision Matching', desc: 'Our domain taxonomy engine cross-references your skills against live industry standards to pinpoint your best-fit career path with confidence scores.' },
    { icon: <Users className="w-6 h-6" />, title: 'Built for Professionals', desc: 'Designed for candidates, recruiters, and HR teams alike — Mind Mirror provides an objective, tamper-proof capability report in under 2 minutes.' },
  ];

  return (
    <PageShell>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* Hero */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full backdrop-blur-md"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              About Mind Mirror
            </div>

            <h1 style={{ fontFamily: "'EB Garamond','Georgia',serif", fontWeight: 800, fontSize: 'clamp(2.4rem,6vw,72px)', lineHeight: 1.0, letterSpacing: '-1px', color: '#e8e8f0', margin: 0 }}>
              Redefining How the World <br />
              <span style={{ background: 'linear-gradient(90deg,#818cf8,#a78bfa,#c084fc,#e879f9,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                Evaluates Talent
              </span>
            </h1>

            <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 'clamp(0.9rem,1.8vw,20px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)', maxWidth: '700px', margin: '0 auto' }}>
              Mind Mirror is a deterministic candidate capability analysis platform — built to eliminate resume inflation, expose genuine competencies, and deliver objective career-domain intelligence without a single external API call.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="soft-card text-center p-6 rounded-2xl animate-fade-in"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', animationDelay: `${i * 100}ms` }}>
                <p style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '8px' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,48px)', color: '#e8e8f0', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                Our Mission
              </h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)' }}>
                We believe every candidate deserves to be evaluated on genuine capability — not formatting skills or keyword stuffing. Mind Mirror strips away the noise and reveals the signal: your actual professional competency.
              </p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)' }}>
                By combining structural text parsing, adaptive assessment generation, and domain taxonomy mapping, we deliver objective, reproducible capability reports that hiring teams can trust.
              </p>
              <button onClick={() => navigate('/auth')}
                className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)', padding: '14px 32px', borderRadius: '14px', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '14px', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(168,85,247,0.25)' }}>
                Get Started Free <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual card */}
            <div className="p-8 rounded-3xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#ec4899)' }}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '14px', color: '#e8e8f0' }}>Capability Passport</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Verified • Tamper-proof</p>
                </div>
              </div>
              {['Resume Parsing', 'Skill Extraction', 'Domain Mapping', 'Adaptive Assessment', 'Capability Report'].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', fontFamily: "'Poppins',sans-serif", fontSize: '10px', fontWeight: 700, color: '#c084fc' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 h-8 rounded-lg flex items-center px-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                    {step}
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#6ee7b7' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-10">
            <h2 className="text-center" style={{ fontFamily: "'EB Garamond',serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,48px)', color: '#e8e8f0', letterSpacing: '-0.5px' }}>
              Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div key={i} className="soft-card p-7 rounded-2xl space-y-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)')}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc' }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 700, fontSize: '22px', color: '#e8e8f0', margin: 0 }}>{v.title}</h3>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted By */}
          <div className="text-center space-y-8 py-12 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {['GOOGLE', 'MICROSOFT', 'AMAZON', 'META', 'NETFLIX', 'APPLE'].map(n => (
                <span key={n} style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 'clamp(14px,2vw,20px)', color: 'rgba(255,255,255,0.12)', letterSpacing: '2px', transition: 'color 0.3s' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => (e.currentTarget.style.color = 'rgba(168,85,247,0.6)')}
                  onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => (e.currentTarget.style.color = 'rgba(255,255,255,0.12)')}>
                  {n}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
