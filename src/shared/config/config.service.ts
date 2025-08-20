// src/shared/config/config.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService extends ConfigService {
  get COIN_GECKO_API_URL(): string {
    return this.getOrThrow<string>("COIN_GECKO_API_URL");
  }

  get coinGeckoApiKey(): string {
    return this.getOrThrow<string>("COIN_GECKO_API_KEY");
  }

  get nodeEnv(): string {
    return this.get<string>("NODE_ENV", "development");
  }

  get appPort(): number {
    return this.get<number>("APP_PORT", 3000);
  }
}
