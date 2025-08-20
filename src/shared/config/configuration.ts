
import { z } from 'zod';

export const configurationSchema = z.object({
  COIN_GECKO_API_URL: z
    .string({ required_error: 'COIN_GECKO_API_URL is required' })
    .url()
    .describe('Base URL for CoinGecko API'),
  COIN_GECKO_API_KEY: z
    .string({ required_error: 'COIN_GECKO_API_KEY is required' })
    .describe('API key for CoinGecko'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development')
    .optional()
    .describe('Node environment'),
  APP_PORT: z
    .number()
    .int()
    .default(3000)
    .optional()
    .describe('Application port'),
}).strict(); // Disallow unknown keys