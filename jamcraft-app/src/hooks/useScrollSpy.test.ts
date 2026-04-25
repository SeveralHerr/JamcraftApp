import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from './useScrollSpy';

describe('useScrollSpy', () => {
  let observerCallback: IntersectionObserverCallback;
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    const MockIntersectionObserver = vi.fn(function (this: IntersectionObserver, cb: IntersectionObserverCallback) {
      observerCallback = cb;
      this.observe = observeMock;
      this.disconnect = disconnectMock;
      this.unobserve = vi.fn();
      this.takeRecords = vi.fn(() => []);
      this.root = null;
      this.rootMargin = '';
      this.thresholds = [];
    });

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    // Create DOM elements for sections
    ['home', 'speaking', 'games', 'contact'].forEach(id => {
      const el = document.createElement('section');
      el.id = id;
      document.body.appendChild(el);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('initializes with first section active', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['home', 'speaking', 'games', 'contact'])
    );
    expect(result.current).toBe('home');
  });

  it('updates active section on intersection', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['home', 'speaking', 'games', 'contact'])
    );

    const speakingEl = document.getElementById('speaking')!;
    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: speakingEl, intersectionRatio: 0.5 } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('speaking');
  });

  it('disconnects on unmount', () => {
    const { unmount } = renderHook(() =>
      useScrollSpy(['home', 'speaking'])
    );
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('handles empty sections array', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });

  it('does not update active section when entry is not intersecting', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['home', 'speaking', 'games', 'contact'])
    );

    const gamesEl = document.getElementById('games')!;
    act(() => {
      observerCallback(
        [{ isIntersecting: false, target: gamesEl, intersectionRatio: 0 } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('home');
  });
});
