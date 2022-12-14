// 1 Функции
// Function Declaration
function greet(name) {
  console.log('Welcome - ', name);
}

// Function Expression
const greet2 = function greet2(name) {
  console.log('Greeting - ', name);
};

greet('Valik');
greet2('Ielisei');

console.log(typeof greet);
console.dir(greet);

// 2 Анонимные функции
let counter = 0;
const interval = setInterval(function () {
  if (counter === 5) {
    clearInterval(interval); // clearTimeout
  } else {
    console.log(++counter);
  }
}, 1000);

// 3 Стрелочные функции
function greetUser() {
  console.log('Aloha - ');
}

const arrow = (name, age) => {
  console.log('Hello - ', name, age);
};

const arrow2 = name => console.log('Welcome - ', name);

// arrow2('Andrew')

const pow2 = num => num ** 2;

// console.log(pow2(5))

// 4 Параметры по умолчанию
const sum = (a = 40, b = a * 2) => a + b;

// console.log(sum(41, 4))
// console.log(sum())

function sumAll(...all) {
  let result = 0;
  for (let num of all) {
    result += num;
  }
  return result;
}

const res = sumAll(1, 2, 3, 4, 5);
console.log(res);

// 5 Замыкания -из одной функции возвращаем другую функцию
function createMember(name) {
  return function (lastName) {
    console.log(name + lastName);
  };
}

const logWithLastName = createMember('Andrew');
console.log(logWithLastName(' Glagolev')); /* Andrew Glagolev */
console.log(logWithLastName(' Vyshniak')); /* Andrew Vyshniak */

//
let nameUa = 'Іван';

function sayHi() {
  console.log('Привіт, ' + nameUa);
}

nameUa = 'Петро';

sayHi(); // що вона покаже "Іван" чи "Петро"?
//Відповідь: Петро.
// Функція отримує зовнішні змінні такими, якими вони є зараз, тобто вона використовує останні значення.
// Старі значення змінних ніде не зберігаються. Коли функція потребує змінної, вона бере поточне значення зі свого власного або зовнішнього лексичного середовища.

//
function makeWorker() {
  let name1 = 'Петро';

  return function () {
    console.log(name1);
  };
}

let name1 = 'Іван';

// створити функцію
let work = makeWorker();

// викликати її
work(); // Що вона покаже?
// Відповідь: Петро.

// Функція work() в коді нижче отримує name від місця його походження через посилання на зовнішнє лексичне середовище:
//Але якби не було let name у makeWorker(), тоді пошук вийшов би за межі лексичного середовища та взяв би глобальну змінну, як ми бачимо з ланцюжка вище. В такому випадку відповідь була б "Іван".

function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

console.log(counter1()); // 0
console.log(counter1()); // 1

console.log(counter2()); // 0
console.log(counter2()); // 1

// Функції counter і counter2 створюються різними викликами makeCounter.
// Отже, вони мають незалежні зовнішні лексичні середовища, кожне з яких має свою власну змінну count.

function Counter() {
  let count = 0;

  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}

let counter3 = new Counter();

console.log(counter3.up()); // 1
console.log(counter3.up()); // 2
console.log(counter3.down()); // 1
// Обидві вкладені функції створюються в межах єдиного зовнішнього лексичного середовища, тому вони мають спільний доступ до однієї змінної count.

// У нас є вбудований для масивів метод arr.filter(f). Він фільтрує всі елементи через функцію f. Якщо вона повертає true, цей елемент повертається в отриманому масиві.

// Зробіть набір “готових до використання” фільтрів:

// inBetween(a, b) – фільтрує елементи які більше a та менше b. Також має включати елементи, які дорівнюють їм.
// inArray([...]) – фільтрує елементи, які включено у заданий масив.
// Використання має бути таким:

// arr.filter(inBetween(3,6)) – вибирає лише значення від 3 до 6.
// arr.filter(inArray([1,2,3])) – вибирає лише елементи, які включені у масив [1,2,3].
// Наприклад:

