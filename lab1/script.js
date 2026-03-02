alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

let name = "Kiril";
let birthYear = 2005;
let isStudent = true;
let score = prompt("Введите ваш балл:");
if (score >= 90) {
    console.log("Отлично!");
} else if (score >= 70) {
    console.log("Хорошо");
} else {
    console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
    console.log(`Итерация: ${i}`);

}

/**
 * сложение двух чисел
 * @param {number} a - nbgybv
 * @param {number} b
 * @returns {number} a+b
 * @description Сложение двух чисел
 */
function sum (a, b) {
    return a + b;
}

sum(1,2)