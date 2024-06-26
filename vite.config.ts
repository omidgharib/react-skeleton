// import react from "@vitejs/plugin-react";
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          //     style: (name) => {
          //         if (name === "col" || name === "row") {
          //             return "antd/lib/style/index.less";
          //         }
          //         return `antd/es/${name}/style/index.less`;
          //     },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: { 'process.env': process.env },

  optimizeDeps: {
    include: ['tailwind.config.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'tailwind.config.ts': resolve(__dirname, 'tailwind.config.ts'),
    },
  },
})
