

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If your app is deployed at the root domain, '/' is fine.
  // If it's under a subpath, adjust accordingly.
  base: '/',
});
