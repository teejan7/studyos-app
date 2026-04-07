import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'StudyOS',
        short_name: 'StudyOS',
        description: 'Retro exam study tracker',
        theme_color: '#4ade80',
        background_color: '#0a0f0a',
        display: 'standalone'
      }
    })
  ]
});
