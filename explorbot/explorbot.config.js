import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const config = {
  web: {
    url: 'https://untrusted-root.badssl.com',
  },

  ai: {
    model: openrouter('openai/gpt-oss-20b:nitro'),
    visionModel: openrouter('meta-llama/llama-4-scout-17b-16e-instruct'),
    agenticModel: openrouter('minimax/minimax-m2.5:nitro'),
  },
  playwright: {
    ignoreHTTPSErrors: true,
  }
};

export default config;
