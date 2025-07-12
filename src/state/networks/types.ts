export interface Network {
  name: string;
  url: string;
  key: string;
}

export interface NetworksState {
  selectedKey: string;
  isConnected: boolean;
}
