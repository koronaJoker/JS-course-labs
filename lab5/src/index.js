import { closeModal, initSelect, renderTable } from "./ui.js";
import {deleteTransaction, addTransaction, transactions } from "./transactions.js";

initSelect();
renderTable(transactions);

const btn = document.querySelector('#add');
btn.addEventListener('click', () => addTransaction(renderTable));

const table = document.querySelector("table");
const details = document.getElementById("transactionDetails");

table.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = Number(row.dataset.id);
    const transaction = transactions.find(t => t.id === id);

    if (e.target.tagName === "BUTTON") {
        e.stopPropagation(); 

        row.classList.add("fade-out");

        setTimeout(() => {
            deleteTransaction(id);
            renderTable(transactions);
            details.innerHTML = "";
        }, 300);

        return;
    }

    if (transaction) {
        details.innerHTML = `
            <h3>Transaction #${transaction.id}</h3>
            <p><b>Amount:</b> ${transaction.amount}</p>
            <p><b>Time:</b> ${transaction.date}</p>
            <p><b>Category:</b> ${transaction.category}</p>
            <p><b>Description:</b> ${transaction.description}</p>
        `;
    }
});

const errorBtn = document.getElementById("closeBtn");
errorBtn.addEventListener("click" ,closeModal);