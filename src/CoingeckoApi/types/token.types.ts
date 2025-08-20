export type ChainIdToName = {
  [key: string]: {
    id: string;
    name: string;
  };
};

export const chainIdToName: ChainIdToName = {
  "1": { id: "ethereum", name: "Ethereum" },
  "10": { id: "optimistic-ethereum", name: "Optimistic Ethereum" },
  "25": { id: "cronos", name: "Cronos" },
  "56": { id: "binance-smart-chain", name: "BSC" },
  "100": { id: "xdai", name: "Gnosis" },
  "137": { id: "polygon-pos", name: "Polygon" },
  "169": { id: "manta-pacific", name: "Manta" },
  "196": { id: "x-layer", name: "X Layer" },
  "204": { id: "opbnb", name: "opBNB" },
  "250": { id: "fantom", name: "Fantom" },
  "321": { id: "kucoin-community-chain", name: "KCC" },
  "324": { id: "zksync", name: "zkSync Era" },
  "8453": { id: "base", name: "Base" },
  "42161": { id: "arbitrum-one", name: "Arbitrum" },
  "534352": { id: "scroll", name: "Scroll" },
  "59144": { id: "linea", name: "Linea" },
  solana: { id: "solana", name: "Solana" },
};

export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank?: number;
  coingecko_score?: number;
  developer_score?: number;
  community_score?: number;
  liquidity_score?: number;
  categories?: string[];
  genesis_date?: string;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  status_updates?: any[];
  links?: { homepage?: string[] };
  market_data?: {
    current_price?: Record<string, number>;
    ath?: Record<string, number>;
    ath_date?: Record<string, string>;
    atl?: Record<string, number>;
    atl_date?: Record<string, string>;
    market_cap?: Record<string, number>;
    market_cap_rank?: number;
    fully_diluted_valuation?: Record<string, number>;
    market_cap_fdv_ratio?: number;
    total_volume?: Record<string, number>;
    high_24h?: Record<string, number>;
    low_24h?: Record<string, number>;
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_60d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    price_change_percentage_1h_in_currency?: Record<string, number>;
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
    total_value_locked?: number;
    mcap_to_tvl_ratio?: number;
    fdv_to_tvl_ratio?: number;
  };
  community_data?: {
    twitter_followers?: number;
    reddit_subscribers?: number;
    reddit_accounts_active_48h?: number;
    telegram_channel_user_count?: number;
  };
  developer_data?: {
    stars?: number;
    forks?: number;
    subscribers?: number;
    total_issues?: number;
    closed_issues?: number;
    commit_count_4_weeks?: number;
    pull_request_contributors?: number;
    code_additions_deletions_4_weeks?: {
      additions?: number;
      deletions?: number;
    };
  };
  tickers?: { bid_ask_spread_percentage?: number }[];
}
