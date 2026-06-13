/* Shared dark background + grid used on EVERY page */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: '#07070e', color: '#ffffff' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        zIndex: 0,
      }} />
      {/* Faint central glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(80,20,140,0.12) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
