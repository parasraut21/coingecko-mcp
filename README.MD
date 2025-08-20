# CoinGecko MCP Server

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency data through CoinGecko's API. This server enables AI assistants to access real-time cryptocurrency market data, DeFi information, exchange details, and more.

## Data Provider

This MCP server uses **CoinGecko** as the primary data provider for all cryptocurrency-related information. CoinGecko is one of the world's largest independent cryptocurrency data aggregators, providing reliable and comprehensive market data.

## Available Tools

| Tool Name | Description | Parameters | Returns |
|-----------|-------------|------------|---------|
| `TokenHistoryTool` | Fetch historical data for tokens by contract address | `chainId`, `address` | Historical token data |
| `TrendingSearchTool` | Get trending search data and popular coins | None | Trending coins and tokens |
| `GlobalMarketTool` | Retrieve global cryptocurrency market statistics | None | Total market cap, volume data |
| `GlobalDeFiTool` | Access global DeFi market data | None | DeFi market cap and metrics |
| `PublicCompaniesHoldingsTool` | Get public companies' crypto holdings | `coin` (bitcoin/ethereum) | Corporate holdings data |
| `ExchangeRatesTool` | Fetch crypto-to-fiat exchange rates | None | Exchange rates for various currencies |
| `ExchangesTool` | List all supported cryptocurrency exchanges | None | Complete exchanges list |
| `CoinCategoriesTool` | Get top 10 coin categories by market cap | None | Categories with market data |
| `TrendingPoolsTool` | Fetch trending liquidity pools | None | Trending pools across DEXs |
| `NewPoolsTool` | Get newly created liquidity pools | None | Recently created pools |
| `CoinDataByContractTool` | Get coin data by contract address | `coin_id`, `contract_address` | Detailed coin information |
| `CoinDataTool` | Get detailed coin data by CoinGecko ID | `coin_id` | Comprehensive coin data |
| `ExchangeByIdTool` | Get specific exchange information | `exchange_id` | Exchange details and metrics |

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- CoinGecko API key (free tier available)

## Environment Setup

Create a `.env` file in your project root with the following variables:

```env
COIN_GECKO_API_URL=https://api.coingecko.com/api/v3
COIN_GECKO_API_KEY= your_api_key
NODE_ENV=development
APP_PORT=3080
```

### Environment Variables Explained

- `COIN_GECKO_API_URL`: Base URL for CoinGecko API endpoints
- `COIN_GECKO_API_KEY`: Your CoinGecko API key for authentication
- `NODE_ENV`: Environment mode (development/production)
- `APP_PORT`: Port number for the MCP server (default: 3080)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd coingecko-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your CoinGecko API key and configuration
```

4. Start the server:
```bash
npm start
```

The server will be available at `http://localhost:3080/mcp`

## MCP Client Configuration

### For Cursor IDE

Add the following configuration to your Cursor settings:

```json
{
  "mcp": {
    "servers": {
      "test-mcp": {
        "url": "http://localhost:3080/mcp",
        "transport": "http"
      }
    }
  }
}
```

### For Claude Desktop

Add to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "test-mcp": {
      "url": "http://localhost:3080/mcp",
      "transport": "http"
    }
  }
}
```

## Usage Examples

Once connected, you can ask your AI assistant questions like:

- "What are the trending cryptocurrencies right now?"
- "Show me the global DeFi market data"
- "What companies hold Bitcoin?"
- "Get the current price of Ethereum"
- "Show me new liquidity pools created today"

## API Rate Limits

This server respects CoinGecko's API rate limits:
- Free tier: 10-50 calls/minute
- Pro tier: Higher limits available with paid plans

## Features

- ✅ Real-time cryptocurrency data
- ✅ Global market statistics
- ✅ DeFi ecosystem insights
- ✅ Exchange information
- ✅ Corporate crypto holdings
- ✅ Liquidity pool tracking
- ✅ Historical token data
- ✅ Trending analysis
- ✅ Error handling and logging
- ✅ Environment-based configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