/* .. ваш код для inBetween та inArray */
// let arr = [1, 2, 3, 4, 5, 6, 7];

// console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

// console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2
// Фільтр inBetween
function inBetween(a, b) {
  return function (x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

// Фільтр inArray
function inArray(arr) {
  return function (x) {
    return arr.includes(x);
  };
}

let arr2 = [1, 2, 3, 4, 5, 6, 7];
console.log(arr2.filter(inArray([1, 2, 10]))); // 1,2

//
function createCalcFunction(n) {
  return function () {
    console.log(1000 * 42);
  };
}
createCalcFunction(); // nothing
const calc = createCalcFunction(42);
calc();
//42000

function createIncrementor(n) {
  return function (num) {
    return num + n;
  };
}

const addOne = createIncrementor(1);
// addOne() => num
addOne(42);
// 42 + 1
// 43

const addTen = createIncrementor(10);
addTen(42);
// 42+ 10
// 52

function urlGenerator(domain) {
  return function (url) {
    return `https://${url}.${domain}`;
  };
}

const comUrl = urlGenerator('.com');
comUrl('google');
console.log(comUrl('google'));
// https://google.com
comUrl('netflix');
// https://netflix.com
const byUrl2 = urlGenerator('.by');
byUrl2('belnews');
console.log(comUrl('belnews'));
// https://belnews.by

const a = 10;
function f1() {
  console.log(a);
}

f1();
// 10

////////////////////////////////////
function f2() {
  let a = 33;
  console.log(a);
}
f2();
console.log(f2());

///////////////////////////////////

const counterPlus = (n = 0) => {
  let count = n;
  return function () {
    count += 1;
    console.log(count);
  };
};

const step1 = counterPlus();
step1();
step1();
// 1
// 2
// ...
const step2 = counterPlus(200);
step2();
// 201

// recursion
// get random number from min - 0.5 to max + 0.5
const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

function createBeggar() {
  let s = 0;
  return function beggar() {
    s += randomInteger(0, 100);

    console.log(s);
    if (s >= 250) return;
    beggar();
  };
}
let begg1 = createBeggar();
// 77
// 154
// 231
let begg2 = createBeggar();
// 60
// 68
// 147

// anonimous 2 functions for button in separated .js files, with same let p
/* 
  function buttonClick(){
  let p = 10;
  let q = document.querySelector('.b-1');

  q.onclick = () => {
    p += 1;
    console.log('work bt-1: ' + p);
  };
}
buttonClick();
*/
// 1
(() => {
  let p = 0;
  let q = document.querySelector('.js-b-1');

  q.onclick = () => {
    p += 1;
    console.log('work bt-1: ' + p);
  };
})();
// work bt-1: 1
// work bt-1: 2
// work bt-1: 3

// 2
(() => {
  let p = 10;
  let q = document.querySelector('.js-b-2');

  q.onclick = () => {
    p += 1;
    console.log('work bt-2: ' + p);
  };
})();
// work bt-2: 10
// work bt-2: 12
// work bt-2: 13

/*
 * Стрелочные функции
 * - Объявление
 * - Явный и неявный возврат
 * - Аргументы
 * - Неявный возврат объекта
 */

// const add = function (a, b, c) {
//     console.log(arguments);
//     return a + b + c;
// };

// const addArrow = (a, b, c) => {
//     return a + b + c;
// };

// console.log(add(5, 10, 15));
// console.log(addArrow(5, 10, 15));

// const fnA = function () {
//   return {
//     a: 5,
//   };
// };

// console.log(fnA());

// const arrowFnA = () => ({ arrowA: 5 });

// console.log(arrowFnA());

const filter = (array, test) => {
  const filteredArray = [];

  for (const el of array) {
    console.log(el);
    const passed = test(el);

    if (passed) {
      filteredArray.push(el);
    }
  }

  return filteredArray;
};

// const callback1 = value => value >= 3;

const r1 = filter([1, 2, 3, 4, 5], value => value >= 3);

console.log(r1);

// const callback2 = value => value <= 4;

const r2 = filter([1, 2, 3, 4, 5, 6, 7, 8], value => value <= 4);
console.log(r2);

const fruits = [
  { name: 'apples', quantity: 200, isFresh: true },
  { name: 'grapes', quantity: 150, isFresh: false },
  { name: 'bananas', quantity: 100, isFresh: true },
];

// const getFruitsWithQuantity = fruit => fruit.quantity >= 120;

const r3 = filter(fruits, fruit => fruit.quantity >= 120);
console.log(r3);

// you will be given an array a and a value x. All you need to do is check whether the provided array contains the value.
// Array can contain numbers or strings. X can be either.
// Return true if the array contains the value, false if not.

function check(a, x) {
  // your code here
  let result = false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === x) {
      return (result = true);
    }
  }
  return result;
}
//  or
function check1(a, x) {
  // your code here
  return a.includes(x) ? true : false;
}
// ========================================================================================
const people = [
  ['Mike', 'Anderson'],
  ['Olha', 'Nickol'],
];

