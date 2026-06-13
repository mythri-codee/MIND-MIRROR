import { useEffect } from 'react';

/* Attaches a soft purple ripple to every button/link click globally */
export default function RippleEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('button, a, [data-ripple]') as HTMLElement | null;
      if (!target) return;

      // Create ripple element
      const ripple = document.createElement('span');
      const rect   = target.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 1.8;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      Object.assign(ripple.style, {
        position:      'absolute',
        width:         `${size}px`,
        height:        `${size}px`,
        left:          `${x}px`,
        top:           `${y}px`,
        borderRadius:  '50%',
        background:    'rgba(168,85,247,0.18)',
        transform:     'scale(0)',
        animation:     'rippleExpand 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
        pointerEvents: 'none',
        zIndex:        '0',
      });

      // Ensure target is position-relative so ripple is clipped
      const prevOverflow = target.style.overflow;
      const prevPosition = target.style.position;
      if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
      target.style.overflow = 'hidden';

      target.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
        target.style.overflow = prevOverflow;
        if (prevPosition === '') target.style.position = prevPosition;
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
