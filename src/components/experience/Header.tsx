'use client';

import { useEffect, useRef } from 'react';
import { Arrow } from './Arrow';
import { useMotionMode } from './useMotionMode';
import './interaction-motion.css';
import './mobile-chapters.css';

export function Header({ contactHref }: { contactHref: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const mode = useMotionMode();
  useEffect(() => {
    const details = menu.current;
    if (!details) return;
    const animations = new Set<Animation>();
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const play = (target: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
      const animation = target.animate(frames, { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      animations.add(animation);
      const finish = () => animations.delete(animation);
      animation.addEventListener('finish', finish, { once: true });
      animation.addEventListener('cancel', finish, { once: true });
    };
    const open = () => {
      cancel();
      const nav = details.querySelector('nav');
      if (!details.open || mode === 'static' || document.hidden || !Element.prototype.animate || nav?.contains(document.activeElement)) return;
      const surface = details.querySelector<HTMLElement>('.menu-panel-surface');
      if (surface) play(surface, [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], mode === 'desktop' ? 360 : 460);
      // Only the label moves inside its mask. Every native link box is already
      // accessible, and touching or focusing the menu resolves the labels now.
      details.querySelectorAll<HTMLElement>('.menu-label').forEach((label, index) => {
        play(label, [{ transform: 'translateY(95%)', opacity: .6 }, { transform: 'translateY(0)', opacity: 1 }], mode === 'desktop' ? 350 : 440, index * 45);
      });
    };
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        cancel();
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !details.contains(event.target)) { cancel(); details.open = false; }
    };
    const visibility = () => { if (document.hidden) cancel(); };
    details.addEventListener('toggle', open);
    details.addEventListener('pointerdown', cancel, { passive: true });
    details.addEventListener('focusin', cancel);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      cancel();
      details.removeEventListener('toggle', open);
      details.removeEventListener('pointerdown', cancel);
      details.removeEventListener('focusin', cancel);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
    };
  }, [mode]);
  return <header className="site-header" data-motion-mode={mode}><a className="brand-type" href="#inicio" aria-label="Codice — início">codice<span className="brand-dot" aria-hidden="true" /></a>
    <a className="header-location" href="#trabalho">Pessoas. Ideias. Trabalho.</a>
    <div className="header-actions"><a className="header-cta" href={contactHref} target="_blank" rel="noopener noreferrer">Vamos conversar <Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a>
      <details ref={menu} className="nav-menu"><summary aria-label="Menu de navegação"><span className="menu-strokes" aria-hidden="true"><i /><i /></span></summary>
        <nav aria-label="Navegação principal" onClick={event => { if ((event.target as HTMLElement).closest('a') && menu.current) menu.current.open = false; }}><span className="menu-panel-surface" aria-hidden="true" /><a href="#inicio"><span className="menu-label-clip"><span className="menu-label">A gente</span></span><Arrow /></a><a href="#trabalho"><span className="menu-label-clip"><span className="menu-label">Os projetos</span></span><Arrow /></a><a href="#pacote"><span className="menu-label-clip"><span className="menu-label">Seu site</span></span><Arrow /></a><a href="#contato"><span className="menu-label-clip"><span className="menu-label">Vamos conversar</span></span><Arrow /></a><p>Sites para negócios de<br />Sinop e região.</p></nav>
      </details>
    </div>
  </header>;
}
