import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { PublicCompaniesHoldings } from '../shared/types/market.types';
import { AppConfigService } from '../shared/config/config.service';

@Injectable()
export class PublicCompaniesHoldingsTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('PublicCompaniesHoldingsTool');

  @Tool({
    name: 'fetch_public_companies_holdings',
    description: 'Fetches public companies holdings for Bitcoin or Ethereum .',
    parameters: z.object({
      coin: z.enum(['bitcoin', 'ethereum']).default('bitcoin'),
    }),
  })
  async fetchPublicCompaniesHoldings(params: { coin: 'bitcoin' | 'ethereum' }, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/companies/public_treasury/${params.coin}`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching public companies holdings for ${params.coin}, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to fetch public companies holdings for ${params.coin}`,
            },
          ],
        };
      }

      const data: PublicCompaniesHoldings = await response.json();

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
        content: [{ type: 'text', text: `Error fetching public companies holdings: ${error}` }],
      };
    }
  }
}