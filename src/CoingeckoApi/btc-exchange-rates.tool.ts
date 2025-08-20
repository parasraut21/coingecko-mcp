import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { AppConfigService } from '../shared/config/config.service';

export interface ExchangeRate {
  rates: Record<string, { name: string; unit: string; value: number; type: string }>;
}

@Injectable()
export class BtcExchangeRatesTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('BtcExchangeRatesTool');

  @Tool({
    name: 'fetch_btc_exchange_rates',
    description: 'Fetches BTC exchange rates with other currencies .',
    parameters: z.object({}),
  })
  async fetchBtcExchangeRates(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/exchange_rates`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching BTC exchange rates, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [{ type: 'text', text: 'Failed to fetch BTC exchange rates' }],
        };
      }

      const data: ExchangeRate = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching BTC exchange rates: ${error}` }],
      };
    }
  }
}