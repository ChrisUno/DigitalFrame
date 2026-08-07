import { useEffect, useRef } from 'react';
import { FolderOpen, ImagePlus, Play, Trash2, Images } from 'lucide-react';
import { useFrameStore } from '../store/useFrameStore';
import SettingsFields from './SettingsFields';

const SetupScreen = () => {
  const photos = useFrameStore((state) => state.photos);
  const loadFiles = useFrameStore((state) => state.loadFiles);
  const clearPhotos = useFrameStore((state) => state.clearPhotos);
  const start = useFrameStore((state) => state.start);

  const folderInputRef = useRef<HTMLInputElement>(null);
  const filesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = folderInputRef.current;
    if (input) {
      input.setAttribute('webkitdirectory', '');
      input.setAttribute('directory', '');
    }
  }, []);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    loadFiles(Array.from(fileList));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Images className="h-6 w-6" />
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">Photo Frame</h1>
          </div>
          <p className="max-w-xl text-lg text-white/60">
            Pick your photos, choose how long each one shows, and press play. Once it
            starts, long-press the screen any time to change these settings.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-3xl bg-white/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => folderInputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-5 text-lg font-semibold text-black transition-transform hover:scale-[1.01] active:scale-100"
            >
              <FolderOpen className="h-6 w-6" />
              Choose a folder
            </button>
            <button
              type="button"
              onClick={() => filesInputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-5 text-lg font-semibold text-white transition-colors hover:bg-white/20"
            >
              <ImagePlus className="h-6 w-6" />
              Choose photos
            </button>
          </div>

          <input
            ref={folderInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
          <input
            ref={filesInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />

          {photos.length > 0 ? (
            <div className="flex items-center justify-between rounded-2xl bg-emerald-400/10 px-5 py-4 text-emerald-300">
              <span className="text-lg font-medium">
                {photos.length} photo{photos.length === 1 ? '' : 's'} ready
              </span>
              <button
                type="button"
                onClick={clearPhotos}
                className="flex items-center gap-2 text-sm text-emerald-200/80 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
          ) : (
            <p className="rounded-2xl bg-white/5 px-5 py-4 text-white/50">
              No photos selected yet. Unsupported files are skipped automatically.
            </p>
          )}
        </section>

        {photos.length > 0 && (
          <PhotoStrip />
        )}

        <section className="rounded-3xl bg-white/5 p-6">
          <h2 className="mb-6 text-xl font-semibold">Slideshow settings</h2>
          <SettingsFields />
        </section>

        <button
          type="button"
          onClick={start}
          disabled={photos.length === 0}
          className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-6 py-6 text-xl font-bold text-black transition-transform hover:scale-[1.01] active:scale-100 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          <Play className="h-7 w-7 fill-current" />
          Start slideshow
        </button>

        <footer className="pb-4 text-center text-sm text-white/30">
          © {new Date().getFullYear()} Unosquare • Generated with design.Unosquare
        </footer>
      </div>
    </div>
  );
};

const PhotoStrip = () => {
  const photos = useFrameStore((state) => state.photos);
  const preview = photos.slice(0, 12);
  return (
    <div className="flex gap-3 overflow-x-auto rounded-3xl bg-white/5 p-4">
      {preview.map((photo) => (
        <img
          key={photo.id}
          src={photo.url}
          alt={photo.name}
          className="h-24 w-24 shrink-0 rounded-xl object-cover"
        />
      ))}
      {photos.length > preview.length && (
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm text-white/60">
          +{photos.length - preview.length}
        </span>
      )}
    </div>
  );
};

export default SetupScreen;
