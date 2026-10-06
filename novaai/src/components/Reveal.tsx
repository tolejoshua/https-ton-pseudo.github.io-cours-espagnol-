import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  as?: ElementType;
  delay?: number; // ms
  className?: string;
  children: ReactNode;
};

/**
 * Fondu + montée à l'entrée dans le viewport (IntersectionObserver, seuil 0.15).
 * Caché : translate-y-8 opacity-0 → visible : translate-y-0 opacity-100, 700 ms ease-out.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
