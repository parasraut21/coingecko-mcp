import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { NewPools } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class NewPoolsTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('NewPoolsTool');

  @Tool({
    name: 'fetch_new_pools',
    description: 'Fetches new pools .',
    parameters: z.object({}),
  })
  async fetchNewPools(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/onchain/networks/new_pools`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching new pools, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch new pools',
            },
          ],
        };
      }

      const data: NewPools = await response.json();

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
        content: [{ type: 'text', text: `Error fetching new pools: ${error}` }],
      };
    }
  }
}