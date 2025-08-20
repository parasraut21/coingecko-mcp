import { Logger, Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { CoinGeckoAPI } from "./CoingeckoApi/CoinGeckoAPIModule";
import { StderrLogger } from "./stderr.logger";
import { AppService } from "./test/test.service";
import { AppController } from "./test/test.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    McpModule.forRoot({
      name: "coingecko-stdio-server",
      version: "1.0.0",
      transport: McpTransportType.STREAMABLE_HTTP,
      streamableHttp: {
        enableJsonResponse: true,
        sessionIdGenerator: undefined,
        statelessMode: true,
      },
    }),
    CoinGeckoAPI,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: Logger,
      useClass: StderrLogger,
    },
    AppService,
  ],
})
export class AppModule {}
