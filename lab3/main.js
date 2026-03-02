const transactions = [
    {
      transaction_id: "1",
      transaction_date: "2019-01-01",
      transaction_amount: 100.0,
      transaction_type: "debit",
      transaction_description: "Payment for groceries",
      merchant_name: "SuperMart",
      card_type: "Visa",
    },
    {
      transaction_id: "2",
      transaction_date: "2019-01-02",
      transaction_amount: 50.0,
      transaction_type: "credit",
      transaction_description: "Refund for returned item",
      merchant_name: "OnlineShop",
      card_type: "MasterCard",
    },
    {
      transaction_id: "3",
      transaction_date: "2019-01-03",
      transaction_amount: 75.0,
      transaction_type: "debit",
      transaction_description: "Dinner with friends",
      merchant_name: "RestaurantABC",
      card_type: "Amex",
    }
];


/**
 * Возвращает массив уникальных типов транзакций
 * @param {Transaction[]} transactions
 * @returns {Transaction[]} transactions
 */
function getUniqueTransactionTypes(transactions) {
    const uniqueTypes = new Set();
    const result = [];

    for (let i = 0; i < transactions.length; i++) {
        if (!uniqueTypes.has(transactions[i].transaction_type)) {
            uniqueTypes.add(transactions[i].transaction_type);
            result.push(transactions[i]);
        }
    }

    return result;
}


/**
 * @param {{ transaction_amount: number }[]} transactions - массив транзакций
 * @returns {number} - сумма транзакций
 * @description - функция вычисления суммы транзакций
 */
function calculateTotalAmount(transactions) {
    let s = 0;
    for (let i = 0; i < transactions.length; i++) {
        s += transactions[i].transaction_amount;
    }
    return s;
}

/**
 *
 * @param transactions
 * @param {string} type
 * @returns {transactions}
 * @description - функция возвращает массив транзакций по их типу(transaction_type)
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}
/*
function getTransactionByType(transactions, type) {
    let a = [];
    for (let i < 0; i < transactions.length; i++) {
        if (transactions[i].transaction_type==type)
            a.push(transactions[i])

    }   
    return a;
}
*/

/**
 *
 * @param transactions
 */
function mostTransactionTypes(transactions) {
    let debitCount, creditCount;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions.transaction_type === "credit")
            creditCount++;
        else if (transactions.transaction_type === "debit")
            debitCount++;
    }
}

/**
 *
 * @param transactions
 * @returns {number}
 * @description - функция вычисления средней стоимости транзакций
 */
let calculateAverageTransactionAmount = (transactions)  => {
    return calculateTotalAmount(transactions) / transactions.length;
}

console.log(calculateTotalAmount(transactions));

console.log(getTransactionByType(transactions, "debit"));
console.log(getTransactionByType(transactions, "credit"));
