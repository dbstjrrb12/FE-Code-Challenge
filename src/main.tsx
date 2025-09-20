import 'modern-normalize';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalLayout from './components/GlobalLayout';
import ModalFormPage from './ModalFormPage';
import { OverlayProvider } from 'overlay-kit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalLayout>
      <ModalFormPage />
      <OverlayProvider />
    </GlobalLayout>
  </StrictMode>
);
