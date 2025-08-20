// src/shared/types/evm.types.ts
import { z } from 'zod';

export type Address = `0x${string}`;
export type Hex = `0x${string}`;
export type Hash = `0x${string}`;

export interface ChainInfoResponse {
  network: string;
  chainId: number;
  blockNumber: string;
  rpcUrl: string;
}

export interface EnsResolveResponse {
  ensName: string;
  normalizedName: string;
  resolvedAddress: Address | null;
  network: string;
}

export interface SupportedNetworksResponse {
  supportedNetworks: string[];
}

export interface BlockResponse {
  [key: string]: any; // Simplified, depends on actual block data structure
}

export interface BalanceResponse {
  address: Address;
  network: string;
  wei: string;
  ether: string;
}

export interface ERC20BalanceResponse {
  address: Address;
  tokenAddress: Address;
  network: string;
  balance: {
    raw: string;
    formatted: string;
    decimals: number;
  };
}

export interface TransactionResponse {
  [key: string]: any; // Simplified, depends on actual transaction data
}

export interface TransactionReceiptResponse {
  [key: string]: any; // Simplified, depends on actual receipt data
}

export interface GasEstimateResponse {
  network: string;
  estimatedGas: string;
}

export interface TransferResponse {
  success: boolean;
  txHash: Hash;
  [key: string]: any; // Additional fields vary by tool
}

export interface ContractReadResponse {
  [key: string]: any; // Depends on contract function output
}

export interface ContractWriteResponse {
  network: string;
  transactionHash: Hash;
  message: string;
}

export interface IsContractResponse {
  address: Address;
  network: string;
  isContract: boolean;
  type: 'Contract' | 'Externally Owned Account (EOA)';
}

export interface TokenInfoResponse {
  address: Address;
  network: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  [key: string]: any; // Additional metadata
}

export interface NFTInfoResponse {
  contract: Address;
  tokenId: string;
  network: string;
  name?: string;
  symbol?: string;
  tokenUri?: string;
  owner?: Address | 'Unknown';
}

export interface NFTOwnershipResponse {
  tokenAddress: Address;
  tokenId: string;
  ownerAddress: Address;
  network: string;
  isOwner: boolean;
  result: string;
}

export interface ERC1155TokenUriResponse {
  contract: Address;
  tokenId: string;
  network: string;
  uri: string;
}

export interface NFTBalanceResponse {
  collection: Address;
  owner: Address;
  network: string;
  balance: string;
}

export interface ERC1155BalanceResponse {
  contract: Address;
  tokenId: string;
  owner: Address;
  network: string;
  balance: string;
}

export interface AddressFromPrivateKeyResponse {
  address: Address;
  privateKey: Hex;
}