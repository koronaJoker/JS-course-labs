
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
 * @param {*} transactions 
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} day 
 * @returns Number
 * @description - функция вычисления суммы транзакций по дате. Если год, месяц или день не указаны, то учитываются все транзакции.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    let total = 0;

    for (const t of transactions) {
        const [y, m, d] = t.transaction_date.split("-").map(Number);

        const match =
            (year === undefined || y === year) &&
            (month === undefined || m === month) &&
            (day === undefined || d === day);

        if (match) { 
            total += t.transaction_amount;
        }
    }

    return total;
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



/**
 *
 * @param transactions
 *@returns {string}
 */
function mostTransactionTypes(transactions) {
    if (transactions.length === 0) {
        console.log("No transactions😭")
        return null
        };

    let debitCount = 0, creditCount = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].transaction_type === "credit")
            creditCount++;
        else if (transactions[i].transaction_type === "debit")
            debitCount++;
    }
    if (debitCount > creditCount)
        return "debit";
    else if (creditCount > debitCount)
        return "credit";
    else
        return "credit = debit";
}



/**
 * 
 * @param {*} transactions 
 * @param {string} merchant 
 * @returns {*} transactions 
 */

function calculateTotalDebitAmount(transactions) {
    let total = 0;
    for (const t of transactions) 
        if (t.transaction_type === "debit")
            total += t.transaction_amount;
        
    return total;
}



function findMostTransactionsMonth(transactions) {
    if (transactions.length === 0) {
        console.log("No transactions😭");
        return null;
    }

    const monthCounts = {};
    for (const t of transactions) {
        const month = t.transaction_date.split("-")[1] - 1;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    }

    let mostMonth = 0;
    let maxCount = 0;

    for (const month in monthCounts) {
        if (monthCounts[month] > maxCount) {
            maxCount = monthCounts[month];
            mostMonth = month;
        }
    }

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[Number(mostMonth)];
}



/**
 * 
 * @param {*} transactions 
 * @param {*} merchant 
 * @returns 
 */
function getTransactionsByMerchant(transactions, merchant) {
    return transactions.filter(t => t.merchant_name === merchant);
}




/**
 *
 * @param transactions
 * @returns {number}
 * @description - функция вычисления средней стоимости транзакций
 */
let calculateAverageTransactionAmount = (transactions) => {
    if (transactions.length === 0) return 0; 
    return calculateTotalAmount(transactions) / transactions.length;
}



/**
 * 
 * @param {*} transactions 
 * @param {*} date 
 * @returns 
 */
function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}



/**
 * 
 * @param {*} transactions 
 * @returns 
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

/**
 * 
 * @param {*} transactions 
 * @param {*} minAmount 
 * @param {*} maxAmount 
 * @returns  {transactions}
 */
function getTransactionsByAmountRange (transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * 
 * @param {*} transactions 
 * @returns {number}
 */
function findMostDebitTransactionMonth(transactions) {

    if (transactions.length === 0) {
        console.log("No transactions😭")
        return null
        };

    const monthCounts = new Array(12).fill(0);
    for (const t of transactions) {
        if (t.transaction_type === "debit") {
            const month = t.transaction_date.split("-")[1]-1;
            monthCounts[month]++;
        }
    }

    let maxCount = monthCounts[0];
    let maxMonth = 1;
    for (let i = 1; i < monthCounts.length; i++) {
        if (monthCounts[i] > maxCount) {
            maxCount = monthCounts[i];
            maxMonth = i + 1;
        }
    }

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return monthNames[maxMonth - 1];
}


/**
 * 
 * @param {*} transactions 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns {transactions} where startDate <= transaction_date <= endDate
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
        const transactionDate = new Date(t.transaction_date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });
}

function findTransactionById(transactions, id) {
    if (transactions === null || transactions.length === 0) {
        console.log("No transactions😭");
        return null;
    }
    const result = transactions.find(t => t.transaction_id === id);
    return result ? [result] : [];
}

function pretty_print(transactions) {
    if (transactions === null || transactions === undefined ||transactions.length === 0 ) {
        console.log("😭");
        return null;
    }

    for (const t of transactions) {
        console.log(`ID: ${t.transaction_id}, Date: ${t.transaction_date}, Amount: ${t.transaction_amount}, Type: ${t.transaction_type}, Description: ${t.transaction_description}, Merchant: ${t.merchant_name}, Card Type: ${t.card_type}`);
    }
}



export {pretty_print, findTransactionById, getUniqueTransactionTypes, calculateTotalAmount, calculateTotalAmountByDate, getTransactionByType, mostTransactionTypes, calculateTotalDebitAmount, findMostTransactionsMonth, getTransactionsByMerchant, calculateAverageTransactionAmount, getTransactionsBeforeDate, mapTransactionDescriptions, getTransactionsByAmountRange, findMostDebitTransactionMonth, getTransactionsInDateRange };