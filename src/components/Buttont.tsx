import type { ComponentProps } from 'react';

type Props = ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}
