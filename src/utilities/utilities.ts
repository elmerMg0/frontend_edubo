import CryptoJS from 'crypto-js';
export const decryptString = (encryptedString: string, key: string) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedString, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };
  
export const encryptString = (string: string, key: string) => {
    const encrypted = CryptoJS.AES.encrypt(string, key);
    return encrypted.toString();
};
  