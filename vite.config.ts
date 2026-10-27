/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // VITE_API_ORIGEM (preconnect do index.html) sai de VITE_API_URL quando não vem definida.
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (!env.VITE_API_ORIGEM && env.VITE_API_URL) {
    process.env.VITE_API_ORIGEM = new URL(env.VITE_API_URL).origin;
  }

  return {
    plugins: [react()],
    build: {
      target: 'es2020',
      sourcemap: false,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['test/configuracao.ts'],
      env: {
        VITE_API_URL: 'https://api.teste/v1',
        VITE_API_ORIGEM: 'https://api.teste',
      },
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/main.tsx', 'src/**/__tests__/**', 'src/vite-env.d.ts'],
        thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
      },
    },
  };
});
