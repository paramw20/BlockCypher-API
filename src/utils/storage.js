const fs = require('fs');
const path = './wallets.json';

function saveWallet(wallet) {
  let wallets = getWallets();
  wallets[wallet.name] = wallet;
  fs.writeFileSync(path, JSON.stringify(wallets));
}

function getWallets() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path));
}

function getWallet(name) {
  return getWallets()[name];
}

module.exports = { saveWallet, getWallets, getWallet };
