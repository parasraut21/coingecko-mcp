import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { Exchange } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class ExchangesTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('ExchangesTool');

  @Tool({
    name: 'fetch_exchanges',
    description: 'Fetches a list of cryptocurrency exchanges .',
    parameters: z.object({}),
  })
  async fetchExchanges(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/exchanges`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching exchanges list, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch exchanges list',
            },
          ],
        };
      }

      const data: Exchange[] = await response.json();

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
        content: [{ type: 'text', text: `Error fetching exchanges list: ${error}` }],
      };
    }
  }
}