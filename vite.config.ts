import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from "vite-plugin-node-polyfills";
import UnoCSS from "unocss/vite";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS(), nodePolyfills()],
  server: {
    port: 8888,
  },
  define: {
    process: process,
  },
  // assetsInclude: ["**/*/*.wasm"],
});

