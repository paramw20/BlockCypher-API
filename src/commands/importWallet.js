const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const storage = require('../utils/storage');

async function importWallet(name, mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    console.error('Invalid mnemonic');
    return;
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);


  const wallet = {
    name,
    mnemonic,
    addresses: []
  };

  storage.saveWallet(wallet);
  console.log(`Wallet "${name}" imported.`);
}

module.exports = importWallet;
