import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Components({
    resolvers: [
      AntDesignVueResolver(),
    ],
  }),],
  optimizeDeps: {
    include:["ant-design-vue/es", "ant-design-vue/es/button/style/css", "ant-design-vue/es/checkbox/style/css", "ant-design-vue/es/input/style/css"]
  }
})
