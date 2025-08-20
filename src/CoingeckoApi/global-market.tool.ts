import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { GlobalMarketData } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class GlobalMarketTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('GlobalMarketTool');

  @Tool({
    name: 'fetch_global_market',
    description: 'Fetches global cryptocurrency market data .',
    parameters: z.object({}),
  })
  async fetchGlobalMarket(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/global`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching global market data, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch global market data',
            },
          ],
        };
      }

      const data: GlobalMarketData = await response.json();

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
        content: [{ type: 'text', text: `Error fetching global market data: ${error}` }],
      };
    }
  }
}