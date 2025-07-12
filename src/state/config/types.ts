export interface ConfigState {
  isLoading: boolean;
  encryptionKey: CryptoKey | null;
  hasVault: boolean;
}
