const VAULT_STORAGE_KEY = "GALAXY_WALLET_VAULT_0.1";

export const saveVault = async (encryptedVault: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [VAULT_STORAGE_KEY]: encryptedVault }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

export const getVault = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([VAULT_STORAGE_KEY], (result) => {
      resolve(result[VAULT_STORAGE_KEY] || null);
    });
  });
};

export const clearVault = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove([VAULT_STORAGE_KEY], () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};
