import { useId, type ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  label: string;
  error?: string;
};

export default function Input({ label, id, error, ...props }: Props) {
  const inputId = id ?? useId();
  const errorId = `${inputId}-error`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-invalid={!error}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          style={{ color: 'red', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}
