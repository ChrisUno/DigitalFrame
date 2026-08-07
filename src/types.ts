export type SlideOrder = 'sequential' | 'shuffle';
export type TransitionEffect = 'cut' | 'fade';
export type ImageFit = 'fill' | 'contain' | 'cover';
export type ClockPosition = 'bottom-left' | 'bottom-center' | 'top-right';

export interface Photo {
  id: string;
  name: string;
  url: string;
}

export interface FrameSettings {
  intervalSeconds: number;
  order: SlideOrder;
  transition: TransitionEffect;
  fit: ImageFit;
  showClock: boolean;
  showDate: boolean;
  clockPosition: ClockPosition;
}

export const DEFAULT_SETTINGS: FrameSettings = {
  intervalSeconds: 8,
  order: 'sequential',
  transition: 'fade',
  fit: 'fill',
  showClock: true,
  showDate: true,
  clockPosition: 'bottom-left',
};

export const SUPPORTED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'avif',
] as const;
