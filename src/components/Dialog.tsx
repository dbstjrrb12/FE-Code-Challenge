import { useForm } from 'react-hook-form';

import type { FormResult } from '../types/Form';
import Button from './Buttont';
import { useEffect, forwardRef, type PropsWithChildren } from 'react';
import Select from './Select';
import Input from './Input';
import FocusTrap from './FocusTrap';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormResult) => void;
};

export default function Dialog({ isOpen, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormResult>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Layout onClose={onClose}>
      <FocusTrap isActive={isOpen} onClose={onClose}>
        <Form>
          <Input
            label="이름"
            error={errors.name?.message}
            {...register('name', {
              required: { value: true, message: '이름을 입력해주세요' },
            })}
          />

          <Input
            label="이메일"
            error={errors.email?.message}
            {...register('email', {
              required: {
                value: true,
                message: '이메일을 입력해주세요',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식에 맞지 않습니다',
              },
            })}
          />

          <Select
            label="년차"
            placeholder="년차를 선택해주세요"
            error={errors.year?.message}
            options={[
              { label: '0-3년차', value: '0' },
              { label: '4-7년차', value: '1' },
              { label: '8년차 이상', value: '2' },
            ]}
            {...register('year', {
              required: { value: true, message: '년차를 선택해주세요' },
            })}
          />

          <Input label="GitHub 링크(선택)" {...register('link')} />

          <div role="group" style={{ display: 'flex', gap: '10px' }}>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              제출하기
            </Button>
          </div>
        </Form>
      </FocusTrap>
    </Layout>
  );
}

function Layout({
  children,
  onClose,
}: PropsWithChildren & { onClose?: () => void }) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      {children}
    </div>
  );
}

const Form = forwardRef<HTMLFormElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <form
        ref={ref}
        style={{
          width: '400px',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          overflowY: 'auto',
        }}>
        {children}
      </form>
    );
  }
);
