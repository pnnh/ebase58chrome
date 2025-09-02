import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from "url"
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
        ],
    },
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/locales/*',
                    dest: '_locales',
                    structured: true,
                }
            ]
        })
    ],
})
