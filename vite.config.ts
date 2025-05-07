// vite.config.cjs
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react').default;
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
  },
});
