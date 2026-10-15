import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    // Serve generated photos in dev the same way the bucket serves them.
    // They are deployed separately, so keep them out of dist/.
    publicDir: 'photos-out',
    build: { copyPublicDir: false }
});
