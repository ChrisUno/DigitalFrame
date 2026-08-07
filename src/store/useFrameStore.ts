import { create } from 'zustand';
import {
  DEFAULT_SETTINGS,
  SUPPORTED_EXTENSIONS,
  type FrameSettings,
  type Photo,
} from '../types';

interface FrameState {
  photos: Photo[];
  skippedFiles: string[];
  settings: FrameSettings;
  isRunning: boolean;
  loadFiles: (files: File[]) => { added: number; skipped: string[] };
  clearPhotos: () => void;
  updateSettings: (patch: Partial<FrameSettings>) => void;
  start: () => void;
  stop: () => void;
  clearSkipped: () => void;
}

const isSupported = (fileName: string, mimeType: string): boolean => {
  if (mimeType.startsWith('image/') && mimeType !== 'image/heic' && mimeType !== 'image/heif') {
    return true;
  }
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(extension);
};

let idCounter = 0;
const nextId = () => `photo-${Date.now()}-${idCounter++}`;

export const useFrameStore = create<FrameState>((set, get) => ({
  photos: [],
  skippedFiles: [],
  settings: DEFAULT_SETTINGS,
  isRunning: false,

  loadFiles: (files) => {
    const valid: Photo[] = [];
    const skipped: string[] = [];

    for (const file of files) {
      if (isSupported(file.name, file.type)) {
        valid.push({ id: nextId(), name: file.name, url: URL.createObjectURL(file) });
      } else {
        skipped.push(file.name);
      }
    }

    valid.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    set((state) => ({
      photos: [...state.photos, ...valid],
      skippedFiles: skipped,
    }));

    return { added: valid.length, skipped };
  },

  clearPhotos: () => {
    get().photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    set({ photos: [], skippedFiles: [], isRunning: false });
  },

  updateSettings: (patch) =>
    set((state) => ({ settings: { ...state.settings, ...patch } })),

  start: () => {
    if (get().photos.length > 0) set({ isRunning: true });
  },

  stop: () => set({ isRunning: false }),

  clearSkipped: () => set({ skippedFiles: [] }),
}));
