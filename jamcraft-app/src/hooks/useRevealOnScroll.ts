import { RefObject, useEffect, useState } from 'react';

/** Safety net: reveal even if the observer never reports (background tab, crawler, screenshotter). */
export const REVEAL_FALLBACK_MS = 1000;

/**
 * True once the element has scrolled into view (and stays true).
 * Browsers without IntersectionObserver reveal immediately.
 */
export function useRevealOnScroll(ref: RefObject<Element | null>): boolean {
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (revealed || !element) return;

    let reported = false;
    const observer = new IntersectionObserver(
      (entries) => {
        reported = true;
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    const fallback = setTimeout(() => {
      if (!reported) setRevealed(true);
    }, REVEAL_FALLBACK_MS);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [ref, revealed]);

  return revealed;
}
