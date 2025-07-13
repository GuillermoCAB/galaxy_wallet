import { MOCKED_VALID_MNEMONIC } from "../../constants";
import {
  validatePassword,
  validatePasswordAgainstEncryptedMnemonic,
} from "../validate";
import CryptoJS from "crypto-js";

describe("validatePassword", () => {
  it("accepts a valid password", () => {
    expect(() => validatePassword("Abcdef1!")).not.toThrow();
  });

  it("throws for password without uppercase", () => {
    expect(() => validatePassword("abcdef1!")).toThrow(/uppercase/);
  });

  it("throws for password without uppercase", () => {
    expect(() => validatePassword("ABCDEF1!")).toThrow(/lowercase/);
  });

  it("throws for password without number", () => {
    expect(() => validatePassword("Abcdefg!")).toThrow(/number/);
  });

  it("throws for password without special character", () => {
    expect(() => validatePassword("Abcdefg1")).toThrow(/special/);
  });

  it("throws for password too short", () => {
    expect(() => validatePassword("Ab1!")).toThrow(/least 8/);
  });
});

describe("validatePasswordAgainstEncryptedMnemonic", () => {
  const password = "SuperSecret123!";
  const mnemonic = MOCKED_VALID_MNEMONIC;
  const encrypted = CryptoJS.AES.encrypt(mnemonic, password).toString();

  it("returns true for correct password", () => {
    const result = validatePasswordAgainstEncryptedMnemonic(
      encrypted,
      password
    );
    expect(result).toBe(mnemonic);
  });

  it("returns null for incorrect password", () => {
    const result = validatePasswordAgainstEncryptedMnemonic(
      encrypted,
      "WrongPassword"
    );
    expect(result).toBe(null);
  });

  it("returns null if decryption fails", () => {
    const result = validatePasswordAgainstEncryptedMnemonic(
      "not-valid-encrypted",
      password
    );
    expect(result).toBe(null);
  });
});
