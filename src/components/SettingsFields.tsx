import { useFrameStore } from '../store/useFrameStore';
import type { ClockPosition, ImageFit, SlideOrder, TransitionEffect } from '../types';
import { Field, SegmentedControl, Stepper, Toggle } from './controls';

const SettingsFields = () => {
  const settings = useFrameStore((state) => state.settings);
  const updateSettings = useFrameStore((state) => state.updateSettings);

  return (
    <div className="flex flex-col gap-8">
      <Field label="Time per photo" hint="How long each photo stays on screen">
        <Stepper
          value={settings.intervalSeconds}
          min={2}
          max={120}
          step={1}
          suffix="sec"
          onChange={(intervalSeconds) => updateSettings({ intervalSeconds })}
        />
      </Field>

      <Field label="Photo order">
        <SegmentedControl<SlideOrder>
          value={settings.order}
          onChange={(order) => updateSettings({ order })}
          options={[
            { value: 'sequential', label: 'In order' },
            { value: 'shuffle', label: 'Shuffle' },
          ]}
        />
      </Field>

      <Field label="Transition">
        <SegmentedControl<TransitionEffect>
          value={settings.transition}
          onChange={(transition) => updateSettings({ transition })}
          options={[
            { value: 'fade', label: 'Fade' },
            { value: 'cut', label: 'Instant' },
          ]}
        />
      </Field>

      <Field label="Photo sizing" hint="How photos fill the screen">
        <SegmentedControl<ImageFit>
          value={settings.fit}
          onChange={(fit) => updateSettings({ fit })}
          options={[
            { value: 'fill', label: 'Stretch' },
            { value: 'cover', label: 'Crop' },
            { value: 'contain', label: 'Fit' },
          ]}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <Toggle
          label="Show clock"
          checked={settings.showClock}
          onChange={(showClock) => updateSettings({ showClock })}
        />
        <Toggle
          label="Show date"
          checked={settings.showDate}
          onChange={(showDate) => updateSettings({ showDate })}
        />
      </div>

      {(settings.showClock || settings.showDate) && (
        <Field label="Overlay position">
          <SegmentedControl<ClockPosition>
            value={settings.clockPosition}
            onChange={(clockPosition) => updateSettings({ clockPosition })}
            options={[
              { value: 'bottom-left', label: 'Bottom left' },
              { value: 'bottom-center', label: 'Bottom bar' },
              { value: 'top-right', label: 'Top right' },
            ]}
          />
        </Field>
      )}
    </div>
  );
};

export default SettingsFields;
