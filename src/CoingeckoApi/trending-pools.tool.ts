import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TrendingPools } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class TrendingPoolsTool {
  
  private readonly logger = new Logger('TrendingPoolsTool');
  constructor(private readonly configService: AppConfigService) {}
  @Tool({
    name: 'fetch_trending_pools',
    description: 'Fetches trending pools .',
    parameters: z.object({}),
  })
  async fetchTrendingPools(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(
        `${this.configService.COIN_GECKO_API_URL}/onchain/networks/trending_pools?include=base_token,quote_token,dex`,
        {
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
          },
        },
      );

      this.logger.log(`Fetching trending pools, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch trending pools',
            },
          ],
        };
      }

      const data: TrendingPools = await response.json();

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
        content: [{ type: 'text', text: `Error fetching trending pools: ${error}` }],
      };
    }
  }
}