/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { formatWalletAddress, formatDate } from "../index";

describe("formatWalletAddress", () => {
  it("formats a long wallet address with default slices", () => {
    const result = formatWalletAddress(
      "5CofkaLc3hKb8f9M1RerQhKCLSBN3TpjVhfp8qFG479S21UK"
    );
    expect(result).toBe("5Cof...S21UK");
  });

  it("returns the original address if it's too short", () => {
    const shortAddress = "123456";
    expect(formatWalletAddress(shortAddress)).toBe(shortAddress);
  });

  it("allows custom slice lengths", () => {
    const result = formatWalletAddress("ABCDE12345FGHIJ", 2, 3);
    expect(result).toBe("AB...HIJ");
  });
});

describe("formatDate", () => {
  const originalLanguage = navigator.language;

  afterEach(() => {
    Object.defineProperty(navigator, "language", {
      value: originalLanguage,
      configurable: true,
    });
  });

  it("formats a valid date in 'en-US' locale", () => {
    Object.defineProperty(navigator, "language", {
      value: "en-US",
      configurable: true,
    });

    const result = formatDate("2025-07-13T13:07:44.717Z");

    expect(result).toContain("Jul");
    expect(result).toContain("13");
    expect(result).toContain("·");
    expect(result).toMatch(/\d{1,2}:\d{2}/); // 10:07 or 13:07
  });

  it("formats a valid date in other locale (e.g., pt-BR)", () => {
    Object.defineProperty(navigator, "language", {
      value: "pt-BR",
      configurable: true,
    });
    const result = formatDate("2025-07-13T13:07:44.717Z");
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4} · \d{2}:\d{2}/);
  });

  it("returns 'Invalid date' for an invalid input", () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });
});
