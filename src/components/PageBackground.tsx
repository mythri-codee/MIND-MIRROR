import { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  showHalo?: boolean;
}

const sparkles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 5}s`,
  color: ['rgba(34, 211, 238, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.3)'][Math.floor(Math.random() * 3)]
}));

export default function PageBackground({ children, showHalo = false }: PageBackgroundProps) {
  return (
    <div className="relative overflow-hidden cyberpunk-bg min-h-screen">
      {/* Atomic Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map(s => (
          <div
            key={s.id}
            className="absolute rounded-full animate-atomic-sparkle"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 5}px ${s.color}`,
              animationDelay: s.delay
            }}
          />
        ))}
      </div>

      {/* Title halo (optional, used on hero pages) */}
      {showHalo && <div className="title-halo -z-10"></div>}
      
      <div className="absolute inset-0 -z-10 animated-grid"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-slate-800/10 rounded-full blur-[220px] -z-10 animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[220px] bg-indigo-950/8 rounded-full blur-[200px] -z-10 animate-blob" style={{ animationDelay: '5s' }}></div>
      
      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
