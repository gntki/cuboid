import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/cuboid/' : './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: true,
                            fileName: false,
                        },
                    ],
                ],
            },
        }),
        tsconfigPaths(),
    ],
})
