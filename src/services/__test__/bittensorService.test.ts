/// <reference types="vitest" />
import { getBalance, getTransactions } from "../index";
import * as apiModule from "../api";
import { createMockApi, createMockTransactionApi } from "../../utils";

describe("getBalance", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns formatted balance from chain data", async () => {
    vi.spyOn(apiModule, "getApi").mockReturnValue(
      createMockApi(BigInt("1000000000000")) as any
    );
    const result = await getBalance("5SomeFakeAddress");
    expect(result).toBe("1.0000");
  });

  it("returns formatted balance of 0 correctly", async () => {
    vi.spyOn(apiModule, "getApi").mockReturnValue(
      createMockApi(BigInt(0)) as any
    );
    const result = await getBalance("any-address");
    expect(result).toBe("0");
  });

  it("returns formatted balance of small values correctly", async () => {
    vi.spyOn(apiModule, "getApi").mockReturnValue(
      createMockApi(BigInt("100000000")) as any
    );
    const result = await getBalance("any-address");
    expect(result).toBe("0.0001");
  });
});

describe("getTransactions", () => {
  it("should return transaction involving the user", async () => {
    vi.spyOn(apiModule, "getApi").mockReturnValue(
      createMockTransactionApi() as any
    );

    const txs = await getTransactions("5BobAddress");
    expect(txs[0]).toMatchObject({
      type: "received",
      from: "5AliceAddress",
      to: "5BobAddress",
      amount: "1.0000",
    });
  });
});
