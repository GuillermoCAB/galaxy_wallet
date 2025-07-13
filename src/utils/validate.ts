import CryptoJS from "crypto-js";

export const validatePassword = (password: string): void => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error("Password must contain at least one special character.");
  }
};

export const pickTwoRandomIndices = (): number[] => {
  const indices: number[] = [];

  while (indices.length < 2) {
    const i = Math.floor(Math.random() * 12);
    indices.push(i);
  }

  return Array.from(indices);
};

export const validatePasswordAgainstEncryptedMnemonic = (
  encryptedMnemonic: string,
  password: string
): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted?.trim() || null;
  } catch (error) {
    return null;
  }
};
