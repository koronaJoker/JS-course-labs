import * as utils from './utils.js';
import * as data from './data.js';

//GetUniqueTransactionTypes

console.log('UNIQUE TRANSACTION TYPES:');
console.log("emptyTransactions:");
utils.pretty_print(utils.getUniqueTransactionTypes(data.emptyTransactions));
console.log("oneTransaction:");
utils.pretty_print(utils.getUniqueTransactionTypes(data.oneTransaction));
console.log("transactions:");
utils.pretty_print(utils.getUniqueTransactionTypes(data.transactions));


console.log("=================================");

console.log('CALCULATE TOTAL AMOUNT:');
console.log("emptyTransactions:");
console.log(utils.calculateTotalAmount(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.calculateTotalAmount(data.oneTransaction));
console.log("transactions:");
console.log(utils.calculateTotalAmount(data.transactions));

console.log("=================================");

console.log('CALCULATE TOTAL AMOUNT:');
console.log("emptyTransactions:");
console.log(utils.calculateTotalAmount(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.calculateTotalAmount(data.oneTransaction));
console.log("transactions:");
console.log(utils.calculateTotalAmount(data.transactions));


console.log("=================================");

console.log('CALCULATE TOTAL AMOUNT BY DATE:');
console.log("emptyTransactions:");
console.log(utils.calculateTotalAmountByDate(data.emptyTransactions, 2022));
console.log("oneTransaction:");
console.log(utils.calculateTotalAmountByDate(data.oneTransaction, undefined, 1, undefined));
console.log("transactions:");
console.log(utils.calculateTotalAmountByDate(data.transactions, 2019, 1, undefined));


console.log("=================================");

console.log('GET TRANSACTION BY TYPE:');
console.log("emptyTransactions:");
utils.pretty_print(utils.getTransactionByType(data.emptyTransactions, "debit"));
console.log("oneTransaction:");
utils.pretty_print(utils.getTransactionByType(data.oneTransaction, "debit"));
console.log("transactions:");
utils.pretty_print(utils.getTransactionByType(data.transactions, "debit"));


console.log("=================================");

console.log('GET TRANSACTIONS IN DATE RANGE:');
console.log("emptyTransactions:");
utils.pretty_print(utils.getTransactionsInDateRange(data.emptyTransactions, "2020-01-01", "2020-12-31"));
console.log("oneTransaction:");
utils.pretty_print(utils.getTransactionsInDateRange(data.oneTransaction, "2020-01-01", "2020-12-31"));
console.log("oneTransactionwWithInormalRange:");
utils.pretty_print(utils.getTransactionsInDateRange(data.oneTransaction, "1111-01-01", "1970-12-31"));
console.log("transactions:");
utils.pretty_print(utils.getTransactionsInDateRange(data.transactions, "2019-01-01", "2019-12-31"));


console.log("=================================");

console.log('GET TRANSACTIONS BY MERCHANT:');
console.log("emptyTransactions:");
utils.pretty_print(utils.getTransactionsByMerchant(data.emptyTransactions, "TechStore"));
console.log("oneTransaction:");
utils.pretty_print(utils.getTransactionsByMerchant(data.oneTransaction, "TechStore"));
console.log("transactions:");
utils.pretty_print(utils.getTransactionsByMerchant(data.transactions, "TechStore"));
console.log("transactions(RestaurantABC):");
utils.pretty_print(utils.getTransactionsByMerchant(data.transactions, "RestaurantABC"));


console.log("=================================");

console.log('CALCULATE AVERAGE TRANSACTION AMOUNT:');
console.log("emptyTransactions:");
console.log(utils.calculateAverageTransactionAmount(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.calculateAverageTransactionAmount(data.oneTransaction));
console.log("transactions:");
console.log(utils.calculateAverageTransactionAmount(data.transactions));


console.log("=================================");
console.log('GET TRANSACTIONS BY AMOUNT RANGE:');
console.log("emptyTransactions:");
utils.pretty_print(utils.getTransactionsByAmountRange(data.emptyTransactions, 100, 500));
console.log("oneTransaction:");
utils.pretty_print(utils.getTransactionsByAmountRange(data.oneTransaction, 100, 500));
console.log("transactions(100-500):");
utils.pretty_print(utils.getTransactionsByAmountRange(data.transactions, 100, 500));
console.log("transactions(50-75):");
utils.pretty_print(utils.getTransactionsByAmountRange(data.transactions, 50, 75));

console.log("=================================");
console.log("CALCULATE TOTAL DEBIT AMOUNT:");
console.log("emptyTransactions:");
console.log(utils.calculateTotalDebitAmount(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.calculateTotalDebitAmount(data.oneTransaction));
console.log("transactions:");
console.log(utils.calculateTotalDebitAmount(data.transactions));

console.log("=================================");
console.log("FIND MOST TRANSACTION MONTH:");
console.log("emptyTransactions:");
console.log(utils.findMostTransactionsMonth(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.findMostTransactionsMonth(data.oneTransaction));
console.log("transactions:");
console.log(utils.findMostTransactionsMonth(data.transactions));

console.log("=================================");
console.log("FIND MOST DEBIT TRANSACTION MONTH:");
console.log("emptyTransactions:");
console.log(utils.findMostDebitTransactionMonth(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.findMostDebitTransactionMonth(data.oneTransaction));
console.log("transactions:");
console.log(utils.findMostDebitTransactionMonth(data.transactions));

console.log("=================================");

console.log("MOST TRANSACTION TYPES:");
console.log("emptyTransactions:");
console.log(utils.mostTransactionTypes(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.mostTransactionTypes(data.oneTransaction));
console.log("transactions:");
console.log(utils.mostTransactionTypes(data.transactions));

console.log("=================================");

console.log("GET TRANSACTIONS BEFORE DATE:");
console.log("emptyTransactions:");
utils.pretty_print(utils.getTransactionsBeforeDate(data.emptyTransactions, "2020-01-01"));
console.log("oneTransaction:");
utils.pretty_print(utils.getTransactionsBeforeDate(data.oneTransaction, "2020-01-01"));
console.log("transactions:");
utils.pretty_print(utils.getTransactionsBeforeDate(data.transactions, "2020-01-01"));
console.log("transactions:");
utils.pretty_print(utils.getTransactionsBeforeDate(data.transactions, "2019-03-02"));


console.log("=================================");
console.log("FIND TRANSCATION BY ID");
console.log("emptyTransactions:");
utils.pretty_print(utils.findTransactionById(data.emptyTransactions, "678"));
console.log("oneTransaction:");
utils.pretty_print(utils.findTransactionById(data.oneTransaction, "1000"));
console.log("transactions:");
utils.pretty_print(utils.findTransactionById(data.transactions, "1"));
console.log("transactions:");
utils.pretty_print(utils.findTransactionById(data.transactions, "2"));

console.log("=================================");
console.log("MAP TRANSACTION DESCRIPTIONS:");
console.log("emptyTransactions:");
console.log(utils.mapTransactionDescriptions(data.emptyTransactions));
console.log("oneTransaction:");
console.log(utils.mapTransactionDescriptions(data.oneTransaction));
console.log("transactions:");
console.log(utils.mapTransactionDescriptions(data.transactions));