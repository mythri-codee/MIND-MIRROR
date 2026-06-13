interface MarqueeProps {
  items: { label: string; icon?: string }[];
  reverse?: boolean;
  speed?: string;
}

export default function Marquee({ items, reverse = false, speed = '28s' }: MarqueeProps) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ animationDuration: speed }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-4 flex-shrink-0"
            style={{
              padding: '10px 22px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.55)',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(168,85,247,0.1)';
              el.style.borderColor = 'rgba(168,85,247,0.3)';
              el.style.color = '#c084fc';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.04)';
              el.style.borderColor = 'rgba(255,255,255,0.08)';
              el.style.color = 'rgba(255,255,255,0.55)';
            }}
          >
            {item.icon && <span style={{ fontSize: '15px' }}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
