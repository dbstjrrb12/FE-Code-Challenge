import { overlay } from 'overlay-kit';

import type { FormResult } from './types/Form';
import Button from './components/Buttont';
import Dialog from './components/Dialog';
import { useRef } from 'react';

const ModalFormPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    return await overlay.openAsync<FormResult | null>(({ close, isOpen }) => {
      const handleClose = () => {
        close(null);
        buttonRef.current?.focus();
      };

      const handleSubmit = (data: FormResult) => {
        close(data);
        buttonRef.current?.focus();
      };

      return (
        <Dialog isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      );
    });
  };

  return (
    <div>
      <Button type="button" onClick={handleClick} ref={buttonRef}>
        신청 폼 작성하기
      </Button>
    </div>
  );
};

export default ModalFormPage;
