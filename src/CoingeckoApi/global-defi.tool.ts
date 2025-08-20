import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { GlobalDeFiData } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class GlobalDeFiTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('GlobalDeFiTool');

  @Tool({
    name: 'fetch_global_defi',
    description: 'Fetches global DeFi market data .',
    parameters: z.object({}),
  })
  async fetchGlobalDeFi(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/global/decentralized_finance_defi`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching global DeFi data, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch global DeFi data',
            },
          ],
        };
      }

      const data: GlobalDeFiData = await response.json();

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
        content: [{ type: 'text', text: `Error fetching global DeFi data: ${error}` }],
      };
    }
  }
}