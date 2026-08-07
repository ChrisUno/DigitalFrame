import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useFrameStore } from '../store/useFrameStore';

const positionClasses: Record<string, string> = {
  'bottom-left': 'bottom-0 left-0 p-8 items-start text-left',
  'top-right': 'top-0 right-0 p-8 items-end text-right',
  'bottom-center':
    'bottom-0 left-0 right-0 px-8 py-6 items-center text-center bg-gradient-to-t from-black/40 to-transparent',
};

const ClockOverlay = () => {
  const { showClock, showDate, clockPosition } = useFrameStore((state) => state.settings);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!showClock && !showDate) return null;

  return (
    <div
      className={clsx(
        'pointer-events-none absolute z-10 flex flex-col drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]',
        positionClasses[clockPosition],
      )}
    >
      {showClock && (
        <span className="font-thin leading-none tracking-tight text-white text-6xl sm:text-7xl tabular-nums">
          {format(now, 'h:mm')}
          <span className="ml-2 align-top text-2xl font-thin sm:text-3xl">
            {format(now, 'a')}
          </span>
        </span>
      )}
      {showDate && (
        <span className="mt-2 text-xl font-thin tracking-wide text-white/90 sm:text-2xl">
          {format(now, 'EEEE, MMMM d')}
        </span>
      )}
    </div>
  );
};

export default ClockOverlay;
