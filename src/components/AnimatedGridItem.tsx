import React, { useEffect, useRef, useState } from 'react';

interface AnimatedGridItemProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export const AnimatedGridItem: React.FC<AnimatedGridItemProps> = ({
  children,
  index,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Subtle stagger by column position (0ms, 80ms, 160ms)
  const staggerDelay = (index % 3) * 80;

  return (
    <div
      ref={itemRef}
      style={{
        transitionDelay: isVisible ? `${staggerDelay}ms` : '0ms',
      }}
      className={`transition-all duration-700 ease-out transform will-change-[transform,opacity] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
};
