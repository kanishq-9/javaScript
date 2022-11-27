'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currPlayerScore0 = document.querySelector('#current--0');
const currPlayerScore1 = document.querySelector('#current--1');

//declaring a variable
let finalScores, activePlayer, playing, currPlayerScore;

const init = function() {
    activePlayer = 0;
    playing = true;
    finalScores = [0, 0];
    currPlayerScore = 0;
    dice.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    score0.textContent = 0;
    score1.textContent = 0;
    currPlayerScore0.textContent = currPlayerScore;
    currPlayerScore1.textContent = currPlayerScore;
};

// score0.textContent = 0;
// let currPlayerScore = 0;
// score1.textContent = 0;
// dice.classList.add('hidden');

// //final scores
// let finalScores = [0, 0];

// //active player
// let activePlayer = 0;

// //to check if player won
// let playing = true;

//function to switch player
const switchPlayer = function() {
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    currPlayerScore = 0;
};

//START
init();

// rolling a dice function

btnRoll.addEventListener('click', () => {
    if (playing) {
        //generete random number
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(randomNumber);
        //show dice
        dice.classList.remove('hidden');
        dice.src = `dice-${randomNumber}.png`;

        if (randomNumber !== 1) {
            currPlayerScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent =
                currPlayerScore;
        } else {
            //switch player
            switchPlayer();
            //classList.toggle(); helps both to remove and add if either is there; if add is present then it removes and if it is not there then it adds;
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        finalScores[activePlayer] += currPlayerScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            finalScores[activePlayer];

        if (finalScores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);