// src/commands/listwallets.js
const axios = require("axios");
require("dotenv").config();

const listWallets = async () => {
  try {
   
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/wallets?token=${process.env.BLOCKCYPHER_TOKEN}`);

    if (response.data && response.data.wallet_names) {
      console.log("Wallets registered on BlockCypher:");
      response.data.wallet_names.forEach((walletName) => {
        console.log(`- ${walletName}`);
      });
    } else {
      console.log("No wallets found.");
    }
  } catch (error) {
    console.error("Error listing wallets:", error.response ? error.response.data : error.message);
  }
};

module.exports = listWallets;
