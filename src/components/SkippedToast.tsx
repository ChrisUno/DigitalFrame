import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useFrameStore } from '../store/useFrameStore';

const DISMISS_MS = 3500;

const SkippedToast = () => {
  const skippedFiles = useFrameStore((state) => state.skippedFiles);
  const clearSkipped = useFrameStore((state) => state.clearSkipped);

  useEffect(() => {
    if (skippedFiles.length === 0) return;
    const timer = window.setTimeout(clearSkipped, DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [skippedFiles, clearSkipped]);

  const visible = skippedFiles.slice(0, 3);
  const remaining = skippedFiles.length - visible.length;

  return (
    <AnimatePresence>
      {skippedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
          <div className="flex max-w-md items-start gap-3 rounded-2xl bg-neutral-900/95 px-5 py-4 text-sm text-white shadow-2xl ring-1 ring-white/10 backdrop-blur">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                Skipped {skippedFiles.length} unsupported file
                {skippedFiles.length === 1 ? '' : 's'}
              </span>
              <span className="text-white/60">
                {visible.join(', ')}
                {remaining > 0 ? ` +${remaining} more` : ''}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkippedToast;
