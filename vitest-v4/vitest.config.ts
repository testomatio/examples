import { defineConfig } from 'vitest/config';
import TestomatioReporter from '@testomatio/reporter/vitest';

export default defineConfig({
  test: {
    reporters: ['verbose', new TestomatioReporter({})],
    watch: false,
    include: ['test/**/*.test.ts'],
  },
});
