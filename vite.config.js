import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@/assets/scss/_variables.scss";
  //         @import "@/assets/scss/_mixins.scss";
  //       `,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
