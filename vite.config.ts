import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnpluginFonts from 'unplugin-fonts'

export default defineConfig({
  plugins: [
    react(),
    UnpluginFonts({
      custom: {
        families: [
          {
            name: 'Noto Sans Lao',
            src: './public/fonts/NotoSansLao.ttf',
          },
        ],
        display: 'swap',
        preload: true,
        prefetch: false,
      },
    }),
  ],
})