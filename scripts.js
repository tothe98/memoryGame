const cards = document.querySelectorAll('.memory-card');
const counterElement = document.querySelector('#tryingCounter');
const SCORE = 6;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;
let scoreCounter = 0;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard){
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

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    scoreCounter++;
    resetBoard();
    if(scoreCounter === SCORE) {
        setTimeout(() => {
            alert("Szia")
        }, 1500); //1.5 sec
    } 
}

function unflipCards() {
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500); //1,5 sec
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function reset() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.removeEventListener('click', flipCard);
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
        counter = 0;
        scoreCounter = 0;
        counterElement.innerHTML = counter;
    })
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));