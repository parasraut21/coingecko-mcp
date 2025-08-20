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
export class ExchangesIdMapTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('ExchangesIdMapTool');

  @Tool({
    name: 'fetch_exchanges_id_map',
    description: 'Fetches a list of cryptocurrency exchanges with detailed data .',
    parameters: z.object({}),
  })
  async fetchExchangesIdMap(params: {}, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/exchanges/list`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching exchanges ID map, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [{ type: 'text', text: 'Failed to fetch exchanges ID map' }],
        };
      }

      const data: Exchange[] = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching exchanges ID map: ${error}` }],
      };
    }
  }
}