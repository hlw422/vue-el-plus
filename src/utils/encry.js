import CryptoJS from 'crypto-js';

// 密钥和偏移量（需与后端一致，生产环境建议后端动态下发）
const KEY = CryptoJS.enc.Utf8.parse('1234567890abcdef'); // 16位密钥
const IV = CryptoJS.enc.Utf8.parse('abcdef1234567890');  // 16位偏移量

// AES加密
export function encrypt(data) {
  const srcs = CryptoJS.enc.Utf8.parse(data);
  // 模式：CBC，填充：Pkcs7
  const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

// AES解密
export function decrypt(data) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
