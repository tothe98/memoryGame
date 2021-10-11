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
let selectedCategory;

let state = [];

function justFetch() {
    fetch("datas.json")
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                console.log(data.id);
            });
        });
}

//justFetch();

function fetchAndRender() {


    /*$(document).ready(function () {
        $.get("datas.json", function (datas) {
            state[0] = (datas[category]);
            /*datas[category].forEach(data => {
                console.log(data);
            });
        }).fail(function () {
            console.log("An error has occurred.");
        });



    });*/

    state = JSON.parse(`
    {
        "soft": [
            {
                "id": "vue",
                "firstCard": "img/vue.svg",
                "secondCard": "img/vue.svg",
                "alt": "Vue programming language",
                "level": 1
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "img/angular.svg",
                "alt": "Vue programming language",
                "level": 1
            },
            {
                "id": "ember",
                "firstCard": "img/ember.svg",
                "secondCard": "img/ember.svg",
                "alt": "Vue programming language",
                "level": 2
            },
            {
                "id": "aurelia",
                "firstCard": "img/aurelia.svg",
                "secondCard": "img/aurelia.svg",
                "alt": "Vue programming language",
                "level": 2
            },
            {
                "id": "backbone",
                "firstCard": "img/backbone.svg",
                "secondCard": "img/backbone.svg",
                "alt": "Vue programming language",
                "level": 2
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 2
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            },
            {
                "id": "angular",
                "firstCard": "img/angular.svg",
                "secondCard": "/angular.svg",
                "alt": "Vue programming language",
                "level": 3
            }
        ],
    
        "logisztika": [
            {
                "id": "1",
                "firstCard": "img/logisztika/1.jpg",
                "secondCard": "Állványrendszer",
                "alt": "állványrendszer",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/logisztika/2.jpg",
                "secondCard": "Autópálya",
                "alt": "autópálya",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/logisztika/3.jpg",
                "secondCard": "Béka",
                "alt": "béka",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/logisztika/4.jpg",
                "secondCard": "Csomagolás",
                "alt": "csomagolás",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/logisztika/5.jpg",
                "secondCard": "Csővezetékes szállítás",
                "alt": "csővezetékes szállítás",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/logisztika/6.png",
                "secondCard": "EAN kód",
                "alt": "EAN kód",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/logisztika/7.jpg",
                "secondCard": "Fuvarlevél",
                "alt": "fuvarlevél",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/logisztika/8.jpg",
                "secondCard": "Kamion",
                "alt": "kamion",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/logisztika/9.jpg",
                "secondCard": "Kézikocsi",
                "alt": "kézikocsi",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/logisztika/10.jpg",
                "secondCard": "Konténer",
                "alt": "konténer",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/logisztika/11.jpg",
                "secondCard": "Raklap",
                "alt": "raklap",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/logisztika/12.jpg",
                "secondCard": "Teherhajó",
                "alt": "teherhajó",
                "level": 3
            }
        ],
    
        "szerszam": [
            {
                "id": "1",
                "firstCard": "img/szerszamkeszito/1.jpg",
                "secondCard": "Acélsodrony",
                "alt": "acélsodrony",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/szerszamkeszito/2.jpg",
                "secondCard": "Állványos furó",
                "alt": "állványos furó",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/szerszamkeszito/3.jpg",
                "secondCard": "CNC eszterga",
                "alt": "CNC eszterga",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/szerszamkeszito/4.jpg",
                "secondCard": "CNC marógép",
                "alt": "CNC marógép",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/szerszamkeszito/5.jpg",
                "secondCard": "Csapágy",
                "alt": "csapágy",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/szerszamkeszito/6.jpg",
                "secondCard": "Fogaskerék",
                "alt": "fogaskerék",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/szerszamkeszito/7.jpg",
                "secondCard": "Hegesztés",
                "alt": "hegesztés",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/szerszamkeszito/8.jpg",
                "secondCard": "Korrózió",
                "alt": "korrózió",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/szerszamkeszito/9.png",
                "secondCard": "Lapos reszelő",
                "alt": "lapos reszelő",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/szerszamkeszito/10.jpg",
                "secondCard": "Satu",
                "alt": "satu",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/szerszamkeszito/11.jpg",
                "secondCard": "Szegecs",
                "alt": "szegecs",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/szerszamkeszito/12.png",
                "secondCard": "Tolómérő",
                "alt": "tolómérő",
                "level": 3
            }
        ],
    
        "elektro": [
            {
                "id": "1",
                "firstCard": "img/elektro/1.jpg",
                "secondCard": "Blankoló fogó",
                "alt": "blankoló fogó",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/elektro/2.jpg",
                "secondCard": "Csuklópánt",
                "alt": "csuklópánt",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/elektro/3.jpg",
                "secondCard": "Ellenállás",
                "alt": "ellenállás",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/elektro/4.jpg",
                "secondCard": "Forrasztóállomás",
                "alt": "forrasztóállomás",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/elektro/5.jpg",
                "secondCard": "Forrasztóón",
                "alt": "forrasztóón",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/elektro/6.jpg",
                "secondCard": "Tekercs",
                "alt": "tekercs",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/elektro/7.jpg",
                "secondCard": "Kábel",
                "alt": "kábel",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/elektro/8.jpg",
                "secondCard": "Multiméter",
                "alt": "multiméter",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/elektro/9.jpg",
                "secondCard": "Labortápegység",
                "alt": "labortápegység",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/elektro/10.jpg",
                "secondCard": "Digitális mikroszkóp",
                "alt": "digitális mikroszkóp",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/elektro/11.jpg",
                "secondCard": "Műszerész csipesz",
                "alt": "műszerész csipesz",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/elektro/12.jpg",
                "secondCard": "Nyomtatott áramkör",
                "alt": "nyomtatott áramkör",
                "level": 3
            }
        ]
    }
    
    `);
    //console.log(state);
    let html = "";
    let tmpCounter = 0;
    state[selectedCategory].forEach(element => {
        if (element.level === level) {
            tmpCounter++;
            html += `
            <div class="memory-card" data-framework="${element.id}">
                <img src="${element.firstCard}" alt="${element.alt}" class="front-face">
                <img src="img/backFace.png" alt="backFace logó" class="back-face">
            </div>`;
            if (element.secondCard.includes(".png") || element.secondCard.includes(".jpg")) {
                html += `<div class="memory-card" data-framework="${element.id}">
                <img src="${element.secondCard}" alt="${element.alt}" class="front-face">
                <img src="img/backFace.png" alt="backFace logó" class="back-face">
            </div>
            `;
            } else {
                html+=`<div class="memory-card" data-framework="${element.id}">
                <p class="front-face">${element.secondCard}</p>
                <img src="img/backFace.png" alt="backFace logó" class="back-face">
            </div>`
            }

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
            if (level === MAXLEVEL) {
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
    const categories = document.getElementsByName("category");
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
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            selectedCategory = categories[i].value;
        }
    }
    //alert(category)
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
