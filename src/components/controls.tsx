import clsx from 'clsx';
import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export const Field = ({ label, hint, children }: FieldProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1">
      <span className="text-lg font-medium text-white">{label}</span>
      {hint && <span className="text-sm text-white/50">{hint}</span>}
    </div>
    {children}
  </div>
);

interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) => (
  <div className="grid auto-cols-fr grid-flow-col gap-2 rounded-2xl bg-white/5 p-2">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={clsx(
          'rounded-xl px-4 py-4 text-base font-medium transition-colors',
          value === option.value
            ? 'bg-white text-black'
            : 'text-white/70 hover:bg-white/10 hover:text-white',
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const Toggle = ({ checked, onChange, label }: ToggleProps) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-5 py-4 text-left transition-colors hover:bg-white/10"
  >
    <span className="text-lg font-medium text-white">{label}</span>
    <span
      className={clsx(
        'relative h-8 w-14 shrink-0 rounded-full transition-colors',
        checked ? 'bg-emerald-400' : 'bg-white/20',
      )}
    >
      <span
        className={clsx(
          'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all',
          checked ? 'left-7' : 'left-1',
        )}
      />
    </span>
  </button>
);

interface StepperProps {
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}

export const Stepper = ({ value, min, max, step, suffix, onChange }: StepperProps) => {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-2">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        className="h-14 w-14 rounded-xl bg-white/10 text-3xl font-light text-white transition-colors hover:bg-white/20 disabled:opacity-30"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="text-2xl font-semibold text-white tabular-nums">
        {value}
        {suffix && <span className="ml-1 text-lg font-normal text-white/60">{suffix}</span>}
      </span>
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        className="h-14 w-14 rounded-xl bg-white/10 text-3xl font-light text-white transition-colors hover:bg-white/20 disabled:opacity-30"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
};
