import { Injectable } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { chainIdToName, CoinGeckoResponse } from './types/token.types';
import { AppConfigService } from '../shared/config/config.service';


@Injectable()
export class TokenHistoryTool {

  constructor(private readonly configService: AppConfigService) {}

  @Tool({
    name: 'fetch_token_history',
    description: 'Fetches detailed historical data for a token using . Accepts either chainId or network name.',
    parameters: z.object({
      chainId: z.string().describe('The ID of the blockchain (e.g., "1" for Ethereum) or network name (e.g., "Ethereum")'),
      address: z.string().describe('The contract address of the token'),
    }),
  })
  async fetchTokenHistory({ chainId, address }: { chainId: string; address: string }, context: Context): Promise<any> {
    try {
      let resolvedChainId: string;
      let originalChainKey: string | undefined = chainId;

      if (Object.keys(chainIdToName).includes(chainId)) {
        resolvedChainId = chainIdToName[chainId].id;
      } else {
        const chainEntry = Object.entries(chainIdToName).find(
          ([key, { id, name }]) =>
            chainId.toLowerCase() === id.toLowerCase() || chainId.toLowerCase() === name.toLowerCase(),
        );

        if (chainEntry) {
          resolvedChainId = chainEntry[1].id;
          originalChainKey = chainEntry[0];
        } else {
          return {
            content: [{ type: 'text', text: `Network is not supported: ${chainId}` }],
          };
        }
      }

      const response = await fetch(
        `${this.configService.COIN_GECKO_API_URL}/coins/${resolvedChainId}/contract/${address}`,
        {
          headers: {
            'x-cg-demo-api-key': this.configService.coinGeckoApiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to fetch token history for network: ${chainIdToName[originalChainKey]?.name}, address: ${address}`,
            },
          ],
        };
      }

      const data: CoinGeckoResponse = await response.json();

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
        content: [{ type: 'text', text: `Error fetching token history: ${error}` }],
      };
    }
  }
}