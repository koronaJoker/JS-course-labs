/**
 *
 * @param {Array<*>} arr - array of any type
 * @description - prints array elements as: "Element i : value arr[i]"
 */
const printArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log("Element " + i + ": " + arr[i]);
    }
};


/**
 *
 * @param {Array<*>} arr - array of any type
 * @description - prints array elements as "i: arr[i]"
 */

const printArray1 = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(i + ": " + arr[i]);
    }
}

//printArray([1, 2, 3, 4, 5]);
//printArray1([1, 2, 3, 4, 5]);


/**
 *
 * @param {Array<*>} arr
 * @param {function} callback - fun(element, index, array)
 * description calls callback for each element of array
 */
const forEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++)
        callback(arr[i], i, arr);
}

// forEach([1, 2, 3], (element, index, array) => {
//     console.log(`Element: ${element}, Index: ${index}`);
// });

// forEach([1, 2, 3], (element, index, array) => {
//     console.log(`${index}, Value: ${element}`);
// });


/**
 *
 * @param {Array<*>} arr
 * @param {Function} callback
 * @returns {*[]}
 * @desciption returns modified by callback array of the same type,
 */
const map = (arr, callback) => {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(callback(arr[i], i, arr));
    }
    return newArr;
}
//console.log(map(([1, 2, 3, 4, 5]), (element, index, array) => element ** 2));
//console.log(map(([1, 2, 3, 4, 5]), (element) => element ** 3));

/**
 *
 * @param {Array<*>} arr
 * @param <Function> callback
 * @returns {*[]}
 * @description returns new Array of the same type, modified by condition in callback
 */
const filter = (arr, callback) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

let numbers = [1, 2, 3, 4, 5];

const evenNumbers = filter(numbers, (element) => element % 2 === 0);
//console.log(evenNumbers);

/**
 *
 * @param arr
 * @param callback
 * @returns {undefined|*}
 * @description finds element in array and returns it, else - undefined
 */
const find = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            return arr[i];
        }
    }
}


let firstEven = find(numbers, (element) => element % 2 === 0);
//console.log(firstEven); // 2

firstEven = find([], (element) => element % 2 === 0);
//console.log(firstEven); // undefined


/**
 *
 * @param arr
 * @param callback
 * @returns {boolean}
 * @description checks if there is at least one element in the array
 */
const some = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            return true
        }
    }
    return false;
}

numbers = [1, 2, 3, 4, 5];
const hasEven = some(numbers, (element) => element % 2 === 0);
//console.log(hasEven); // true
/**
 *
 * @param arr
 * @param callback
 * @returns {boolean}
 * @description checks if every element of array returns true for callback condition
 */
const every = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        if (!callback(arr[i], i, arr)) {
            return false;
        }
    }
    return true;
}

numbers = [2, 4, 6, 7];
const allEven = every(numbers, (element) => element % 2 === 0);
//console.log(allEven);

/**
 *
 * @param arr - массив
 * @param callback - Колбэк должен принимать четыре аргумента: аккумулятор, текущий элемент, индекс элемента и весь массив.
 * @param initialValue - начальное значение аккумулятора
 * @returns {undefined|*}
 * @description The function sequentially processes the elements of the array, accumulating the result in the accumulator.
 */
const reduce = (arr, callback, initialValue) => {

    if (arr.length === 0 && initialValue === undefined) {
        return undefined;
    }

    let accumulator;
    let i = 0;

    if (initialValue === undefined) {
        accumulator = arr[0];
        i = 1;
    } else
        accumulator = initialValue;


    for (i; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }

    return accumulator;
};

numbers = [1, 2, 3, 4, 5];
let sum = reduce(numbers, (accumulator, element) => accumulator * element, 1);
console.log(sum);
sum = reduce(numbers, (accumulator, element) => accumulator + element, 0);
console.log(sum);
