import { calculateTotal } from "./transactions.js";


export function initSelect() {
  const select = document.querySelector('.select');
  const selected = document.querySelector('.selected');
  const options = document.querySelector('.options');

  if (!select || !selected || !options) return;

  selected.addEventListener('click', (e) => {
    e.stopPropagation();
    options.classList.toggle('active');
    selected.classList.toggle('open');
  });

  options.addEventListener('click', (e) => {
    const option = e.target.closest('.option');
    if (!option) return;

    selected.textContent = option.textContent;
    selected.dataset.value = option.dataset.value || option.textContent;

    options.classList.remove('active');
    selected.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.select')) {
      options.classList.remove('active');
      selected.classList.remove('open');
    }
  });
}



  export function renderTable(transactions) {
      const tbody = document.querySelector("tbody");
      const blockSumAmount = document.getElementsByClassName("amount-value")[0];
      const textSumAmount = document.getElementById("amount");
      
      tbody.innerHTML = "";

      for (let i = 0; i < transactions.length; i++) {
          const row = document.createElement("tr");
          let shortDesc = transactions[i].description.split(' ').slice(0, 4).join(' ');
          row.dataset.id = transactions[i].id;
          row.classList.add(transactions[i].amount >= 0 ? "positive" : "negative");

          row.innerHTML = `
              <td>${transactions[i].id}</td>
              <td>${transactions[i].amount}</td>
              <td>${transactions[i].date}</td>
              <td>${transactions[i].category}</td>
              <td>${shortDesc}</td>
              <td><button data-id="${transactions[i].id}" type="button">Удалить</button></td>
          `;

          tbody.appendChild(row);
      }

      const total = calculateTotal(transactions);

      textSumAmount.innerHTML = total + " $";

      blockSumAmount.classList.remove("positive", "negative");
      blockSumAmount.classList.add(total >= 0 ? "positive" : "negative");
  }

export const modalWindow = document.querySelector(".modal-window");
const errorList = document.getElementById("error-list");
const overlay = document.querySelector("#modal-overlay");

export function showModal(errorFields) {

  errorList.innerHTML = "";
  
  modalWindow.classList.add("visible");
  overlay.classList.add("visible");

  document.body.style.overflow = "hidden";

  for (let i = 0; i < errorFields.length; i++) {
    const li = document.createElement("li");
    li.textContent = errorFields[i];
    li.classList.add("error");

    errorList.appendChild(li);
  }
}

export function closeModal() {
  modalWindow.classList.remove("visible");
  overlay.classList.remove("visible");

  document.body.style.overflow = ""; 
}