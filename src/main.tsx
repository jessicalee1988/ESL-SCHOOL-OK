import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA with safe autoUpdate
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[Co Do 2 ESL PWA] Phiên bản mới đã sẵn sàng.');
  },
  onOfflineReady() {
    console.log('[Co Do 2 ESL PWA] Ứng dụng đã sẵn sàng chạy ngoại tuyến.');
  },
  onRegistered(r) {
    if (r) {
      console.log('[Co Do 2 ESL PWA] Service Worker đăng ký thành công.');
    }
  },
  onRegisterError(error) {
    console.error('[Co Do 2 ESL PWA] Lỗi đăng ký Service Worker:', error);
  },
});

createRoot(document.getElementById('root')!).render(<App />);
