const axios = require('axios');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');
const path = require('path');


const bip32 = BIP32Factory(ecc);

async function createWallet(name) {
  try {
    // Generate mnemonic (BIP39)
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const network = bitcoin.networks.testnet; // Define the Bitcoin network

    
    const root = bip32.fromSeed(seed, network);
    const bip44Path = "m/44'/0'/0'/0/0";
    const child = root.derivePath(bip44Path); 

    
    const pubkeyBuffer = Buffer.from(child.publicKey);

    
    const { address } = bitcoin.payments.p2pkh({ pubkey: pubkeyBuffer, network }); // Generate address

  
    const apiUrl = `https://api.blockcypher.com/v1/btc/test3/wallets?token=${process.env.BLOCKCYPHER_TOKEN}`;
    const walletData = {
      name,
      addresses: [address], 
    };

   
    const response = await axios.post(apiUrl, walletData);
    console.log(`Wallet '${name}' created successfully on BlockCypher!`);
    console.log(`Response: `, response.data);

    
    const walletsDir = path.join(__dirname, '../wallets');
    const filePath = path.join(walletsDir, `${name}.json`);

   
    if (!fs.existsSync(walletsDir)) {
      fs.mkdirSync(walletsDir);
    }

    
    fs.writeFileSync(filePath, JSON.stringify({ name, mnemonic, address }, null, 2));
    console.log(`Wallet mnemonic and address saved locally at ${filePath}.`);
  } catch (error) {
    console.error("Error creating wallet:", error.response ? error.response.data : error.message);
  }
}

module.exports = createWallet;
