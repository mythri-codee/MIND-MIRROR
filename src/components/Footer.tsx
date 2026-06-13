import { Link } from 'react-router-dom';
import { Brain, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="print:hidden" style={{ background: '#07070e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)', boxShadow: '0 0 15px rgba(168,85,247,0.25)' }}>
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '15px', color: '#e8e8f0' }}>Mind Mirror</span>
            </div>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: '280px' }}>
              Objective capability analysis. Zero external API calls. Your data never leaves your browser.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home',     path: '/'         },
                { label: 'About',    path: '/about'    },
                { label: 'Features', path: '/features' },
                { label: 'Contact',  path: '/contact'  },
                { label: 'How It Works', path: '/demo' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c084fc')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-4">
            <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px' }}>Compliance</h4>
            <div className="space-y-2">
              {['No external API calls', '100% client-side privacy', 'Zero data retention', 'Print-ready PDF reports'].map(t => (
                <div key={t} className="flex items-center gap-2" style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(16,185,129,0.7)' }} />{t}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Mind Mirror — Candidate Capability Analysis System
          </p>
          <div className="flex gap-5">
            {[{ l: 'Contact', p: '/contact' }, { l: 'Features', p: '/features' }, { l: 'Demo', p: '/demo' }].map(item => (
              <Link key={item.p} to={item.p}
                style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(168,85,247,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                {item.l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
