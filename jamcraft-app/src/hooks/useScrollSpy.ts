import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const idsRef = useRef(sectionIds);

  useEffect(() => {
    const ids = idsRef.current;
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -85% 0px', threshold: [0, 0.1, 0.5, 1] }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeId;
}
