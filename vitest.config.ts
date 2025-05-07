/// <reference types="vitest" />
const { defineConfig } = require('vitest/config');
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        'coverage/**',
        '.next',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/*.config.js',
        'teams.ts ',
        'api.ts',
        'lib/**',
        'cypress/support',
        'app/dashboard',
        'context',
        '__tests__/pages/NavbarPage.tsx',
        'TeamContext.tsx',
        'mocks/leagues.ts',
        'mocks/players.ts',
        'mocks/teams.ts',
        'cypress/support',
        'app/league',
        'page.tsx',
        'app/team',
        'types/player.ts',
        'app/page.tsx',
        'cypress/e2e/navbar.cy.ts',
        'cypress/e2e/buy-player.cy.ts',
        'cypress/e2e/responsive-menu.cy.ts',
        'components/PlayerList.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});