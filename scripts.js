const cards = document.querySelectorAll('.memory-card');
const counterElement = document.querySelector('#tryingCounter');
const endInterface = document.querySelector('.end-interface');
const secondLbl = document.querySelector('#second');
const minutesLbl = document.querySelector('#minutes');
const SCORE = 6;

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
let counter = 0;
let scoreCounter = 0;
let sec = 0;
let minutes = 0;
let second = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //első kártya
        hasFlippedCard = true;
        firstCard = this;

        return;
    } else {
        //második kártya
        hasFlippedCard = false;
        secondCard = this;
        //egyezik?
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    counter++;
    counterElement.innerHTML = counter;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    scoreCounter++;
    resetBoard();
    if (scoreCounter === SCORE) {
        setTimeout(() => {
            myStopFunction();
            document.querySelector('#time').innerHTML = minutes+" perc " + second+" másodperc"
            document.querySelector('#tryingCount').innerHTML = counter;
            endInterface.style.display = "flex";
        }, 1500); //1.5 sec
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); //1,0 sec
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function reset() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard)
    });
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    counter = 0;
    scoreCounter = 0;
    counterElement.innerHTML = counter;
    shuffle();
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
(shuffle());

function start() {
    const box = document.querySelector(".start-interface");
    cards.forEach(card => card.addEventListener('click', flipCard));
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    counter = 0;
    scoreCounter = 0;
    shuffle();
    box.style.display = "none";
    myInterval();
}

function restart() {
    const box = document.querySelector(".end-interface");
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard)
    });
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    counter = 0;
    counterElement.innerHTML = counter;
    scoreCounter = 0;
    shuffle();
    box.style.display = "none";
    myInterval();
}

function pad(val) {
    return val > 9 ? val : "0" + val;
};

var myInterval = setInterval(function () {
    second = (pad(++sec % 60));
    minutes = (pad(parseInt(sec / 60, 10)));
    secondLbl.innerHTML = second;
    minutesLbl.innerHTML = minutes
}, 1000);

function myStopFunction() {
    sec=0;
    clearInterval(myInterval);
}
