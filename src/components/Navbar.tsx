import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, Sun, Moon, LogOut, UserCheck } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function Navbar({ theme, toggleTheme, user, onLogout }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Public nav links — always visible
  const publicLinks = [
    { label: 'Home',     path: '/'         },
    { label: 'About',    path: '/about'    },
    { label: 'Features', path: '/features' },
    { label: 'Contact',  path: '/contact'  },
  ];

  // App nav links — shown when logged in
  const appLinks = [
    { label: 'Upload',    path: '/upload'     },
    { label: 'Test',      path: '/assessment' },
    { label: 'Dashboard', path: '/dashboard'  },
    { label: 'Analytics', path: '/analytics'  },
    { label: 'Report',    path: '/report'     },
  ];

  const isPublicPage = ['/', '/home', '/about', '/features', '/contact'].includes(location.pathname);
  const activeLinks  = isPublicPage ? publicLinks : appLinks;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full print:hidden">
      <div style={{ background: 'rgba(7,7,14,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex h-[68px] items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '16px', color: '#ffffff', letterSpacing: '-0.3px' }}>
                Mind Mirror
              </span>
            </Link>

            {/* ── RIGHT PANEL — nav links + theme + get started ── */}
            <div className="flex items-center gap-1">

              {/* Desktop nav links — RIGHT side */}
              {isPublicPage && (
                <nav className="hidden md:flex items-center gap-0.5 mr-2">
                  {publicLinks.map(link => (
                    <Link key={link.path} to={link.path}
                      className="transition-all duration-200"
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontWeight: isActive(link.path) ? 600 : 500,
                        fontSize: '14px',
                        padding: '8px 15px',
                        borderRadius: '10px',
                        background: isActive(link.path) ? 'rgba(168,85,247,0.14)' : 'transparent',
                        color: isActive(link.path) ? '#c084fc' : 'rgba(255,255,255,0.62)',
                        border: isActive(link.path) ? '1px solid rgba(168,85,247,0.28)' : '1px solid transparent',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => {
                        if (!isActive(link.path)) {
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive(link.path)) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}

              {/* Inner-page nav links */}
              {!isPublicPage && (
                <nav className="hidden md:flex items-center gap-0.5 mr-2">
                  {appLinks.map(link => (
                    <Link key={link.path} to={link.path}
                      className="transition-all duration-200"
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontWeight: isActive(link.path) ? 600 : 500,
                        fontSize: '13px',
                        padding: '7px 13px',
                        borderRadius: '9px',
                        background: isActive(link.path) ? 'rgba(168,85,247,0.14)' : 'transparent',
                        color: isActive(link.path) ? '#c084fc' : 'rgba(255,255,255,0.55)',
                        border: isActive(link.path) ? '1px solid rgba(168,85,247,0.28)' : '1px solid transparent',
                        textDecoration: 'none',
                      }}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}

              {/* Divider */}
              <div className="hidden md:block w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Theme Toggle */}
              <button onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', background: 'transparent', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}>
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Logged-in user */}
              {user && (
                <div className="hidden sm:flex items-center gap-2 ml-1">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                    <UserCheck className="w-3.5 h-3.5" style={{ color: '#6ee7b7' }} />
                    <span className="truncate max-w-[80px]">{user.name}</span>
                  </div>
                  <button onClick={onLogout}
                    className="p-2 rounded-xl transition-all duration-200"
                    style={{ border: '1px solid rgba(239,68,68,0.18)', color: '#f87171', background: 'transparent', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Get Started button */}
              {!user && (
                <button onClick={() => navigate('/auth')}
                  className="hidden sm:flex items-center transition-all duration-300 hover:scale-[1.03] hover:opacity-92 ml-1"
                  style={{
                    background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)',
                    padding: '10px 22px', borderRadius: '12px',
                    fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '14px',
                    color: '#ffffff', border: 'none', cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(168,85,247,0.22)',
                  }}>
                  Get Started
                </button>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-xl md:hidden transition-all ml-1"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', background: 'transparent', cursor: 'pointer' }}>
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden py-4 px-5 space-y-1 animate-fade-in"
          style={{ background: 'rgba(7,7,14,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
          {activeLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
              className="block transition-colors"
              style={{
                fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: '14px',
                padding: '12px 16px', borderRadius: '10px',
                color: isActive(link.path) ? '#c084fc' : 'rgba(255,255,255,0.65)',
                background: isActive(link.path) ? 'rgba(168,85,247,0.12)' : 'transparent',
              }}>
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)', fontFamily: "'Poppins',sans-serif" }}>
                Get Started
              </button>
            </div>
          )}
          {user && (
            <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{user.name}</span>
              <button onClick={() => { onLogout(); setMobileOpen(false); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', fontFamily: "'Poppins',sans-serif" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
