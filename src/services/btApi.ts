import { ApiPromise, WsProvider } from "@polkadot/api";
import type { ApiOptions } from "@polkadot/api/types";

let api: ApiPromise | null = null;

export async function connect(url: string): Promise<ApiPromise> {
  if (api) {
    await api.disconnect();
  }

  const provider = new WsProvider(url);
  api = await ApiPromise.create({ provider } as ApiOptions);

  return api;
}

export function getApi(): ApiPromise {
  if (!api) throw new Error("API not connected");
  return api;
}
