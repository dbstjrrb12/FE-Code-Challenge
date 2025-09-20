import { useId, type ComponentProps } from 'react';

type Props = ComponentProps<'select'> & {
  label: string;
  placeholder?: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export default function Select({
  label,
  options,
  id,
  placeholder,
  error,
  ...props
}: Props) {
  const selectId = id ?? useId();
  const errorId = `${selectId}-error`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        aria-invalid={!error}
        aria-describedby={errorId}
        {...props}>
        <option value="" selected disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
