const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const blockchainApi = require('../utils/blockchainapi');
const storage = require('../utils/storage');


const bip32 = BIP32Factory(ecc);

async function generateAddress(name) {
  const wallet = storage.getWallet(name);
  if (!wallet) return console.error('Wallet not found');

 
  const seed = bip39.mnemonicToSeedSync(wallet.mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);

  let i = 0;
  let unusedAddress;
  while (!unusedAddress) {
   
    const { address } = bitcoin.payments.p2pkh({
      pubkey: Buffer.from(root.derivePath(`m/44'/1'/0'/0/${i++}`).publicKey),
      network: bitcoin.networks.testnet
    });

   
    if (await blockchainApi.isUnused(address)) {
      unusedAddress = address;
      wallet.addresses.push(address); // Add the unused address to the wallet
      storage.saveWallet(wallet);     // Save the wallet with the new address
      console.log(`Unused address: ${address}`);
    }
  }
}

module.exports = generateAddress;
