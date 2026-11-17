import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/main.ts', 'src/signup/services/AmplifyDishRepository.ts'],
      thresholds: { lines: 85, functions: 85, statements: 85, branches: 75 },
    },
  },
});
