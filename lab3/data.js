const emptyTransactions = [];

const oneTransaction = [
    {
        transaction_id: "1000",
        transaction_date: "2020-01-01",
        transaction_amount: 200.0,
        transaction_type: "debit",
        transaction_description: "Payment for electronics",
        merchant_name: "TechStore",
        card_type: "Visa",
        
    }
];


const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2019-03-01",
        transaction_amount: 100.0,
        transaction_type: "debit",
        transaction_description: "Payment for groceries",
        merchant_name: "SuperMart",
        card_type: "Visa",
    },
    {
        transaction_id: "2",
        transaction_date: "2019-03-02",
        transaction_amount: 50.0,
        transaction_type: "credit",
        transaction_description: "Refund for returned item",
        merchant_name: "OnlineShop",
        card_type: "MasterCard",
    },
    {
        transaction_id: "3",
        transaction_date: "2022-03-03",
        transaction_amount: 75.0,
        transaction_type: "debit",
        transaction_description: "Dinner with friends",
        merchant_name: "RestaurantABC",
        card_type: "Amex",
    }
];


export { emptyTransactions, oneTransaction, transactions };