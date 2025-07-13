import "@polkadot/api-augment";
import { formatBalance } from "@polkadot/util";

import { getApi } from "./api";
import type { Transaction } from "../components";

export async function getBalance(address: string): Promise<string> {
  const api = getApi();
  const account = await api.query.system.account(address);

  const balance = account.data.free.toBigInt();

  const decimals = api.registry.chainDecimals[0];

  const formattedBalance = formatBalance(balance, {
    decimals,
    forceUnit: "-",
    withSi: false,
  });

  return formattedBalance;
}

export async function getTransactions(
  address: string,
  limit = 20
): Promise<Transaction[]> {
  const api = getApi();

  const latestHeader = await api.rpc.chain.getHeader();
  const latestBlockNumber = latestHeader.number.toNumber();
  const decimals = api.registry.chainDecimals[0];

  const transactions: Transaction[] = [];

  // Look back through the last 100 blocks
  for (
    let i = latestBlockNumber;
    i > latestBlockNumber - 100 && transactions.length < limit;
    i--
  ) {
    const hash = await api.rpc.chain.getBlockHash(i);
    const block = await api.rpc.chain.getBlock(hash);
    const events = await api.query.system.events.at(hash);

    block.block.extrinsics.forEach((extrinsic, index) => {
      if (!extrinsic.isSigned) return;

      events
        .filter(
          ({ phase }) =>
            phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
        )
        .forEach(({ event }) => {
          if (event.section === "balances" && event.method === "Transfer") {
            const [from, to, amountRaw] = event.data;

            const fromStr = String(from);
            const toStr = String(to);
            const amount = formatBalance(BigInt(amountRaw.toString()), {
              decimals,
              forceUnit: "-",
              withSi: false,
            });

            const isUserInvolved = fromStr === address || toStr === address;

            if (isUserInvolved) {
              const tx: Transaction = {
                id: `${i}-${index}`,
                type: fromStr === address ? "sent" : "received",
                amount,
                timestamp: new Date().toISOString(),
                from: fromStr,
                to: toStr,
              };

              transactions.push(tx);
            }
          }
        });
    });
  }

  return transactions.slice(0, limit);
}
