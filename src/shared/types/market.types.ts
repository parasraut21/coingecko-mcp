// Crypto Global Market Data
export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

// Global DeFi Market Data
export interface GlobalDeFiData {
  data: {
    defi_market_cap: string;
    eth_market_cap: string;
    defi_to_eth_ratio: string;
    trading_volume_24h: string;
    defi_dominance: string;
    top_coin_name: string;
    top_coin_defi_dominance: number;
  };
}

// Public Companies Holdings
export interface PublicCompaniesHoldings {
  total_holdings: number;
  total_value_usd: number;
  market_cap_dominance: number;
  companies: {
    name: string;
    symbol: string;
    country: string;
    total_holdings: number;
    total_entry_value_usd: number;
    total_current_value_usd: number;
    percentage_of_total_supply: number;
  }[];
}

// BTC-to-Currency Exchange Rates
export interface ExchangeRates {
  rates: {
    [key: string]: {
      name: string;
      unit: string;
      value: number;
      type: 'fiat' | 'crypto' | 'commodity';
    };
  };
}

// Exchanges List
export interface Exchange {
  id: string;
  name: string;
  year_established: number;
  country: string | null;
  description: string;
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
}

// Coin Categories List
export interface CoinCategory {
  id: string;
  name: string;
  market_cap: number | null;
  market_cap_change_24h: number | null;
  content: string | null;
  top_3_coins_id: string[];
  top_3_coins: string[];
  volume_24h: number | null;
  updated_at: Date | null;
}

// Trending Pools
export interface TrendingPools {
  data: PoolDatum[];
  included: Included[];
}

export interface PoolDatum {
  id: string;
  type: 'pool';
  attributes: PoolAttributes;
  relationships: PoolRelationships;
}

export interface PoolAttributes {
  base_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_usd: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  address: string;
  name: string;
  pool_created_at: Date;
  fdv_usd: string;
  market_cap_usd: string | null;
  price_change_percentage: PriceChangePercentage;
  transactions: Transactions;
  volume_usd: PriceChangePercentage;
  reserve_in_usd: string;
}

export interface PriceChangePercentage {
  m5: string;
  m15: string;
  m30: string;
  h1: string;
  h6: string;
  h24: string;
}

export interface Transactions {
  m5: TransactionMetrics;
  m15: TransactionMetrics;
  m30: TransactionMetrics;
  h1: TransactionMetrics;
  h6: TransactionMetrics;
  h24: TransactionMetrics;
}

export interface TransactionMetrics {
  buys: number;
  sells: number;
  buyers: number;
  sellers: number;
}

export interface PoolRelationships {
  base_token: RelationshipData;
  quote_token: RelationshipData;
  network: RelationshipData;
  dex: RelationshipData;
}

export interface RelationshipData {
  data: { id: string; type: 'token' | 'network' | 'dex' };
}

export interface Included {
  id: string;
  type: 'token' | 'network' | 'dex';
  attributes: {
    address?: string;
    name: string;
    symbol?: string;
    decimals?: number;
    image_url?: string;
    coingecko_coin_id?: string;
  };
}

// New Pools (similar structure to Trending Pools)
export interface NewPools {
  data: PoolDatum[];
}