const mapDateBase = peopleArr =>
  peopleArr.map(person => ({ firstName: person[0], lastName: person[1] }));

const newUsers = mapDateBase(people);
console.log(newUsers); //  [
//   { firstName: 'Mike', lastName: 'Anderson' },
//   { firstName: 'Olha', lastName: 'Nickol' },
// ];

// ========================================================================================
const ages = [18, 14, 22, 34, 43, 18, 20, 34, 24];

// const getAvarageAges = arrAges => Math.round(arrArges.reduce((acc, age) => (acc + age) / arrAges.length));

const getAvarageAges = arrArges =>
  Math.round(arrArges.reduce((acc, age) => acc + age / arrArges.length, 0));

console.log(getAvarageAges(ages)); // 25

// =========================================================================================
const getObjectAges = arrArges => {
  return arrArges.reduce((acc, age) => {
    const objAge = { age };
    acc.push(objAge);
    return acc;
  }, []);
};

console.log(getObjectAges(ages)); //  [{age: 18}, {age: 14}, {age: 22}, {…}, {…}, {…}, {…}, {…}, {…}]

// ==========================================================================================
// from object to sort array with filter names
const peopleData = [
  { firstName: 'Mike', lastName: 'Anderson' },
  { firstName: 'Olha', lastName: 'Nickolson' },
];

const getArrayofNewPeople = arr =>
  arr
    .map(person => `${person.firstName} ${person.lastName}`)
    .sort((currentName, nextName) => currentName.localeCompare(nextName));

console.log(getArrayofNewPeople(peopleData)); // ['Mike Anderson', 'Olha Nickolson']

// contex this
const book = {
  title: 'React for beginners',
  showThis() {
    console.log('showThis -> this: ', this); // {title: 'React for beginners', showThis: ƒ, showTitle: ƒ}
  },
  showTitle() {
    console.log('showTitle -> this.title: ', this.title); //
  },
};

book.showThis(); // Какой this ???

const outerShowThis = book.showThis;
outerShowThis(); // undefined

const outerShowTitle = book.showTitle;
// outerShowTitle(); // TypeError: Cannot read properties of undefined (reading 'title')

const ingredients = ['Potatoes', 'Mushrooms', 'Garlic', 'Tomatos', 'Herbs', 'Condiments'];
const ingredientsRef = document.querySelector('#ingredients');

// const itemsRef = ingredients.map(ingredient => {
//   const item = document.createElement('li');
//   item.textContent = ingredient;
//   item.classList.add('item');
//   return item;
// });

// ingredientsRef.append(...itemsRef);
// console.log(ingredientsRef); // <ul id="ingredients">...</ul>

const ingredientsMarkup = [];

function createIngredientsList(ingredients = []) {
  ingredients.map(elem => {
    const item = document.createElement('li');
    item.textContent = elem;
    item.classList.add('item');
    ingredientsMarkup.push(item);
  });
  return ingredientsRef.append(...ingredientsMarkup);
}

createIngredientsList(ingredients);
console.log(ingredientsRef); //<ul id="ingredients">...</ul>
