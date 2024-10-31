const axios = require('axios');
require('dotenv').config();

const apiBaseUrl = 'https://api.blockcypher.com/v1/btc/test3';

async function getBalance(address) {
  const response = await axios.get(`${apiBaseUrl}/addrs/${address}/balance?token=${process.env.BLOCKCYPHER_TOKEN}`);
  return response.data.balance / 1e8;
}



async function getAddresses(walletName) {
  try {
    const response = await axios.get(`${apiBaseUrl}/wallets/${walletName}?token=${process.env.BLOCKCYPHER_TOKEN}`);
    console.log("Addresses:", response.data.addresses);
    return response.data.addresses || []; // Return all addresses
  } catch (error) {
    console.error(`Error fetching addresses for wallet ${walletName}:`, error.message);
    return [];
  }
}


async function getTransactions(address) {
  const url = `${apiBaseUrl}/addrs/${address}/full`;
  try {
    const response = await axios.get(url);
    return response.data.txrefs || []; // Return an empty array if no transactions
  } catch (error) {
    console.error(`Error fetching transactions for address ${address}:`, error.message);
    return [];
  }
}

async function isUnused(address) {
  const transactions = await getTransactions(address);
  return transactions.length === 0;
}

module.exports = { getBalance,getAddresses, getTransactions, isUnused };
