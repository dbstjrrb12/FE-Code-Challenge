import {
  useEffect,
  useRef,
  type ComponentProps,
  type PropsWithChildren,
} from 'react';

type FocusTrapProps = {
  isActive: boolean;
  autoFocus?: boolean;
  onClose: () => void;
} & PropsWithChildren<ComponentProps<'div'>>;

export default function FocusTrap({
  isActive,
  autoFocus = true,
  children,
  onClose,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (!isActive) return;

    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    if (autoFocus) {
      firstElement.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive, autoFocus]);

  return <div ref={containerRef}>{children}</div>;
}
