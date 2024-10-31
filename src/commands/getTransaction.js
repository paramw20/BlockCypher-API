const blockchainApi = require('../utils/blockchainapi');
const storage = require('../utils/storage');

async function getTransactions(name) {
  const wallet = storage.getWallet(name);
  if (!wallet) {
    console.error('Wallet not found');
    return;
  }

  // Fetch all addresses from BlockCypher for the given wallet name
  const addresses = await blockchainApi.getAddresses(name);
  if (addresses.length === 0) {
    console.log(`No addresses found for wallet ${name}`);
    return;
  }

  
  for (const address of addresses) {
    try {
      const transactions = await blockchainApi.getTransactions(address);
      console.log(`Transactions for address ${address}:`, transactions.length > 0 ? transactions : 'No transactions');
    } catch (error) {
      console.error(`Error fetching transactions for address ${address}:`, error.message);
    }
  }
}

module.exports = getTransactions;
