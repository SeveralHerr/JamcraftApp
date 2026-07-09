import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

const SECTION_IDS = ['home', 'projects', 'podcasts'] as const;

/** Position a section's top relative to the viewport (reading line is at 61px). */
function setSectionTop(id: string, top: number) {
  const element = document.getElementById(id)!;
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top,
  } as DOMRect);
}

function fireScroll() {
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('useActiveSection', () => {
  beforeEach(() => {
    SECTION_IDS.forEach((id) => {
      const element = document.createElement('section');
      element.id = id;
      document.body.appendChild(element);
    });
    // keep the "scrolled to bottom" branch out of the way by default
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 10000,
    });
    window.innerHeight = 900;
    window.scrollY = 0;
    SECTION_IDS.forEach((id, index) => setSectionTop(id, 100 + index * 1000));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('should default to the first section', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));
    expect(result.current).toBe('home');
  });

  it('should activate a section once its top passes the reading line', async () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    setSectionTop('home', -900);
    setSectionTop('projects', 40);
    setSectionTop('podcasts', 800);
    fireScroll();

    await waitFor(() => {
      expect(result.current).toBe('projects');
    });
  });

  it('should prefer the last section past the reading line in page order', async () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    setSectionTop('home', -2000);
    setSectionTop('projects', -500);
    setSectionTop('podcasts', 60);
    fireScroll();

    await waitFor(() => {
      expect(result.current).toBe('podcasts');
    });
  });

  it('should not activate a section that has not reached the reading line', async () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    setSectionTop('home', 0);
    setSectionTop('projects', 500);
    setSectionTop('podcasts', 1500);
    fireScroll();

    await waitFor(() => {
      expect(result.current).toBe('home');
    });
  });

  it('should force the last section active at the bottom of the page', async () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    // podcasts (a short final section) never reaches the reading line
    setSectionTop('home', -3000);
    setSectionTop('projects', -1000);
    setSectionTop('podcasts', 500);
    window.scrollY = 9100; // 9100 + 900 >= 10000 - 2
    fireScroll();

    await waitFor(() => {
      expect(result.current).toBe('podcasts');
    });
  });

  it('should remove scroll and resize listeners on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useActiveSection(SECTION_IDS));
    unmount();

    const removedEvents = removeSpy.mock.calls.map(([event]) => event);
    expect(removedEvents).toContain('scroll');
    expect(removedEvents).toContain('resize');
  });

  it('should return null for an empty section list', () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current).toBeNull();
  });
});
