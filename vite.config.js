// import { defineConfig } from 'vite'
// import path from 'node:path'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       manifest: {
//         name: 'Weather App',
//         short_name: 'Weather',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#000000',
//         theme_color: '#000000',
//         description: 'Приложение погоды с анимациями',
//         icons: [
//           {
//             src: '/icons/icon-192.png',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//           {
//             src: '/icons/icon-512.png',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//         ],
//       },
//     }),
//   ],
//   base: '/weather-app/',
//   root: 'src',
//   publicDir: '../public',
//   server: {
//     open: true,
//     host: true,
//     port: 5173,
//   },
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//     sourcemap: true,
//     minify: 'esbuild',
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@api': path.resolve(__dirname, './src/api'),
//       '@services': path.resolve(__dirname, './src/services'),
//       '@stores': path.resolve(__dirname, './src/stores'),
//       '@utils': path.resolve(__dirname, './src/utils'),
//       '@ui': path.resolve(__dirname, './src/ui'),
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather App',
        short_name: 'Weather',
        description: 'Приложение погоды с анимациями',
        start_url: '/weather-app/',
        scope: '/weather-app/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: '/weather-app/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/weather-app/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  base: '/weather-app/',

  root: 'src',

  publicDir: '../public',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
