import { motion } from 'framer-motion';
import { Check, Power } from 'lucide-react';
import { useFrameStore } from '../store/useFrameStore';
import SettingsFields from './SettingsFields';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const stop = useFrameStore((state) => state.stop);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-20 overflow-y-auto bg-neutral-950/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-8 px-6 py-10 sm:px-8">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-white">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-black transition-transform hover:scale-[1.02] active:scale-100"
          >
            <Check className="h-6 w-6" />
            Done
          </button>
        </header>

        <SettingsFields />

        <button
          type="button"
          onClick={stop}
          className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-5 text-lg font-medium text-white/80 transition-colors hover:bg-white/20"
        >
          <Power className="h-6 w-6" />
          Exit slideshow
        </button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
