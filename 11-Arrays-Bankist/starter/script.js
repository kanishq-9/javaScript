'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2022-12-21T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const local_lang = navigator.language;

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
const currencyType = value => {
    const option = {
        style: 'currency',
        currency: currentUser.currency,
    };
    const type = new Intl.NumberFormat(currentUser.locale, option).format(value);
    return type;
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const updateUI = function(acc, sort = false) {
    const now = new Date();
    displayMovements(acc, sort);
    //display balance
    calcDispayBalance(acc);
    //display summary
    calcDisplaySummary(acc);
    //date
};
const calcDispayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${currencyType(acc.balance)}`;
};
const calcDaysPassed = (day1, day2) =>
    Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

const addDate = function(now) {
    // const date = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    const day = calcDaysPassed(now, new Date());
    if (day === 0) return `Today`;
    else if (day === 1) return `Yesterday`;
    else if (day <= 7) return `${day} day's ago`;
    else
        return `${new Intl.DateTimeFormat(currentUser.locale, {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(now)}`;
};

const displayMovements = function(acc, sort = false) {
        containerMovements.innerHTML = '';

        //sorting
        const movs = sort ?
            acc.movements.slice().sort((a, b) => a - b) :
            acc.movements;

        movs.forEach(function(mov, i) {
                    const type = mov > 0 ? 'deposit' : 'withdrawal';
                    const date = new Date(acc.movementsDates[i]);
                    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    ${sort ? '' : `<div class="movements__date">${addDate(date)}</div>`}
      <div class="movements__value">${currencyType(mov.toFixed(2))}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  [...document.querySelectorAll('.movements__row')].forEach(function (curr, i) {
    if (i % 2) curr.style.backgroundColor = '#eff283';
  });
};
//sort
let shouldSort = false;
btnSort.addEventListener('click', function () {
  shouldSort = shouldSort ? false : true;
  updateUI(currentUser, shouldSort);
});

const calcDisplaySummary = function ({ movements, interestRate }) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${currencyType(income.toFixed(2))}`;
  const outcome = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${currencyType(Math.abs(outcome).toFixed(2))}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * Number(`${interestRate}`)) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${currencyType(interest.toFixed(2))}`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.slice(0, 1))
      .join('');
  });
};

const setLogoutTimer = function () {
  const tick = function () {
    let min = String(Math.trunc(timer / 60)).padStart(2, 0);
    let sec = String(timer % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (timer === 0) {
      clearInterval(settingInterval);
      labelWelcome.textContent = `Log in to get started `;
      containerApp.style.opacity = `0%`;
      setTimeout(() => alert('You were logged out'), 1000);
    }
    timer--;
  };
  let timer = 20;
  tick();
  settingInterval = setInterval(tick, 1000);
  return settingInterval;
};

createUserNames(accounts);

let currentUser, settingInterval;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentUser) {
    if (currentUser.pin === Number(inputLoginPin.value)) {
      //display ui and message
      labelWelcome.textContent = `Welcome back! ${
        currentUser.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = `100%`;

      //clear input fields
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      inputLoginPin.blur();

      //Timer
      if (settingInterval) clearInterval(settingInterval);
      settingInterval = setLogoutTimer();
      //display movements
      updateUI(currentUser);
      let now = new Date();
      //   let date = `${now.getDate()}`.padStart(2, 0);
      //   let month = `${now.getMonth() + 1}`.padStart(2, 0);
      //   let year = `${now.getFullYear()}`.padStart(2, 0);
      //   let hour = `${now.getHours()}`.padStart(2, 0);
      //   let min = `${now.getMinutes()}`.padStart(2, 0);

      labelDate.textContent = `${new Intl.DateTimeFormat(currentUser.locale, {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'short',
      }).format(now)}`;
    } else {
      containerApp.style.opacity = 0;
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      inputLoginPin.blur();
      window.alert('Check the password!🔴');
    }
  } else {
    containerApp.style.opacity = 0;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    window.alert('Enter correct User name!🔴');
  }
});

//Transfer
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  if (inputTransferTo.value) {
    const receiverAcc = accounts.find(
      acc => acc.userName === inputTransferTo.value
    );
    if (
      amount > 0 &&
      receiverAcc &&
      currentUser.balance >= amount &&
      receiverAcc.userName != currentUser.userName
    ) {
      currentUser.movements.push(-amount);
      receiverAcc.movements.push(amount);
      const date = new Date();
      currentUser.movementsDates.push(date.toISOString());
      receiverAcc.movementsDates.push(date.toISOString());
      //Reset timer
      clearInterval(settingInterval);
      settingInterval = setLogoutTimer();
      //update UI
      updateUI(currentUser);
    }
  } else {
    alert('Enter correct name');
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferTo.blur();
});
//Loan: It is provided only if the user has atleast one deposit with atleast 10per of requested loan amount
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentUser.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentUser.movements.push(amount);
      const date = new Date();
      currentUser.movementsDates.push(date.toISOString());
      //reset timer
      clearInterval(settingInterval);
      settingInterval = setLogoutTimer();
      //update ui
      updateUI(currentUser);
    }, 3000);
  } else {
    alert(
      'Sorry Loan cannot be granted until there is a deposit greater than 10per of loan request'
    );
  }
  inputLoanAmount.value = '';
});

//closing account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentUser.userName &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentUser.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started `;
  } else {
    alert('input correct name and pin!!');
  }
});
// /////LECTURE
//map

// // console.log(accounts);

// //filter
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// // console.log(deposits);
// // console.log(withdrawals);

// //reduce : mov.reduce(function(accumulator,current value, index, array){},initial value of the accumulator)
// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance);
// const balance = movements.reduce(
//     (acc, curr) => (curr > acc ? curr : acc),
//     movements[0]
// );
// console.log(balance);