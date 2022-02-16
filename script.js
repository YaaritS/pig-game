'use strict';
//define elements you will use later
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const switchPlayer = function () {
    currentScore = 0; 
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

    let currentScore;
    let activePlayer; 
    let isPlaying;
    let scores;

const init = function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner'); 
    player1El.classList.remove('player--winner'); 
    player1El.classList.remove('player--active'); 
    player0El.classList.add('player--active');
    currentScore = 0;
    activePlayer = 0; 
    isPlaying = true;
    scores = [0, 0];
    diceEl.classList.add('hidden');
};

init();



//Rolling the dice
btnRoll.addEventListener('click', function() {
    if(isPlaying){
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice randomly
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1 - if true switch to next player
    if(dice !== 1) {
        //add the dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
       
    } else {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        switchPlayer();
    }
}
});

//Adding current score to total score
btnHold.addEventListener('click', function() {
    if(isPlaying){
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 20) {
        isPlaying = false;
        document.getElementById(`name--${activePlayer}`).textContent = `You won the game!`;
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        diceEl.classList.add('hidden');
    } else {
    switchPlayer();
    };
}
});

//Start a new game
btnNew.addEventListener('click', init);
