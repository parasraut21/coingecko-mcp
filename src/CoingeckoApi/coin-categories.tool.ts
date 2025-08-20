import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { CoinCategory } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class CoinCategoriesTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('CoinCategoriesTool');

  @Tool({
    name: 'fetch_coin_categories',
    description: 'Fetches a list of the top 10 coin categories with market data, sorted by market cap.',
    parameters: z.object({}),
  })
  async fetchCoinCategories(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/coins/categories`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching coin categories, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch coin categories',
            },
          ],
        };
      }

      const data: CoinCategory[] = await response.json();

      // Sort by market_cap (descending) and take top 10, selecting specific fields
      const reducedData = data
        .sort((a, b) => (b.market_cap ?? 0) - (a.market_cap ?? 0))
        .slice(0, 10)
        .map(({ id, name, market_cap, volume_24h }) => ({
          id,
          name,
          market_cap,
          volume_24h,
        }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(reducedData, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching coin categories: ${error}` }],
      };
    }
  }
}