import { defineConfig } from 'vitest/config';
import TestomatioReporter from '@testomatio/reporter/lib/adapter/vitest';

export default defineConfig({
  test: {
    reporters: ['verbose', new TestomatioReporter({})],
    watch: false,
  },
})
