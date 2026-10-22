'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { HERO_PLATE_URL, HERO_VIDEO_URL, heroVideo } from '../../data/opening';
import { PauseIcon, PlayIcon } from './Icons';
import { shouldMountVideo } from './openingState';
import { useReducedPreference } from './useReducedPreference';

type MediaState = {
  /** The loop exists in the page: allowed by the visitor's signals, after load, and not failed. */
  mountVideo: boolean;
  /** The element is actually playing (driven by the media events, not by our intent). */
  running: boolean;
  userPaused: boolean;
  /** Bumped to ask for another play attempt after a refusal or a manual resume. */
  attempt: number;
  setRunning: (running: boolean) => void;
  toggle: () => void;
  reportFailure: () => void;
};

const MediaContext = createContext<MediaState | null>(null);

function useOpeningMedia() {
  const state = useContext(MediaContext);
  if (!state) throw new Error('Opening media parts must render inside OpeningMediaProvider.');
  return state;
}

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
const connection = () => (navigator as Navigator & { connection?: Connection }).connection;
const subscribeConnection = (change: () => void) => {
  const link = connection();
  link?.addEventListener('change', change);
  return () => link?.removeEventListener('change', change);
};
const connectionSnapshot = () => `${connection()?.saveData ? 1 : 0}|${connection()?.effectiveType ?? ''}`;
const serverConnection = () => '0|';

const subscribeLoad = (change: () => void) => {
  window.addEventListener('load', change);
  return () => window.removeEventListener('load', change);
};
const loadedSnapshot = () => document.readyState === 'complete';
const serverLoaded = () => false;

/**
 * The plate is the whole baseline. The loop is an enhancement that waits for the page to finish
 * loading (so it never competes with the plate for bandwidth) and yields to reduced motion,
 * data saving and slow links. On the server the preference reads as reduced: no video in the HTML.
 */
export function OpeningMediaProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedPreference();
  const link = useSyncExternalStore(subscribeConnection, connectionSnapshot, serverConnection);
  const loaded = useSyncExternalStore(subscribeLoad, loadedSnapshot, serverLoaded);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [running, setRunning] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [saveData, effectiveType] = link.split('|');
  const allowed = shouldMountVideo({ reducedMotion, saveData: saveData === '1', effectiveType: effectiveType || null });
  const toggle = useCallback(() => {
    if (running) { setUserPaused(true); return; }
    setUserPaused(false);
    setAttempt(count => count + 1);
  }, [running]);
  const reportFailure = useCallback(() => setFailed(true), []);
  const value = useMemo<MediaState>(
    () => ({ mountVideo: allowed && loaded && !failed, running, userPaused, attempt, setRunning, toggle, reportFailure }),
    [allowed, loaded, failed, running, userPaused, attempt, toggle, reportFailure],
  );
  return <MediaContext value={value}>{children}</MediaContext>;
}

export function OpeningVideo() {
  const { mountVideo, userPaused, attempt, setRunning, reportFailure } = useOpeningMedia();
  const node = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  const attach = useCallback((element: HTMLVideoElement | null) => {
    node.current = element;
    if (!element) return;
    // React sets `muted` as a property after creating the element, and iOS wants it before play().
    element.muted = true;
    element.defaultMuted = true;
    // The first frame may already be decoded by the time this runs.
    if (element.readyState >= 2) setReady(true);
  }, []);

  // Each mount starts from scratch: a remounted loop must not show a stale frame or claim to be running.
  useEffect(() => {
    if (!mountVideo) { setReady(false); setRunning(false); }
  }, [mountVideo, setRunning]);

  // Watch the element itself: the media layer is one screen tall even when the section is taller.
  useEffect(() => {
    const element = node.current;
    if (!mountVideo || !element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    const visibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    visibility();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [mountVideo]);

  // Plays only while it can be seen and the visitor has not stopped it. No autoplay attribute:
  // every start goes through this effect, so the visitor's choices always win.
  const playing = mountVideo && !userPaused && inView && !tabHidden;
  useEffect(() => {
    const element = node.current;
    if (!element) return;
    if (playing) void element.play().catch(() => setRunning(false));
    else element.pause();
  }, [playing, attempt, mountVideo, setRunning]);

  if (!mountVideo) return null;
  return <video ref={attach} className="opening-video" data-ready={ready} aria-hidden="true" tabIndex={-1}
    width={heroVideo.width} height={heroVideo.height} src={HERO_VIDEO_URL} poster={HERO_PLATE_URL}
    muted loop playsInline preload="metadata"
    onLoadedData={() => setReady(true)} onCanPlay={() => setReady(true)}
    onPlaying={() => setRunning(true)} onPause={() => setRunning(false)} onError={reportFailure} />;
}

/**
 * Moving content that starts by itself needs a way to stop it (WCAG 2.2.2). Always rendered so the
 * aside keeps its layout; hidden with visibility until the loop exists, which keeps it out of focus and the accessibility tree.
 */
export function OpeningPauseButton() {
  const { mountVideo, running, toggle } = useOpeningMedia();
  return <button type="button" className="opening-pause" data-available={mountVideo} onClick={toggle}
    aria-label={running ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}>
    {running ? <PauseIcon /> : <PlayIcon />}
  </button>;
}
