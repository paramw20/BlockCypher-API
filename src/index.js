const { program } = require('commander');
const createWallet = require('./commands/createwallet');
const importWallet = require('./commands/importWallet');
const listWallet = require('./commands/listWallet');
const getBalance = require('./commands/getBalance');
const getTransactions = require('./commands/getTransaction');
const generateAddress = require('./commands/generateAddress');

program.version('1.0.0');

program
  .command('create <name>')
  .description('Create a new BIP39 wallet')
  .action(createWallet);

program
  .command('import <name> <mnemonic>')
  .description('Import a BIP39 wallet from mnemonic')
  .action(importWallet);

program.command('list').description('List all wallets').action(listWallet);

program
  .command('balance <name>')
  .description('Get Bitcoin balance of a wallet')
  .action(getBalance);

program
  .command('transactions <name>')
  .description('Get transaction history of a wallet')
  .action(getTransactions);

program
  .command('generate-address <name>')
  .description('Generate an unused Bitcoin address')
  .action(generateAddress);

program.parse(process.argv);
