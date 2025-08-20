import { Module } from "@nestjs/common";

import { TokenHistoryTool } from "./token-history.tool";
import { TrendingSearchTool } from "./trending-search.tool";
import { GlobalMarketTool } from "./global-market.tool";
import { GlobalDeFiTool } from "./global-defi.tool";
import { PublicCompaniesHoldingsTool } from "./public-companies-holdings.tool";
import { ExchangeRatesTool } from "./exchange-rates.tool";
import { ExchangesTool } from "./exchanges.tool";
import { CoinCategoriesTool } from "./coin-categories.tool";
import { TrendingPoolsTool } from "./trending-pools.tool";
import { NewPoolsTool } from "./new-pools.tool";
import { ConfigModule } from "../shared/config/config.module";
import { CoinDataByContractTool } from "./coin-data-by-contract.tool";
import { CoinDataTool } from "./coin-data.tool";
import { ExchangeByIdTool } from "./exchange-by-id.tool";

@Module({
  imports: [ConfigModule],
  providers: [
    TokenHistoryTool,

    TrendingSearchTool,
    GlobalMarketTool,
    GlobalDeFiTool,
    PublicCompaniesHoldingsTool,
    ExchangeRatesTool,
    ExchangesTool,
    CoinCategoriesTool,
    TrendingPoolsTool,
    NewPoolsTool,
    CoinDataByContractTool,
    CoinDataTool,

    ExchangeByIdTool,
  ],

  exports: [
    TokenHistoryTool,

    TrendingSearchTool,
    GlobalMarketTool,
    GlobalDeFiTool,
    PublicCompaniesHoldingsTool,
    ExchangeRatesTool,
    ExchangesTool,
    CoinCategoriesTool,
    TrendingPoolsTool,
    NewPoolsTool,
    CoinDataByContractTool,
  ],
})
export class CoinGeckoAPI {}
