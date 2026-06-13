import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, Check, AlertCircle,
  Brain, TrendingUp, Target, Zap, Shield, Star
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

/* ── tiny particle dot ── */
function Dot({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none animate-pulse" style={style} />;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin]   = useState(true);
  const [name,    setName]      = useState('');
  const [email,   setEmail]     = useState('');
  const [pwd,     setPwd]       = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showP,   setShowP]     = useState(false);
  const [showC,   setShowC]     = useState(false);
  const [remember,setRemember]  = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleSheet, setShowGoogleSheet] = useState(false);
  const [err,     setErr]       = useState('');
  const [okMsg,   setOkMsg]     = useState('');

  /* password criteria */
  const c8   = pwd.length >= 8;
  const cNum = /\d/.test(pwd);
  const cSpc = /[!@#$%^&*(),.?":{}|<>_\-]/.test(pwd);
  const cUpr = /[A-Z]/.test(pwd);
  const strength  = [c8,cNum,cSpc,cUpr].filter(Boolean).length;
  const sColor    = ['','#ef4444','#f59e0b','#3b82f6','#10b981'][strength];

  const getRegisteredUsers = () => {
    try {
      const raw = localStorage.getItem('mm_registered_users');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveRegisteredUsers = (users: any[]) => {
    localStorage.setItem('mm_registered_users', JSON.stringify(users));
  };

  const validate = (): string => {
    if (!email.trim()) return 'Email is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'Enter a valid professional email address.';
    if (!pwd) return 'Password is required.';
    if (pwd.length < 8) return 'Password must be at least 8 characters.';
    if (!isLogin) {
      if (!name.trim()) return 'Full name is required.';
      if (!cUpr || !/[a-z]/.test(pwd) || !cNum || !cSpc) return 'Password must contain uppercase, lowercase, number, and special character.';
      if (pwd !== confirm) return 'Passwords do not match.';
      const users = getRegisteredUsers();
      const exists = users.some((u: any) => String(u.email).toLowerCase() === email.trim().toLowerCase());
      if (exists) return 'Email already exists. Please login with your existing account.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setOkMsg('');
    const error = validate();
    if (error) { setErr(error); return; }
    setLoading(true);

    setTimeout(() => {
      const users = getRegisteredUsers();

      if (isLogin) {
        const existing = users.find((u: any) => String(u.email).toLowerCase() === email.trim().toLowerCase());
        if (!existing || existing.password !== pwd) {
          setErr('Invalid email or password.');
          setLoading(false);
          return;
        }
        const user = { name: existing.name, email: existing.email };
        localStorage.setItem('mm_user', JSON.stringify(user));
        onLoginSuccess(user);
        setOkMsg('✓ Access granted — redirecting…');
        setTimeout(() => navigate('/upload'), 900);
        setLoading(false);
        return;
      }

      const newUserRecord = {
        name: name.trim(),
        email: email.trim(),
        password: pwd,
        createdAt: new Date().toISOString()
      };
      const updatedUsers = [...users, newUserRecord];
      saveRegisteredUsers(updatedUsers);

      // After registration, move user to Sign In mode with email prefilled.
      setIsLogin(true);
      setName('');
      setConfirm('');
      setPwd('');
      setEmail(newUserRecord.email);
      setOkMsg('✓ Account created successfully. Please sign in with your registered email and password.');
      setLoading(false);
      return;
    }, 900);
  };

  const handleGoogle = () => {
    setErr('');
    setShowGoogleSheet(true);
  };

  const completeGoogleAuth = (account: { name: string; email: string }) => {
    setGoogleLoading(true);
    setTimeout(() => {
      const users = getRegisteredUsers();
      const existing = users.find((u: any) => String(u.email).toLowerCase() === account.email.toLowerCase());
      if (!existing) {
        users.push({ ...account, password: null, provider: 'google', createdAt: new Date().toISOString() });
        saveRegisteredUsers(users);
      }
      localStorage.setItem('mm_user', JSON.stringify(account));
      onLoginSuccess(account);
      setOkMsg('Google authentication successful — redirecting…');
      setShowGoogleSheet(false);
      setGoogleLoading(false);
      setTimeout(() => navigate('/upload'), 700);
    }, 1200);
  };

  const switchMode = () => {
    setIsLogin(v => !v);
    setErr(''); setOkMsg(''); setPwd(''); setConfirm(''); setName('');
  };

  /* input base */
  const INP: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '12px 14px 12px 42px',
    fontFamily: "'Poppins',sans-serif",
    fontSize: 13, color: '#e2e8f0',
    outline: 'none', transition: 'all 0.2s',
  };
  const onF = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(168,85,247,0.65)';
    e.target.style.boxShadow   = '0 0 0 3px rgba(168,85,247,0.12)';
    e.target.style.background  = 'rgba(168,85,247,0.07)';
  };
  const onB = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow   = 'none';
    e.target.style.background  = 'rgba(255,255,255,0.07)';
  };

  const LABEL: React.CSSProperties = {
    fontFamily:"'Poppins',sans-serif", fontWeight:600,
    fontSize:11, color:'rgba(255,255,255,0.55)',
    textTransform:'uppercase', letterSpacing:'0.8px',
    display:'block', marginBottom:6,
  };

  const features = [
    { icon:<TrendingUp className="w-3.5 h-3.5"/>, label:'Resume Analysis', color:'#8b5cf6', bg:'rgba(139,92,246,0.10)' },
    { icon:<Target className="w-3.5 h-3.5"/>,     label:'Career Matching', color:'#a855f7', bg:'rgba(168,85,247,0.10)' },
    { icon:<Zap className="w-3.5 h-3.5"/>,        label:'Skill Insights',  color:'#ec4899', bg:'rgba(236,72,153,0.10)' },
    { icon:<Shield className="w-3.5 h-3.5"/>,     label:'Privacy First',   color:'#c084fc', bg:'rgba(192,132,252,0.10)' },
  ];
  const avColors = ['#7c3aed','#a855f7','#c084fc','#ec4899','#818cf8'];

  /* particle dots  */
  const dots = [
    {top:'9%',  left:'38%', bg:'#a78bfa', s:5, dur:'2.4s'},
    {top:'7%',  left:'55%', bg:'#ec4899', s:4, dur:'3.0s'},
    {top:'13%', left:'63%', bg:'#c084fc', s:5, dur:'2.7s'},
    {top:'16%', left:'80%', bg:'#818cf8', s:4, dur:'3.3s'},
    {top:'35%', left:'60%', bg:'#a855f7', s:4, dur:'2.8s'},
    {top:'43%', left:'76%', bg:'#ec4899', s:5, dur:'2.2s'},
    {top:'57%', left:'38%', bg:'#818cf8', s:4, dur:'3.1s'},
    {top:'63%', left:'67%', bg:'#c084fc', s:4, dur:'2.6s'},
    {top:'72%', left:'50%', bg:'#a855f7', s:4, dur:'2.9s'},
    {top:'80%', left:'85%', bg:'#ec4899', s:5, dur:'3.2s'},
    {top:'88%', left:'30%', bg:'#818cf8', s:4, dur:'2.5s'},
    {top:'91%', left:'70%', bg:'#a78bfa', s:4, dur:'2.8s'},
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg,#07070e 0%,#0b0714 48%,#07070e 100%)',
      fontFamily: "'Poppins',sans-serif",
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── grid overlay ── */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:`linear-gradient(rgba(168,85,247,0.035) 1px,transparent 1px),
                         linear-gradient(90deg,rgba(168,85,247,0.035) 1px,transparent 1px)`,
        backgroundSize:'58px 58px',
      }}/>

      {/* ── glow blobs ── */}
      {[
        {w:400,h:400,top:'-5%', left:'-8%', bg:'rgba(124,58,237,0.12)'},
        {w:300,h:300,top:'40%', left:'18%', bg:'rgba(168,85,247,0.08)' },
        {w:250,h:250,top:'30%', left:'48%', bg:'rgba(236,72,153,0.07)'}, 
      ].map((g,i)=>(
        <div key={i} style={{
          position:'absolute', pointerEvents:'none',
          width:g.w, height:g.h, top:g.top, left:g.left,
          background:`radial-gradient(circle,${g.bg},transparent 70%)`,
          filter:'blur(55px)', borderRadius:'50%',
        }}/>
      ))}

      {/* ── floating dots ── */}
      {dots.map((d,i)=>(
        <Dot key={i} style={{
          top:d.top, left:d.left, width:d.s, height:d.s,
          background:d.bg, opacity:0.6,
          boxShadow:`0 0 ${d.s*2.5}px ${d.bg}90`,
          animationDuration:d.dur, animationDelay:`${i*0.13}s`,
        }}/>
      ))}

      {/* ── ghost cards ── */}
      {[
        {top:'10%', left:'32%', w:195, h:82},
        {top:'41%', left:'41%', w:80,  h:115},
        {top:'44%', left:'51%', w:195, h:88},
        {top:'60%', left:'34%', w:145, h:72},
      ].map((g,i)=>(
        <div key={i} style={{
          position:'absolute', pointerEvents:'none', borderRadius:16,
          top:g.top, left:g.left, width:g.w, height:g.h,
          background:'rgba(255,255,255,0.025)',
          border:'1px solid rgba(255,255,255,0.07)',
          backdropFilter:'blur(4px)',
        }}/>
      ))}
      {/* purple dot inside top ghost card */}
      <div className="animate-pulse" style={{
        position:'absolute', top:'16%', left:'40%',
        width:9, height:9, borderRadius:'50%',
        background:'#a855f7', boxShadow:'0 0 14px #a855f7',
        pointerEvents:'none',
      }}/>

      {/* ══════════════════════════════════════════════
          TOP BAR — logo only
      ══════════════════════════════════════════════ */}
      <div style={{
        position:'relative', zIndex:20,
        display:'flex', alignItems:'center', justifyContent:'flex-start',
        padding:'20px 60px',
        maxWidth:1280, width:'100%', margin:'0 auto', boxSizing:'border-box',
      }}>
        {/* logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:36, height:36, borderRadius:10,
            background:'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)',
            boxShadow:'0 0 18px rgba(168,85,247,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <Brain className="w-4 h-4 text-white"/>
          </div>
          <span style={{ fontWeight:700, fontSize:17, color:'#ffffff' }}>Mind Mirror</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN BODY — left content | right card
      ══════════════════════════════════════════════ */}
      <div style={{
        position:'relative', zIndex:20,
        flex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:40,
        padding:'0 60px 20px',
        maxWidth:1280, width:'100%', margin:'0 auto',
        boxSizing:'border-box',
      }}>

        {/* ══ LEFT ══ */}
        <div style={{ flex:'0 0 auto', width:'min(480px,45%)', display:'flex', flexDirection:'column', gap:22 }}>

          {/* tag */}
          <p style={{ margin:0, fontWeight:600, fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'2.5px', textTransform:'uppercase' }}>
            Career Intelligence Platform
          </p>

          {/* heading */}
          <div style={{ lineHeight:1.12 }}>
            <h1 style={{ margin:0, fontWeight:800, fontSize:'clamp(2rem,3vw,3rem)', color:'#f8fafc' }}>Find Your</h1>
            <h1 style={{ margin:0, fontWeight:800, fontSize:'clamp(2rem,3vw,3rem)', background:'linear-gradient(90deg,#8b5cf6 0%,#a855f7 42%,#ec4899 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Career Path</h1>
          </div>

          {/* description */}
          <p style={{ margin:0, fontSize:13.5, lineHeight:1.85, color:'rgba(255,255,255,0.48)', maxWidth:380 }}>
            Mind Mirror empowers you to make confident career decisions through intelligent resume analysis.
            We identify your core competencies, hidden strengths, and transferable skills to pinpoint roles
            where you will thrive.
          </p>

          {/* 2×2 feature grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, maxWidth:380 }}>
            {features.map((f,i)=>(
              <div key={i}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'11px 14px', borderRadius:12,
                  background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.09)',
                  cursor:'default', transition:'all 0.2s',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.background=f.bg; e.currentTarget.style.borderColor=f.color+'50'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; }}>
                <div style={{
                  width:28, height:28, borderRadius:8, flexShrink:0,
                  background:f.bg, color:f.color,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {f.icon}
                </div>
                <span style={{ fontWeight:600, fontSize:12.5, color:'rgba(255,255,255,0.8)' }}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* social proof */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex' }}>
              {avColors.map((c,i)=>(
                <div key={i} style={{
                  width:34, height:34, borderRadius:'50%',
                  background:c, border:'2px solid #07070e',
                  marginLeft: i===0?0:-8,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontWeight:700, fontSize:11, color:'#fff',
                }}>
                  {String.fromCharCode(65+i)}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display:'flex', gap:2, marginBottom:2 }}>
                {[...Array(5)].map((_,i)=><Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400"/>)}
              </div>
              <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,0.48)' }}>
                <strong style={{ color:'#fff' }}>10,000+</strong> professionals guided
              </p>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — single aligned stack: card + tabs + bottom link ══ */}
        <div style={{
          flex:'0 0 auto',
          width:'min(440px, 42%)',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          gap:14,
        }}>

          {/* login/signup card */}
          <div style={{
            width:'100%',
            background:'rgba(10,10,20,0.84)',
            border:'1px solid rgba(168,85,247,0.16)',
            borderRadius:20,
            padding:'32px 32px 28px',
            backdropFilter:'blur(24px)',
            boxShadow:'0 25px 60px rgba(0,0,0,0.55)',
          }}>

            {/* heading */}
            <div style={{ marginBottom:20 }}>
              <h2 style={{ margin:'0 0 4px', fontWeight:700, fontSize:24, color:'#ffffff' }}>
                {isLogin ? 'Welcome back 👋' : 'Create your account'}
              </h2>
              <p style={{ margin:0, fontSize:13, color:'rgba(255,255,255,0.4)' }}>
                {isLogin ? 'Enter your credentials to access your dashboard' : "Join 10,000+ professionals — it's free forever"}
              </p>
            </div>

            {/* alerts */}
            {err && (
              <div style={{ display:'flex', gap:8, alignItems:'flex-start', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:10, padding:'10px 12px', marginBottom:14 }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color:'#f87171', marginTop:1 }}/>
                <p style={{ margin:0, fontSize:12, color:'#f87171', lineHeight:1.5 }}>{err}</p>
              </div>
            )}
            {okMsg && (
              <div style={{ display:'flex', gap:8, alignItems:'center', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:10, padding:'10px 12px', marginBottom:14 }}>
                <Check className="w-4 h-4 flex-shrink-0" style={{ color:'#6ee7b7' }}/>
                <p style={{ margin:0, fontSize:12, color:'#6ee7b7' }}>{okMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }} noValidate>
              {!isLogin && (
                <div>
                  <label style={LABEL}>Full Name <span style={{ color:'#ef4444' }}>*</span></label>
                  <div style={{ position:'relative' }}>
                    <User className="absolute" style={{ left:12, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'rgba(255,255,255,0.3)', pointerEvents:'none' }}/>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" style={INP} onFocus={onF} onBlur={onB} disabled={loading} autoComplete="name"/>
                  </div>
                </div>
              )}

              <div>
                <label style={LABEL}>Email Address <span style={{ color:'#ef4444' }}>*</span></label>
                <div style={{ position:'relative' }}>
                  <Mail className="absolute" style={{ left:12, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'rgba(255,255,255,0.3)', pointerEvents:'none' }}/>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@gmail.com" style={INP} onFocus={onF} onBlur={onB} disabled={loading} autoComplete="email"/>
                </div>
              </div>

              <div>
                <label style={LABEL}>Password <span style={{ color:'#ef4444' }}>*</span></label>
                <div style={{ position:'relative' }}>
                  <Lock className="absolute" style={{ left:12, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'rgba(255,255,255,0.3)', pointerEvents:'none' }}/>
                  <input type={showP?'text':'password'} value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" style={{ ...INP, paddingRight:42 }} onFocus={onF} onBlur={onB} disabled={loading} autoComplete={isLogin?'current-password':'new-password'}/>
                  <button type="button" onClick={()=>setShowP(!showP)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.35)', background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                    {showP?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                  </button>
                </div>
                {!isLogin && pwd.length>0 && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:'flex', gap:4, marginBottom:5 }}>
                      {[1,2,3,4].map(n=>(<div key={n} style={{ flex:1, height:3, borderRadius:99, background:n<=strength?sColor:'rgba(255,255,255,0.1)', transition:'all 0.3s' }}/>))}
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px 8px' }}>
                      {([['8+ characters',c8],['Uppercase (A-Z)',cUpr],['Number (0-9)',cNum],['Special (!@#)',cSpc]] as [string,boolean][]).map(([l,m])=>(
                        <span key={l} style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:m?'#10b981':'rgba(255,255,255,0.3)' }}>
                          <Check className="w-2.5 h-2.5 flex-shrink-0" style={{ opacity:m?1:0.2 }}/>{l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label style={LABEL}>Confirm Password <span style={{ color:'#ef4444' }}>*</span></label>
                  <div style={{ position:'relative' }}>
                    <Lock className="absolute" style={{ left:12, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:'rgba(255,255,255,0.3)', pointerEvents:'none' }}/>
                    <input type={showC?'text':'password'} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Re-enter password" style={{ ...INP, paddingRight:42, borderColor:confirm&&confirm!==pwd?'rgba(239,68,68,0.6)':'rgba(255,255,255,0.1)' }} onFocus={onF} onBlur={onB} disabled={loading} autoComplete="new-password"/>
                    <button type="button" onClick={()=>setShowC(!showC)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.35)', background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                      {showC?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                  {confirm&&confirm!==pwd&&<p style={{ margin:'4px 0 0', fontSize:11, color:'#f87171' }}>Passwords do not match</p>}
                  {confirm&&confirm===pwd&&pwd.length>=8&&<p style={{ margin:'4px 0 0', fontSize:11, color:'#10b981', display:'flex', alignItems:'center', gap:4 }}><Check className="w-3 h-3"/>Passwords match</p>}
                </div>
              )}

              {isLogin && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', userSelect:'none' }}>
                    <div style={{ width:16, height:16, borderRadius:4, border:`2px solid ${remember?'#a855f7':'rgba(255,255,255,0.3)'}`, background:remember?'#a855f7':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', transition:'all 0.2s' }} onClick={()=>setRemember(!remember)}>
                      {remember&&<Check className="w-2.5 h-2.5 text-white"/>}
                    </div>
                    <span style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>Remember me</span>
                  </label>
                  <button type="button" onClick={()=>alert('A password reset link would be sent to your email.')} style={{ fontSize:13, color:'rgba(255,255,255,0.45)', background:'none', border:'none', cursor:'pointer', padding:0 }} onMouseEnter={e=>(e.currentTarget.style.color='#c084fc')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}>
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" disabled={loading} style={{ width:'100%', padding:'13px', borderRadius:10, background:'linear-gradient(90deg,#7c3aed 0%,#a855f7 55%,#ec4899 100%)', border:'none', cursor:loading?'not-allowed':'pointer', fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:15, color:'#ffffff', opacity:loading?0.7:1, boxShadow:'0 4px 22px rgba(168,85,247,0.28)', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} onMouseEnter={e=>{ if(!loading)(e.currentTarget as HTMLButtonElement).style.opacity='0.92'; }} onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.opacity='1'; }}>
                {loading?(
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                ):isLogin?'Sign In':'Create Account'}
              </button>
            </form>

            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'16px 0' }}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.09)' }}/>
              <span style={{ fontSize:11.5, color:'rgba(255,255,255,0.3)' }}>or continue with</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.09)' }}/>
            </div>

            <button onClick={handleGoogle} type="button" disabled={loading || googleLoading} style={{ width:'100%', padding:'12px', borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1.5px solid rgba(255,255,255,0.12)', cursor:(loading || googleLoading)?'not-allowed':'pointer', fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:'rgba(255,255,255,0.82)', opacity:(loading || googleLoading)?0.6:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.2s' }} onMouseEnter={e=>{ const b=e.currentTarget; b.style.background='rgba(255,255,255,0.1)'; b.style.borderColor='rgba(255,255,255,0.22)'; }} onMouseLeave={e=>{ const b=e.currentTarget; b.style.background='rgba(255,255,255,0.06)'; b.style.borderColor='rgba(255,255,255,0.12)'; }}>
              {googleLoading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.15 2.78-2.44 3.63v3.01h3.94c2.31-2.13 3.64-5.27 3.64-8.49z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.94-3.01c-1.08.72-2.45 1.14-3.99 1.14-3.07 0-5.66-2.07-6.59-4.86H1.36v3.1C3.33 21.44 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.41 14.36A7.18 7.18 0 015.04 12c0-.82.14-1.61.37-2.36V6.54H1.36A11.98 11.98 0 000 12c0 1.93.46 3.76 1.36 5.46l4.05-3.1z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.61 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0 7.4 0 3.33 2.56 1.36 6.54l4.05 3.1C6.34 6.82 8.93 4.75 12 4.75z"/></svg>
              )}
              {googleLoading ? 'Authenticating with Google…' : 'Sign in with Google'}
            </button>
          </div>

          {/* tabs moved below card */}
          <div style={{
            display:'flex', gap:4,
            background:'rgba(255,255,255,0.06)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:12, padding:4,
            width:'100%', maxWidth:300,
          }}>
            {['Sign In','Sign Up'].map((t,i)=>(
              <button key={t} type="button" onClick={()=>{ if((i===0)!==isLogin) switchMode(); }}
                style={{
                  flex:1, padding:'9px 0', borderRadius:9,
                  background:(i===0)===isLogin
                    ?'linear-gradient(135deg,#7c3aed,#8b5cf6,#ec4899)'
                    :'transparent',
                  color:(i===0)===isLogin?'#ffffff':'rgba(255,255,255,0.45)',
                  border:'none', cursor:'pointer',
                  fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14,
                  boxShadow:(i===0)===isLogin?'0 4px 14px rgba(168,85,247,0.28)':'none',
                  transition:'all 0.2s',
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* bottom helper text */}
          <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,0.38)', textAlign:'center' }}>
            {isLogin?"Don't have an account? ":"Already have an account? "}
            <button type="button" onClick={switchMode} style={{ color:'#c084fc', fontWeight:700, background:'none', border:'none', cursor:'pointer', fontSize:14, padding:0 }} onMouseEnter={e=>(e.currentTarget.style.textDecoration='underline')} onMouseLeave={e=>(e.currentTarget.style.textDecoration='none')}>
              {isLogin?'Sign up free →':'← Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* bottom only back to home */}
      <div style={{ position:'relative', zIndex:20, maxWidth:1280, width:'100%', margin:'0 auto', padding:'0 60px 24px', boxSizing:'border-box' }}>
        <Link to="/" style={{ fontSize:13, color:'rgba(255,255,255,0.35)', textDecoration:'none', display:'flex', alignItems:'center', gap:4, width:'fit-content' }} onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.65)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>
          ← Back to home
        </Link>
      </div>

      {/* ── Simulated Google Account Picker ── */}
      {showGoogleSheet && (
        <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div style={{ width:'100%', maxWidth:420, background:'#11162c', border:'1px solid rgba(255,255,255,0.1)', borderRadius:18, boxShadow:'0 30px 80px rgba(0,0,0,0.6)', overflow:'hidden' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.15 2.78-2.44 3.63v3.01h3.94c2.31-2.13 3.64-5.27 3.64-8.49z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.94-3.01c-1.08.72-2.45 1.14-3.99 1.14-3.07 0-5.66-2.07-6.59-4.86H1.36v3.1C3.33 21.44 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.41 14.36A7.18 7.18 0 015.04 12c0-.82.14-1.61.37-2.36V6.54H1.36A11.98 11.98 0 000 12c0 1.93.46 3.76 1.36 5.46l4.05-3.1z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.61 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0 7.4 0 3.33 2.56 1.36 6.54l4.05 3.1C6.34 6.82 8.93 4.75 12 4.75z"/></svg>
                <div>
                  <p style={{ margin:0, fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:16, color:'#fff' }}>Choose an account</p>
                  <p style={{ margin:'2px 0 0 0', fontFamily:"'Poppins',sans-serif", fontSize:12, color:'rgba(255,255,255,0.45)' }}>to continue to Mind Mirror</p>
                </div>
              </div>
              <button onClick={() => { if (!googleLoading) setShowGoogleSheet(false); }} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor: googleLoading ? 'not-allowed' : 'pointer', fontSize:22, lineHeight:1 }}>×</button>
            </div>
            <div style={{ padding:12 }}>
              {[
                { name:'Alex Carter', email:'alex@gmail.com', color:'#6366f1' },
                { name:'Maya Singh', email:'maya.singh@gmail.com', color:'#a855f7' },
              ].map((acc, i) => (
                <button key={i} onClick={() => completeGoogleAuth(acc)} disabled={googleLoading}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', cursor:googleLoading?'not-allowed':'pointer', marginBottom:10, textAlign:'left' }}
                  onMouseEnter={e=>{ if(!googleLoading){ e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.18)'; } }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:acc.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:14, flexShrink:0 }}>
                    {acc.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:'#fff' }}>{acc.name}</p>
                    <p style={{ margin:'2px 0 0 0', fontFamily:"'Poppins',sans-serif", fontSize:12, color:'rgba(255,255,255,0.45)' }}>{acc.email}</p>
                  </div>
                  {googleLoading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" style={{ color:'#c084fc' }}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
