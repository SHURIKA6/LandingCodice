'use client';

import { useEffect } from 'react';

/**
 * The opening is as tall as the screen, so rotating the device or resizing the window changes it.
 * When that happens with the page already scrolled past it, whatever the visitor is reading below
 * must not slide away: the people stage, for one, would show another person. Browsers that anchor
 * scrolling do this themselves, but not inside sticky content and not in Safari, so the adjustment
 * is made here, and skipped when the browser has already moved the page.
 */
export function OpeningAnchor() {
  useEffect(() => {
    const section = document.getElementById('inicio');
    if (!section) return;
    // Once the visitor uses a control in the opening, the entrance sequence is over for good.
    // Tying this to :focus-within would replay every entrance animation when focus leaves.
    const settle = () => { section.dataset.interacted = 'true'; };
    section.addEventListener('focusin', settle);
    let height = section.offsetHeight;
    let last = scrollY;
    const remember = () => { last = scrollY; };
    const observer = new ResizeObserver(() => {
      const before = height;
      height = section.offsetHeight;
      const delta = height - before;
      // Only when the opening is entirely above the viewport and the browser left the page where it was.
      if (delta && last >= before - 1 && Math.abs(scrollY - last) < 1) scrollBy({ top: delta, behavior: 'instant' });
      last = scrollY;
    });
    addEventListener('scroll', remember, { passive: true });
    observer.observe(section);
    return () => { section.removeEventListener('focusin', settle); observer.disconnect(); removeEventListener('scroll', remember); };
  }, []);
  return null;
}
