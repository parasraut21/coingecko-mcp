import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { AppConfigService } from '../shared/config/config.service';

export interface Exchange {
  id: string;
  name: string;
  year_established: number;
  country: string | null;
  description: string;
  url: string;
  image: string;
  facebook_url: string;
  reddit_url: string;
  telegram_url: string;
  slack_url: string;
  other_url_1: string;
  other_url_2: string;
  twitter_handle: string;
  has_trading_incentive: boolean;
  centralized: boolean;
  public_notice: string;
  alert_notice: string;
  trust_score: number;
  trust_score_rank: number;
  coins: number;
  pairs: number;
  trade_volume_24h_btc: number;
  tickers: any[];
  status_updates: any[];
}

@Injectable()
export class ExchangeByIdTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('ExchangeByIdTool');

  @Tool({
    name: 'fetch_exchange_by_id',
    description: 'Fetches detailed data for a specific cryptocurrency exchange by its ID .',
    parameters: z.object({
      exchange_id: z.string().describe('The ID of the exchange (e.g., binance)'),
    }),
  })
  async fetchExchangeById({ exchange_id }: { exchange_id: string }, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/exchanges/${exchange_id}`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching exchange data for ${exchange_id}, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [{ type: 'text', text: `Failed to fetch exchange data for ${exchange_id}` }],
        };
      }

      const data: Exchange = await response.json();

      // Select only relevant fields to reduce data
      const reducedData = {
        id: data.id,
        name: data.name,
        country: data.country,
        trust_score: data.trust_score,
        trade_volume_24h_btc: data.trade_volume_24h_btc,
      };

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
        content: [{ type: 'text', text: `Error fetching exchange data: ${error}` }],
      };
    }
  }
}