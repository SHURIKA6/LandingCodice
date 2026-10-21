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
    let closeVersion = 0;
    const cancel = () => {
      closeVersion++;
      animations.forEach(animation => animation.cancel()); animations.clear();
      delete details.dataset.closing;
    };
    const play = (target: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
      const animation = target.animate(frames, { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      animations.add(animation);
      const finish = () => animations.delete(animation);
      animation.addEventListener('finish', finish, { once: true });
      animation.addEventListener('cancel', finish, { once: true });
      return animation;
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
        play(label, [{ transform: 'translate(20px, 95%)', opacity: .6 }, { transform: 'translate(0, 0)', opacity: 1 }], mode === 'desktop' ? 420 : 480, index * 45);
      });
    };
    const toggleClose = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('summary') || !details.open || mode === 'static' || !Element.prototype.animate) return;
      event.preventDefault();
      // A second click reverses a pending close; native navigation and Escape
      // still close immediately. Only decorative paint waits for this exit.
      if (details.dataset.closing) { cancel(); open(); return; }
      cancel();
      const version = closeVersion;
      const surface = details.querySelector<HTMLElement>('.menu-panel-surface');
      if (!surface || document.hidden) { details.open = false; return; }
      details.dataset.closing = 'true';
      const exit = play(surface, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }], 180);
      details.querySelectorAll<HTMLElement>('.menu-label').forEach(label => {
        play(label, [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-65%)', opacity: .4 }], 150);
      });
      exit.finished.then(() => {
        if (version === closeVersion) { details.open = false; delete details.dataset.closing; }
      }).catch(() => { /* Focus or a repeated click resolves the current pose. */ });
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
    const stabilize = (event: PointerEvent) => {
      if (details.dataset.closing && event.target instanceof Element && event.target.closest('summary')) return;
      cancel();
    };
    const visibility = () => {
      if (!document.hidden) return;
      const closing = Boolean(details.dataset.closing);
      cancel();
      if (closing) details.open = false;
    };
    details.addEventListener('toggle', open);
    details.addEventListener('click', toggleClose);
    details.addEventListener('pointerdown', stabilize, { passive: true });
    details.addEventListener('focusin', cancel);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      const closing = Boolean(details.dataset.closing);
      cancel();
      if (closing) details.open = false;
      details.removeEventListener('toggle', open);
      details.removeEventListener('click', toggleClose);
      details.removeEventListener('pointerdown', stabilize);
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
