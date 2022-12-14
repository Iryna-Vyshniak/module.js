/*
 * Контекст (this)
 *    - Где и как была объявлена функция НЕ ИМЕЕТ НИКАКОГО ВЛИЯНИЯ на контекст.
 *    - Контекст определяется В МОМЕНТ ВЫЗОВА ФУНКЦИИ, если он не привязан явно.
 */

/*
 * Вызов без контекста
 * - В строгом режиме = undefined
 * - Не в строгом режиме = window
 */

// =================================== THIS ====================
const btn = document.querySelector('button');

btn.addEventListener('click', log);

function log() {
  console.log(this);
  // console.dir(this) => button

  setTimeout(() => {
    console.log(this);
  }, 100);
  // button, on click => button

  // setTimeout(function () {
  //   console.log(this);

  // }, 100);
  // window with use strict
}

log();
// first => use strict => undefined
// without use strict => window
// when click =>  < button type = "button" class="button" > Click me</ >

// ======================================================
// const ladder = {
//   step: 0,

//   up() {
//     this.step += 1;
//     return this
//   },
//   down() {
//     this.step -= 1
//     return this
//   },

//   showStep() {
//     console.log(this.step)
//     return this
//   }
// }
// Тепер, якщо нам потрібно зробити кілька послідовних викликів, ми можемо зробити це так:

//Змініть код методів up, down і showStep таким чином, щоб їх виклик можна було зробити ланцюжком, наприклад так:
// console.log(ladder.up().up().up().up().up().showStep().down());

// ========================================================

// =======================================  BIND ==========================================================
/* FULL VERSION
 
const calcOrder = (func, num, price, drink) => {
  let sum = num * price;
  let text = '';
 
  if (drink === 'coffee') {
    text = 'Get ice!';
  } else if (drink === 'tea') {
    text = 'Get cake!';
  } else {
    text = 'Get free order!';
  }
 
  func(sum, text);
};
 
const showMessage = (text, orderPrice) => {
  console.log(text);
  console.log(`Your order price: ${orderPrice}`);
};
 
calcOrder(showMessage, 3, 30, 'coffee');
*/

const calcOrder = (func, num, price, drink) => {
  const sum = num * price;

  func(sum);
};

const showMessage = (text, orderPrice) => {
  console.log(text);
  console.log(`Your order price: ${orderPrice}`);
};

calcOrder(showMessage.bind(this, 'Get ice!'), 3, 20, 'coffee');
calcOrder(showMessage.bind(this, 'Get cake!'), 2, 10, 'tea');
calcOrder(showMessage.bind(this, 'Get surprise!'), 5, 15, 'milk');

// ================== FUNC METHODS  IN OBJ =====================================================

const newUser = {
  name: 'Nick',
  getUserName(age, title) {
    // console.log(this.name); //TypeError: Cannot read properties of undefined (reading 'name')
    console.log(age);
    console.log(title);
    // this.age = age; //  TypeError: Cannot set properties of undefined (setting 'age')
    // console.log(this); //   window
  },
};

const user = {
  name: 'Alex',
};

let { getUserName } = newUser;

getUserName(); // undefined, find .this from right => this.getUserName()
console.log(getUserName()); // undefined
console.log(getUserName); // getUserName(age) {this.age = age; console.log(this.name)}

// without user name Alex

// getUserName = getUserName.bind(newUser, 12);
// getUserName(); // Nick, 12 undefined

// with user name Alex
// getUserName = getUserName.bind(user, 12);
// getUserName(); // Alex

//============================ CALL =====================================================

// getUserName = getUserName.call(newUser, 25, 'developer');
// Nick
// 25
// developer

// ========================== APPLY =====================================================
getUserName = getUserName.apply(newUser, [25, 'developer']);
// Nick
// 25
// developer

// ====================================== in FUNC =======================================
function currentUser() {
  console.log(this);
}

currentUser(); //   window
currentUser.apply({ userName: 'Mary' }); // {userName: 'Mary'}
currentUser.call({ userName: 'Mary' }); // {userName: 'Mary'}
currentUser.bind({ userName: 'Mary' })(); // {userName: 'Mary'}

// =============================== ARROW FUNC =============================================
// шукає this за межами ф-ції => за nextUser => window

console.log(this); //  window

const nextUser = {
  name: 'Nick',
  getNextUserName: () => {
    // console.log(this.name); //  TypeError: Cannot read properties of undefined (reading 'name')
    console.log(this); //  window
  },
};

nextUser.getNextUserName();

// ============================================

const nextUser2 = {
  name: 'Nick',
  numbers: [1, 2, 3, 4, 5],
  getNextUserName() {
    console.log(this.name); //   Nick
    console.log(this); //  {name: 'Nick', numbers: Array(5), getNextUserName: ƒ}
    this.numbers.forEach(item => {
      console.log(this.name + '-' + item);
    }); //  Nick-1 Nick-2 Nick-3 Nick-4 Nick-5
  },
};

nextUser2.getNextUserName();

// Rазведывательному управлению SI:7, нужно безопасно хранить добытые данные. Твоё задание абсолютно засекречено!
// Создай функцию makeSecret, которая принимает строки secret и password и возвращает функцию storage с секретом.
//     • при обычном вызове storage возвращает строку Absolutely not a secret thing
//     • если вызвать метод storage.getSecret и передать ему правильный пароль, то мы получим секретное значение secret
//     • если пароль неправильный, то результат будет Wrong password!
//     • если пароль трижды подряд введён неправильно, то метод блокируется и все его последующие вызовы будут возвращать null (даже для правильного пароля)
//     • если ДО блокировки введён правильный пароль, то счётчик неправильных вводов сбрасывается снова до 3
//     • метод storage.setSecret(newSecret, newPassword) позволяет установить новый пароль и секретную фразу и сбросить счётчик

const storage = makeSecret('Santa exists!', 'qwerty');
storage.setSecret('Coll Secret', 'qazwsx');

function makeSecret(secret, pasw) {
  let currentSecret = secret;
  let currentPasw = pasw;
  let numberOfMistakes = 0;

  const innerStorage = () => 'Absolutely not a secret thing';
  innerStorage.getSecret = initialPasw => {
    if (numberOfMistakes > 3) {
      return null;
    }

    if (initialPasw === currentPasw) {
      return currentSecret;
    }

    numberOfMistakes++;
    return 'Wrong password!';
  };

  innerStorage.setSecret = (newSecret, newPasw) => {
    currentSecret = newSecret;
    currentPasw = newPasw;
    numberOfMistakes = 0;
  };
  return innerStorage;
}

///
const objA = {
  x: 5,
  showThis() {
    console.log('this in objA showThis: ', this); //  {x: 5, showThis: ƒ}
    console.log('this in objA showThis: ', this.x); // 5

    const objB = {
      y: 10,
      showThisB() {
        console.log('this in objB showThisB: ', this); //  {y: 10, showThisB: ƒ}
        console.log('this in objB showThisB: ', this.y); // 10
      },
      // don`t use below - useless (unhelpful)
      showThisArrow: () => {
        console.log('this in objB showThisArrow: ', this); //  {x: 5, showThis: ƒ}
        console.log('this in objB showThisArrow: ', this.x); //5
        console.log('this in objB showThisArrow: ', this.y); // undefined
      },
    };
    objB.showThisB();
    objB.showThisArrow();
  },
};

objA.showThis();
