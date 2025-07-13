export interface Wallet {
  address: string;
  balance: string;
  encryptedMnemonic: string;
}

export interface WalletsState {
  wallet: Wallet | null;
  decryptedMnemonic: string | null;
}
