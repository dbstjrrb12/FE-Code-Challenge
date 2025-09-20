import type { PropsWithChildren } from 'react';

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </div>
  );
}
