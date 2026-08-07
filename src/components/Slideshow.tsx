import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { useFrameStore } from '../store/useFrameStore';
import type { ImageFit } from '../types';
import ClockOverlay from './ClockOverlay';
import SettingsPanel from './SettingsPanel';

const shuffle = (length: number): number[] => {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const buildOrder = (length: number, shuffled: boolean): number[] =>
  shuffled ? shuffle(length) : Array.from({ length }, (_, i) => i);

const fitClass: Record<ImageFit, string> = {
  fill: 'object-fill',
  cover: 'object-cover',
  contain: 'object-contain',
};

const LONG_PRESS_MS = 650;

const Slideshow = () => {
  const photos = useFrameStore((state) => state.photos);
  const { intervalSeconds, order, transition, fit } = useFrameStore((state) => state.settings);

  const [playOrder, setPlayOrder] = useState<number[]>(() =>
    buildOrder(photos.length, order === 'shuffle'),
  );
  const [position, setPosition] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setPlayOrder(buildOrder(photos.length, order === 'shuffle'));
    setPosition(0);
  }, [photos.length, order]);

  const advance = useCallback(() => {
    setPosition((current) => {
      const next = current + 1;
      if (next >= playOrder.length) {
        if (order === 'shuffle') {
          setPlayOrder(buildOrder(photos.length, true));
        }
        return 0;
      }
      return next;
    });
  }, [playOrder.length, order, photos.length]);

  useEffect(() => {
    if (settingsOpen || photos.length <= 1) return;
    const timer = window.setInterval(advance, intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [advance, intervalSeconds, settingsOpen, photos.length, position]);

  const pressTimer = useRef<number | null>(null);
  const clearPress = () => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };
  const startPress = () => {
    clearPress();
    pressTimer.current = window.setTimeout(() => setSettingsOpen(true), LONG_PRESS_MS);
  };

  useEffect(() => () => clearPress(), []);

  const currentPhoto = photos[playOrder[position] ?? 0];
  const fadeDuration = transition === 'fade' ? 0.9 : 0;

  return (
    <div
      className="relative h-screen w-screen touch-none select-none overflow-hidden bg-black"
      onPointerDown={startPress}
      onPointerUp={clearPress}
      onPointerLeave={clearPress}
      onPointerCancel={clearPress}
      onPointerMove={clearPress}
    >
      <AnimatePresence>
        {currentPhoto && (
          <motion.img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration, ease: 'easeInOut' }}
            className={clsx('absolute inset-0 h-full w-full', fitClass[fit])}
          />
        )}
      </AnimatePresence>

      <ClockOverlay />

      <AnimatePresence>
        {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Slideshow;
