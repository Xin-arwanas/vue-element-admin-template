import CryptoJS from 'crypto-js'
export const encryptDes = (message, key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// des加密（这种方法有密文）
// export const encryptDes=(message, key)=>{
//   var keyHex = CryptoJS.enc.Utf8.parse(key);
//   var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return encrypted.ciphertext.toString();
// }

export const decryptDes = (ciphertext, key) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
