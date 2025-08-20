import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { AppConfigService } from '../shared/config/config.service';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<string, { decimal_place: number | null; contract_address: string; geckoterminal_url?: string }>;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: any[];
  localization: Record<string, string>;
  description: Record<string, string>;
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    snapshot_url: string | null;
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: { github: string[]; bitbucket: any[] };
  };
  image: { thumb: string; small: string; large: string };
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: {
    current_price: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap: Record<string, number>;
    market_cap_rank: number;
    fully_diluted_valuation: Record<string, number>;
    total_supply: number;
    max_supply: number | null;
    max_supply_infinite: boolean;
    circulating_supply: number;
    last_updated: string;
  };
  community_data: {
    facebook_likes: number | null;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number | null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: { additions: number; deletions: number };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: any[];
  };
  status_updates: any[];
  last_updated: string;
  tickers: any[];
}

@Injectable()
export class CoinDataTool {
  constructor(private readonly configService: AppConfigService) {}
  private readonly logger = new Logger('CoinDataTool');

  @Tool({
    name: 'fetch_coin_data_by_symbol',
    description: 'Fetches the latest price and metadata for a cryptocurrency by coin ID .',
    parameters: z.object({
      coin_id: z.string().describe('The coin ID (e.g., bitcoin, ethereum)'),
    }),
  })
  async fetchCoinData({ coin_id }: { coin_id: string }, context: Context): Promise<any> {
    try {
      const response = await fetch(`${this.configService.COIN_GECKO_API_URL}/coins/${coin_id}`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
        },
      });

      this.logger.log(`Fetching coin data for ${coin_id}, status: ${response.status}`);

      if (!response.ok) {
        return {
          content: [{ type: 'text', text: `Failed to fetch coin data for ${coin_id}` }],
        };
      }

      const data: CoinData = await response.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching coin data: ${error}` }],
      };
    }
  }
}