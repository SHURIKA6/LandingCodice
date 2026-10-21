'use client';

import { useEffect, useRef } from 'react';
import { Arrow } from './Arrow';

export function Header({ contactHref }: { contactHref: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && menu.current && !menu.current.contains(event.target)) menu.current.open = false;
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, []);
  return <header className="site-header"><a className="brand-type" href="#inicio" aria-label="Codice — início">codice<span className="brand-dot" aria-hidden="true" /></a>
    <a className="header-location" href="#contato">De Sinop. Com você.</a>
    <div className="header-actions"><a className="header-cta" href={contactHref} target="_blank" rel="noopener noreferrer">Vamos conversar <Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a>
      <details ref={menu} className="nav-menu"><summary aria-label="Menu de navegação"><span className="menu-strokes" aria-hidden="true"><i /><i /></span></summary>
        <nav aria-label="Navegação principal" onClick={event => { if ((event.target as HTMLElement).closest('a') && menu.current) menu.current.open = false; }}><a href="#trabalho">O trabalho <Arrow /></a><a href="#pacote">O pacote <Arrow /></a><a href="#contato">A dupla <Arrow /></a><p>Sites para negócios de<br />Sinop e região.</p></nav>
      </details>
    </div>
  </header>;
}
