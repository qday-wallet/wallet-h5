import { createRailgunWallet, getRandomBytes } from "@railgun-community/wallet";
import { NetworkName } from '@railgun-community/shared-models';
import { pbkdf2 } from "@railgun-community/wallet";
import { Pbkdf2Response } from "@railgun-community/shared-models";


// Block numbers for each chain when wallet was first created.
// If unknown, provide undefined.
const creationBlockNumberMap = {
    [NetworkName.Ethereum]: 15725700,
    [NetworkName.Polygon]: 3421400,
}

export const createWalletByMenmonic = async (mnemonic: string, encryptionKey: string) => {
  return await createRailgunWallet(
    encryptionKey,
    mnemonic,
    creationBlockNumberMap
  );
};





// hash-service.ts

export const hashPasswordString = async (
  secret: string,
  salt: string,
  iterations: number
): Promise<Pbkdf2Response> => {
  return pbkdf2(secret, salt, iterations);
};


export const setEncryptionKeyFromPassword = async (password: string): Promise<string> => {
  // Desired `password` comes from user input

  const salt = getRandomBytes(16); // Generate salt
  const [encryptionKey, hashPasswordStored] = await Promise.all([
    hashPasswordString(password, salt, 100000), // Generate hash from password and salt
    hashPasswordString(password, salt, 1000000), // Generate hash for stored password. Use more iterations for the stored value.
  ]);

//   await Promise.all([
//     // ..., // Save `hashPasswordStored` to local storage
//     // ..., // Save `salt` to local storage
//   ]);

  return encryptionKey;
};




// 从本地存储获取秘钥
export const getEncryptionKeyFromPassword = async (password: string) => {
  // `password` comes from user input
  
//   const [storedPasswordHash, storedSalt] = await Promise.all([
//     ..., // Fetch the previously stored password hash from local storage
//     ..., // Fetch the previously stored `salt` from local storage
//   ]);
  
//   const [encryptionKey, hashPassword] = await Promise.all([
//     hashPasswordString(password, storedSalt, 100000), // Same iterations as when generated, i.e. 100000
//     hashPasswordString(password, storedSalt, 1000000), // Same iterations as when generated, i.e. 1000000
//   ]);

//   if (hashPasswordStored !== hashPassword) {
//     throw new Error('Incorrect password.');
//   }

//   return encryptionKey;
}