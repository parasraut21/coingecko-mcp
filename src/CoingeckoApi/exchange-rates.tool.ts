import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { ExchangeRates } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class ExchangeRatesTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('ExchangeRatesTool');

  @Tool({
    name: 'fetch_exchange_rates',
    description: 'Fetches BTC-to-currency exchange rates .',
    parameters: z.object({}),
  })
  async fetchExchangeRates(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/exchange_rates`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching exchange rates, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch exchange rates',
            },
          ],
        };
      }

      const data: ExchangeRates = await response.json();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching exchange rates: ${error}` }],
      };
    }
  }
}