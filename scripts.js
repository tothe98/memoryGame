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

function fetchAndRender() {

    state = JSON.parse(`
    {
        "soft": [
            {
                "id": "1",
                "firstCard": "img/soft/1.webp",
                "secondCard": "Angular",
                "alt": "angular",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/soft/2.webp",
                "secondCard": "React",
                "alt": "react",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/soft/3.webp",
                "secondCard": "Javascript",
                "alt": "javascript",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/soft/4.webp",
                "secondCard": "Integrált fejlesztői környezet",
                "alt": "IDE",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/soft/5.webp",
                "secondCard": "Java",
                "alt": "java",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/soft/6.webp",
                "secondCard": "Pyhton",
                "alt": "python",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/soft/7.webp",
                "secondCard": "Adatbázis",
                "alt": "adatbázis",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/soft/8.webp",
                "secondCard": "Felhőszolgáltás",
                "alt": "felhőszolgáltatás",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/soft/9.webp",
                "secondCard": "Keresőmotor",
                "alt": "keresőmotor",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/soft/10.webp",
                "secondCard": "Hálózat",
                "alt": "hálózat",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/soft/11.webp",
                "secondCard": "Memóriakezelés",
                "alt": "memóriakezelés",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/soft/12.webp",
                "secondCard": "Vue",
                "alt": "vue",
                "level": 3
            }
        ],
    
        "logisztika": [
            {
                "id": "1",
                "firstCard": "img/logisztika/1.webp",
                "secondCard": "Állványrendszer",
                "alt": "állványrendszer",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/logisztika/2.webp",
                "secondCard": "Autópálya",
                "alt": "autópálya",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/logisztika/3.webp",
                "secondCard": "Béka",
                "alt": "béka",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/logisztika/4.webp",
                "secondCard": "Csomagolás",
                "alt": "csomagolás",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/logisztika/5.webp",
                "secondCard": "Csővezetékes szállítás",
                "alt": "csővezetékes szállítás",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/logisztika/6.webp",
                "secondCard": "EAN kód",
                "alt": "EAN kód",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/logisztika/7.webp",
                "secondCard": "Fuvarlevél",
                "alt": "fuvarlevél",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/logisztika/8.webp",
                "secondCard": "Kamion",
                "alt": "kamion",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/logisztika/9.webp",
                "secondCard": "Kézikocsi",
                "alt": "kézikocsi",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/logisztika/10.webp",
                "secondCard": "Konténer",
                "alt": "konténer",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/logisztika/11.webp",
                "secondCard": "Raklap",
                "alt": "raklap",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/logisztika/12.webp",
                "secondCard": "Teherhajó",
                "alt": "teherhajó",
                "level": 3
            }
        ],
    
        "szerszam": [
            {
                "id": "1",
                "firstCard": "img/szerszamkeszito/1.webp",
                "secondCard": "Acélsodrony",
                "alt": "acélsodrony",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/szerszamkeszito/2.webp",
                "secondCard": "Állványos fúró",
                "alt": "állványos furó",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/szerszamkeszito/3.webp",
                "secondCard": "CNC eszterga",
                "alt": "CNC eszterga",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/szerszamkeszito/4.webp",
                "secondCard": "CNC marógép",
                "alt": "CNC marógép",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/szerszamkeszito/5.webp",
                "secondCard": "Csapágy",
                "alt": "csapágy",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/szerszamkeszito/6.webp",
                "secondCard": "Fogaskerék",
                "alt": "fogaskerék",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/szerszamkeszito/7.webp",
                "secondCard": "Hegesztés",
                "alt": "hegesztés",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/szerszamkeszito/8.webp",
                "secondCard": "Korrózió",
                "alt": "korrózió",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/szerszamkeszito/9.webp",
                "secondCard": "Lapos reszelő",
                "alt": "lapos reszelő",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/szerszamkeszito/10.webp",
                "secondCard": "Satu",
                "alt": "satu",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/szerszamkeszito/11.webp",
                "secondCard": "Szegecs",
                "alt": "szegecs",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/szerszamkeszito/12.webp",
                "secondCard": "Tolómérő",
                "alt": "tolómérő",
                "level": 3
            }
        ],
    
        "elektro": [
            {
                "id": "1",
                "firstCard": "img/elektro/1.webp",
                "secondCard": "Blankoló fogó",
                "alt": "blankoló fogó",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/elektro/2.webp",
                "secondCard": "Csuklópánt",
                "alt": "csuklópánt",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/elektro/3.webp",
                "secondCard": "Ellenállás",
                "alt": "ellenállás",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/elektro/4.webp",
                "secondCard": "Forrasztóállomás",
                "alt": "forrasztóállomás",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/elektro/5.webp",
                "secondCard": "Forrasztóón",
                "alt": "forrasztóón",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/elektro/6.webp",
                "secondCard": "Tekercs",
                "alt": "tekercs",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/elektro/7.webp",
                "secondCard": "Kábel",
                "alt": "kábel",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/elektro/8.webp",
                "secondCard": "Multiméter",
                "alt": "multiméter",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/elektro/9.webp",
                "secondCard": "Labortápegység",
                "alt": "labortápegység",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/elektro/10.webp",
                "secondCard": "Digitális mikroszkóp",
                "alt": "digitális mikroszkóp",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/elektro/11.webp",
                "secondCard": "Műszerész csipesz",
                "alt": "műszerész csipesz",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/elektro/12.webp",
                "secondCard": "Nyomtatott áramkör",
                "alt": "nyomtatott áramkör",
                "level": 3
            }
        ],
    
        "penz": [
            {
                "id": "1",
                "firstCard": "img/penz/1.webp",
                "secondCard": "ÁFA kulcsok",
                "alt": "ÁFA kulcsok",
                "level": 1
            },
            {
                "id": "2",
                "firstCard": "img/penz/2.webp",
                "secondCard": "Árfolyam",
                "alt": "árfolyam",
                "level": 1
            },
            {
                "id": "3",
                "firstCard": "img/penz/3.webp",
                "secondCard": "Bankautomata",
                "alt": "bankautomata",
                "level": 2
            },
            {
                "id": "4",
                "firstCard": "img/penz/4.webp",
                "secondCard": "Bankjegy",
                "alt": "bankjegy",
                "level": 2
            },
            {
                "id": "5",
                "firstCard": "img/penz/5.webp",
                "secondCard": "Bankkártya",
                "alt": "bankkártya",
                "level": 2
            },
            {
                "id": "6",
                "firstCard": "img/penz/6.webp",
                "secondCard": "Bitcoin",
                "alt": "bitcoin",
                "level": 2
            },
            {
                "id": "7",
                "firstCard": "img/penz/7.webp",
                "secondCard": "Könyvelő program",
                "alt": "könyvelő program",
                "level": 3
            },
            {
                "id": "8",
                "firstCard": "img/penz/8.webp",
                "secondCard": "Központi bank",
                "alt": "központi bank",
                "level": 3
            },
            {
                "id": "9",
                "firstCard": "img/penz/9.webp",
                "secondCard": "Pénzvizsgáló",
                "alt": "pénzvizsgáló",
                "level": 3
            },
            {
                "id": "10",
                "firstCard": "img/penz/10.webp",
                "secondCard": "Megtakarítás",
                "alt": "megtakarítás",
                "level": 3
            },
            {
                "id": "11",
                "firstCard": "img/penz/11.webp",
                "secondCard": "Mérleg",
                "alt": "mérleg",
                "level": 3
            },
            {
                "id": "12",
                "firstCard": "img/penz/12.webp",
                "secondCard": "Kamatláb",
                "alt": "kamatláb",
                "level": 3
            }
        ]
    }
    
    `);
    let html = "";
    let tmpCounter = 0;
    state[selectedCategory].forEach(element => {
        if (element.level === level) {
            tmpCounter++;
            html += `
            <div class="memory-card" data-framework="${element.id}">
                <div class="front-face">
                <img src="${element.firstCard}" alt="${element.alt}" class="front-face-img">
                </div>
                <img src="img/backFace.png" alt="backFace logó" class="back-face">
            </div>`;
            if (element.secondCard.includes(".webp")) {
                html += `<div class="memory-card" data-framework="${element.id}">
                <div class="front-face">
                <img src="${element.secondCard}" alt="${element.alt}" class="front-face-img">
                </div>
                <img src="img/backFace.png" alt="backFace logó" class="back-face">
            </div>
            `;
            } else {
                html += `<div class="memory-card" data-framework="${element.id}">
                <div class="front-face">
                <p class="front-face-p">${element.secondCard}</p>
                </div>
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
    }, 2000); //2,0 sec
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
    fetchAndRender();
}

function restart() {
    const box = document.querySelector(".end-interface");
    const startBox = document.querySelector(".start-interface");
    box.style.display = "none";
    startBox.style.display = "flex";
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
