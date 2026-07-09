import { useState, useEffect } from 'react';

const HEADER_OFFSET_PX = 60;

/**
 * Scroll-spy hook: reports which page section is currently in view.
 * A section is active once its top has scrolled up to the reading line
 * (just below the sticky header); the last such section in page order wins.
 * At the very bottom of the page the final section is forced active, since
 * a short footer may never reach the reading line on its own.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(
    sectionIds[0] ?? null
  );

  useEffect(() => {
    const computeActiveSection = () => {
      const readingLine = HEADER_OFFSET_PX + 1;
      let current: string | null = sectionIds[0] ?? null;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          current = id;
        }
      });

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (scrolledToBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(current);
    };

    computeActiveSection();
    window.addEventListener('scroll', computeActiveSection, { passive: true });
    window.addEventListener('resize', computeActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', computeActiveSection);
      window.removeEventListener('resize', computeActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}
