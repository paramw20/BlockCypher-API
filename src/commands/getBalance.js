// src/commands/getbalance.js
const axios = require("axios");
require("dotenv").config();

const getBalance = async (walletName) => {
  try {
    
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/wallets/${walletName}?token=${process.env.BLOCKCYPHER_TOKEN}`);
    
    const balance = response.data.balance;
    const balanceInBtc = balance / 1e8;
    
    console.log(`The balance of wallet '${walletName}' is: ${balanceInBtc} BTC`);
  } catch (error) {
    console.error("Error getting wallet balance:", error.response ? error.response.data : error.message);
  }
};

module.exports = getBalance;
