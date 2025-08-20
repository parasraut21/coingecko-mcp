import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context, McpTransportType, McpRequest, McpExecutorService } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TrendingSearchResponse } from './types/market.types';
import type { Request } from 'express';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class TrendingSearchTool {
  private readonly logger = new Logger('TrendingSearchTool');

  constructor(private readonly configService: AppConfigService) {}

  @Tool({
    name: 'fetch_trending_search',
    description: 'Fetches trending coins, NFTs, and categories .',
    parameters: z.object({
      random_string: z.string().optional(),
    }),
  })
  async fetchTrendingSearch(params: { random_string?: string }, context: Context, request: Request): Promise<any> {
    try {
      // Log the MYKEY header value
      const myKey = request.headers['mykey'] || request.headers['MYKEY'];
      this.logger.log(`MYKEY header value: ${myKey}`);
      this.logger.log(`All headers: ${JSON.stringify(request.headers, null, 2)}`);

      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/search/trending`, {
        headers: {
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`API Response Status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: 'Failed to fetch trending search data',
            },
          ],
        };
      }

      const data: TrendingSearchResponse = await response.json();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      this.logger.error(`Error fetching trending search: ${error}`);
      return {
        content: [{ type: 'text', text: `Error fetching trending search: ${error}` }],
      };
    }
  }
}