const root = document.querySelector('.memory-game');
const counterElement = document.querySelector('#tryingCounter');
const endInterface = document.querySelector('.end-interface');
const secondLbl = document.querySelector('#second');
const minutesLbl = document.querySelector('#minutes');
const MAXLEVEL = 3;

let SCORE = 2;
let cards = null;
let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
let counter = 0;
let scoreCounter = 0;
let sec = 0;
let minutes = 0;
let second = 0;
let firstClick = true;
let level = 1;

let state = [];

function fetchAndRender() {
    state = JSON.parse(`
    [
        {
            "id": "vue",
            "firstCard": "img/vue.svg",
            "secondCard": "img/vue.svg",
            "alt": "Vue programming language",
            "level":1
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "img/angular.svg",
            "alt": "Vue programming language",
            "level":1
        },
        {
            "id": "ember",
            "firstCard": "img/ember.svg",
            "secondCard": "img/ember.svg",
            "alt": "Vue programming language",
            "level":2
        },
        {
            "id": "aurelia",
            "firstCard": "img/aurelia.svg",
            "secondCard": "img/aurelia.svg",
            "alt": "Vue programming language",
            "level":2
        },
        {
            "id": "backbone",
            "firstCard": "img/backbone.svg",
            "secondCard": "img/backbone.svg",
            "alt": "Vue programming language",
            "level":2
        },
        {
            "id": "react",
            "firstCard": "img/react.svg",
            "secondCard": "img/react.svg",
            "alt": "Vue programming language",
            "level":2
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        },
        {
            "id": "angular",
            "firstCard": "img/angular.svg",
            "secondCard": "/angular.svg",
            "alt": "Vue programming language",
            "level":3
        }
    ]
    `);
    let html = "";
    let tmpCounter = 0;
    state.forEach(element => {
        if (element.level === level) {
            tmpCounter++;
            html += `
        <div class="memory-card" data-framework="${element.id}">
            <img src="${element.firstCard}" alt="${element.alt}" class="front-face">
            <img src="img/backFace.png" alt="backFace logó" class="back-face">
        </div>
        <div class="memory-card" data-framework="${element.id}">
            <img src="${element.secondCard}" alt="${element.alt}" class="front-face">
            <img src="img/backFace.png" alt="backFace logó" class="back-face">
        </div>
        `;
        }
    });
    root.innerHTML = html;
    SCORE = tmpCounter;
    cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();

}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    if (firstClick) { startTimer(); firstClick = false }

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
            if(level === MAXLEVEL){
                myStopFunction();
                document.querySelector('#time').innerHTML = minutes + " perc " + second + " másodperc"
                document.querySelector('#tryingCount').innerHTML = counter;
                endInterface.style.display = "flex";
            } else {
                level++;
                scoreCounter = 0;
                document.querySelector('#level').innerHTML = level;
                fetchAndRender();
            }
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
    myStopFunction();
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    counter = 0;
    scoreCounter = 0;
    counterElement.innerHTML = counter;
    level = 1;
    firstClick = true;
    fetchAndRender();
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function start() {
    const box = document.querySelector(".start-interface");
    document.querySelector('#level').innerHTML = level;
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    counter = 0;
    scoreCounter = 0;
    box.style.display = "none";
    level = 1;
    firstClick = true;
    fetchAndRender();
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
    box.style.display = "none";
    firstClick = true;
    level = 1;
    fetchAndRender();
    
    shuffle();
}

function stop() {
    myStopFunction();
    const box = document.querySelector(".start-interface");
    box.style.display = "flex";

}

function pad(val) {
    return val > 9 ? val : "0" + val;
};

var myInterval;
function startTimer() {
    myInterval = setInterval(function () {
        second = (pad(++sec % 60));
        minutes = (pad(parseInt(sec / 60, 10)));
        secondLbl.innerHTML = second;
        minutesLbl.innerHTML = minutes
    }, 1000);
}

function myStopFunction() {
    sec = 0;
    clearInterval(myInterval);
}
