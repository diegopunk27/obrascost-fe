import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@theme': path.resolve(__dirname, './src/modules/common/theme/'),
      '@common-assets': path.resolve(__dirname, './src/modules/common/assets/'),
      '@common-components': path.resolve(__dirname, './src/modules/common/components/'),
      '@common-constants': path.resolve(__dirname, './src/modules/common/constants/'),
      '@common-contexts': path.resolve(__dirname, './src/modules/common/contexts/'),
      '@common-hooks': path.resolve(__dirname, './src/modules/common/hooks/'),
      '@common-interfaces': path.resolve(__dirname, './src/modules/common/interfaces/local/'),
      '@common-pages': path.resolve(__dirname, './src/modules/common/pages/'),
      '@common-requests': path.resolve(__dirname, './src/modules/common/interfaces/api/requests/'),
      '@common-responses': path.resolve(
        __dirname,
        './src/modules/common/interfaces/api/responses/',
      ),
      '@common-services': path.resolve(__dirname, './src/modules/common/services/'),
      '@global-constants': path.resolve(__dirname, './src/modules/global/constants/'),
      '@global-contexts': path.resolve(__dirname, './src/modules/global/contexts/'),
      '@global-pages': path.resolve(__dirname, './src/modules/global/pages/'),
      '@routes': path.resolve(__dirname, './src/routes/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
