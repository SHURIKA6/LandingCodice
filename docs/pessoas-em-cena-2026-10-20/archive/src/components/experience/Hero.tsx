'use client';

import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Arrow';
import { useReducedPreference } from './useReducedPreference';

export function Hero({ href, price, cta }: { href: string; price: string; cta: string }) {
  const stage = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedPreference();
  const visible = useInView(stage);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .82]);
  const wordLift = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pulse = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 95, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 95, damping: 24 });
  useEffect(() => { setReady(true); return () => { pulse.stop(); }; }, [pulse]);
  useEffect(() => {
    if (reduce) { x.set(0); y.set(0); pulse.set(0); }
  }, [reduce, x, y, pulse]);
  useEffect(() => {
    if (!visible) { pulse.stop(); pulse.set(0); x.set(0); y.set(0); }
    const stopHidden = () => { if (document.hidden) { pulse.stop(); pulse.set(0); x.set(0); y.set(0); } };
    document.addEventListener('visibilitychange', stopHidden);
    return () => document.removeEventListener('visibilitychange', stopHidden);
  }, [visible, pulse, x, y]);
  const reset = () => { x.set(0); y.set(0); };
  const replay = () => {
    if (reduce) return;
    pulse.stop();
    pulse.set(0);
    animate(pulse, [0, -22, 14, 0], { duration: 1.2, ease: [.16, 1, .3, 1] });
  };
  return <section ref={stage} className="hero-stage" id="inicio" aria-labelledby="hero-title" onPointerMove={event => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX / rect.width - .5) * 30);
    y.set(((event.clientY - rect.top) / rect.height - .5) * 18);
  }} onPointerLeave={reset}>
    <div className="hero-contours" aria-hidden="true"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><path d="M-180 680C90 1050 600 1040 510 420S950-80 1460 170S1800 820 1090 1150M-260 690C40 1120 680 1130 590 410S1000-170 1550 120S1900 870 1120 1220" /><path d="M-150 30C220 400 290-90 760 70S1320 720 1710 400M-190-10C170 310 330-170 800 0S1370 670 1750 330" /></svg></div>
    <motion.div className="hero-word" aria-hidden="true" style={{ y: reduce ? 0 : wordLift }}>codice</motion.div>
    <motion.div className="hero-object" aria-hidden="true" style={{ y: reduce ? 0 : lift, rotate: reduce ? 0 : rotation, scale: reduce ? 1 : scale }}>
      <motion.div className="hero-object-inner" style={{ x: reduce ? 0 : smoothX, y: reduce ? 0 : smoothY, rotate: reduce ? 0 : pulse }}>
        {/* Decorative generated sculpture, never presented as a client product. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/codice-sculpture.webp" width="800" height="800" alt="" fetchPriority="high" draggable="false" />
      </motion.div>
    </motion.div>
    <div className="hero-bottom">
      <div className="hero-copy"><h1 id="hero-title">Seu trabalho.<br />Em <span>evidência.</span></h1><p>Um site profissional para apresentar seus serviços e facilitar o contato com seus clientes.</p></div>
      <div className="hero-offer"><p className="hero-price"><strong>{price}</strong><span>Um site. Uma página.<br />Até seis seções.</span></p><a className="button button-ink" href={href} target="_blank" rel="noopener noreferrer">{cta}<Arrow diagonal /><span className="sr-only"> pelo WhatsApp de Fernando (abre em outra aba)</span></a></div>
    </div>
    <div className="hero-end"><a className="scroll-link" href="#trabalho">Conheça o nosso trabalho <Arrow /></a>{ready && !reduce && <button className="replay-button" type="button" onClick={replay}>Girar a ideia <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10a8 8 0 1 0-1 7M20 4v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}</div>
  </section>;
}
