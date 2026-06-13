import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Activity, Check, MapPin, Clock, Shield } from 'lucide-react';
import PageShell from '../components/PageShell';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
emailjs.init('Xoib5RAMB0kYC3zI2'); 
const SERVICE_ID = 'service_siyrq3x';
const TEMPLATE_ID = 'template_8kcj80x';
const RECIPIENT = 'mindmirror85@gmail.com';

export default function ContactPage() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [msg,     setMsg]     = useState('');
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [err,     setErr]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');

    /* ── Client-side validation ── */
    if (!name.trim() || !email.trim() || !subject.trim() || !msg.trim()) {
      setErr('All fields are required.'); return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErr('Please enter a valid professional email address.'); return;
    }
    if (msg.length < 15) {
      setErr('Message must be at least 15 characters.'); return;
    }

    setSending(true);

    try {
      // Send using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          subject: subject.trim(),
          message: msg.trim(),
          to_email: RECIPIENT
        }
      );
      
      setSent(true);
      setName(''); setEmail(''); setSubject(''); setMsg('');
      setTimeout(() => setSent(false), 8000);

    } catch (error: any) {
      console.error('EmailJS error:', error);
      setErr(
        `Failed to send. Please email us directly at ${RECIPIENT}`
      );
    } finally {
      setSending(false);
    }
  };

  /* ── Shared styles ── */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '14px 16px',
    fontFamily: "'Poppins',sans-serif",
    fontSize: '14px',
    color: '#e8e8f0',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Poppins',sans-serif",
    fontWeight: 600,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '8px',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(168,85,247,0.55)';
    e.target.style.background  = 'rgba(168,85,247,0.04)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.background  = 'rgba(255,255,255,0.03)';
  };

  /* ── Contact info cards ── */
  const info = [
    { icon: <Mail className="w-5 h-5" />,   label: 'Email',         value: RECIPIENT,             color: '#a78bfa', href: `mailto:${RECIPIENT}` },
    { icon: <Clock className="w-5 h-5" />,  label: 'Response Time', value: 'Within 24 hours',     color: '#6ee7b7', href: null },
    { icon: <MapPin className="w-5 h-5" />, label: 'Platform',      value: 'Fully Remote — Global',color: '#f9a8d4', href: null },
    { icon: <Shield className="w-5 h-5" />, label: 'Privacy',       value: 'Zero data retention', color: '#fcd34d', href: null },
  ];

  return (
    <PageShell>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* ── Page Header ── */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
              Get In Touch
            </div>

            <h1 style={{ fontFamily: "'EB Garamond','Georgia',serif", fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,64px)', lineHeight: 1.0, letterSpacing: '-1px', color: '#e8e8f0', margin: 0 }}>
              We'd Love to{' '}
              <span style={{ background: 'linear-gradient(90deg,#818cf8,#a78bfa,#c084fc,#e879f9,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                Hear From You
              </span>
            </h1>

            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(0.875rem,1.6vw,18px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '540px', margin: '0 auto' }}>
              Have a question, proposal, or just want to say hello? Fill out the form and your message will be delivered directly to our inbox.
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── Contact Form ── */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl space-y-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc' }}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 700, fontSize: '26px', color: '#e8e8f0', margin: 0 }}>
                  Send a Message
                </h3>
              </div>

              {/* Error banner */}
              {err && (
                <div className="p-4 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#f87171', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
                    {err}
                  </p>
                </div>
              )}

              {/* Success banner */}
              {sent && (
                <div className="p-4 rounded-xl flex items-start gap-3"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#6ee7b7' }} />
                  <div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', color: '#6ee7b7', fontWeight: 700, margin: 0 }}>
                      Message sent successfully! 🎉
                    </p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', color: 'rgba(110,231,183,0.75)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                      Your message has been delivered to <strong>{RECIPIENT}</strong>. We'll reply within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your name"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      disabled={sending}
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      disabled={sending}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Enter your subject"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={sending}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    rows={6}
                    placeholder="Describe your request in detail..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={sending}
                  />
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '6px' }}>
                    Minimum 15 characters · Delivered securely to {RECIPIENT}
                  </p>
                </div>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full flex items-center justify-center gap-2.5 transition-all duration-300"
                  style={{
                    background: sent
                      ? 'linear-gradient(135deg,#059669,#10b981)'
                      : 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)',
                    padding: '16px',
                    borderRadius: '14px',
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#fff',
                    border: 'none',
                    cursor: sending || sent ? 'not-allowed' : 'pointer',
                    boxShadow: sent
                      ? '0 0 30px rgba(16,185,129,0.25)'
                      : '0 0 30px rgba(168,85,247,0.3)',
                    opacity: sending ? 0.8 : 1,
                    transform: sending ? 'scale(0.99)' : 'scale(1)',
                  }}
                  onMouseEnter={e => { if (!sending && !sent) (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  {sending ? (
                    <><Activity className="w-4 h-4 animate-spin" /> Sending your message...</>
                  ) : sent ? (
                    <><Check className="w-4 h-4" /> Message Sent!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>

              </form>
            </div>

            {/* ── Contact Info ── */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <h3 style={{ fontFamily: "'EB Garamond',serif", fontWeight: 700, fontSize: '30px', color: '#e8e8f0', margin: 0 }}>
                  Contact Information
                </h3>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.48)', margin: 0 }}>
                  Our team monitors inquiries around the clock. Enterprise clients receive dedicated response lines.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {info.map((item, i) => (
                  <div key={i} className="soft-card flex items-center gap-4 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.05)', color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 3px 0' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: 600, color: '#e8e8f0', textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#c084fc')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#e8e8f0')}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: 600, color: '#e8e8f0', margin: 0 }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct email tip */}
              <div className="p-5 rounded-2xl"
                style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)' }}>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
                  💡 <strong style={{ color: '#c084fc' }}>Prefer direct email?</strong> Reach us at{' '}
                  <a href={`mailto:${RECIPIENT}`}
                    style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                    {RECIPIENT}
                  </a>
                  {' '}for urgent inquiries.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
