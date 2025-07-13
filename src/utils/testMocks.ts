export function createMockApi(balance: bigint) {
  return {
    query: {
      system: {
        account: vi.fn(() =>
          Promise.resolve({
            data: {
              free: {
                toBigInt: () => balance,
              },
            },
          })
        ),
      },
    },
    registry: {
      chainDecimals: [12],
    },
  };
}

export function createMockTransactionApi() {
  return {
    rpc: {
      chain: {
        getHeader: vi.fn(() =>
          Promise.resolve({ number: { toNumber: () => 123 } })
        ),
        getBlockHash: vi.fn((n) => Promise.resolve(`hash-${n}`)),
        getBlock: vi.fn(() =>
          Promise.resolve({
            block: {
              extrinsics: [
                {
                  isSigned: true,
                },
              ],
            },
          })
        ),
      },
    },
    query: {
      system: {
        events: {
          at: vi.fn(() =>
            Promise.resolve([
              {
                phase: {
                  isApplyExtrinsic: true,
                  asApplyExtrinsic: {
                    eq: (index: number) => index === 0,
                  },
                },
                event: {
                  section: "balances",
                  method: "Transfer",
                  data: [
                    "5AliceAddress",
                    "5BobAddress",
                    BigInt("1000000000000"),
                  ],
                },
              },
            ])
          ),
        },
      },
    },
    registry: {
      chainDecimals: [12],
    },
  };
}
