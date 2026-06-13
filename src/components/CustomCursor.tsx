import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef   = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a,button,[role="button"],[data-hover]')) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('a,button,[role="button"],[data-hover]')) setHovering(false);
    };

    // Smooth follower loop
    const loop = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform =
          `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    window.addEventListener('mouseover',   onEnter);
    window.addEventListener('mouseout',    onLeave);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('mouseover',  onEnter);
      window.removeEventListener('mouseout',   onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Hide on touch devices
  if (window.matchMedia('(pointer:coarse)').matches) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: clicking ? '8px' : '12px',
          height: clicking ? '8px' : '12px',
          borderRadius: '50%',
          background: hovering
            ? 'linear-gradient(135deg,#a855f7,#ec4899)'
            : 'rgba(255,255,255,0.95)',
          pointerEvents: 'none',
          transition: 'width 0.15s, height 0.15s, background 0.2s',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Soft ring follower */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: hovering ? '52px' : '40px',
          height: hovering ? '52px' : '40px',
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid rgba(168,85,247,0.7)'
            : '1.5px solid rgba(255,255,255,0.25)',
          pointerEvents: 'none',
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s',
          background: hovering ? 'rgba(168,85,247,0.06)' : 'transparent',
          willChange: 'transform',
          backdropFilter: hovering ? 'blur(1px)' : 'none',
        }}
      />
    </>
  );
}
