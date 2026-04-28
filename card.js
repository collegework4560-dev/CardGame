let cards = document.querySelectorAll(".cards");
let newGame = document.querySelector(".newBtn");
let result = document.querySelector("#result");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let score = 0;

// 🎯 assign random group (1–5)
let assignNumbers = () => {
    cards.forEach((card) => {
        let randomNum = Math.floor(Math.random() * 25) + 1;

        let group;

        if(randomNum <= 5){
            group = 1;
        }
        else if(randomNum <= 10){
            group = 2;
        }
        else if(randomNum <= 15){
            group = 3;
        }
        else if(randomNum <= 20){
            group = 4;
        }
        else{
            group = 5;
        }

        card.dataset.group = group;

        // reset to back image
        card.style.backgroundImage = 'url("download.jpg")';
    });
};

// 🖱️ card click
cards.forEach((card) => {
    card.addEventListener("click", () => {

        if(lockBoard) return;
        if(card === firstCard) return;
        if(card.disabled) return;

        // show image
        let group = card.dataset.group;

        if(group == 5){
            card.style.backgroundImage = 'url("5.png")';
        } else {
            card.style.backgroundImage = `url("${group}.jpg")`;
        }

        if(!firstCard){
            firstCard = card;
            return;
        }

        secondCard = card;

        checkMatch();
    });
});

// ✅ match logic
function checkMatch(){
    let isMatch = firstCard.dataset.group === secondCard.dataset.group;

    if(isMatch){
        // 🔥 increase score only on match
        score++;
        result.innerText = score;

        firstCard.disabled = true;
        secondCard.disabled = true;

        resetTurn();
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.style.backgroundImage = 'url("download.jpg")';
            secondCard.style.backgroundImage = 'url("download.jpg")';
            resetTurn();
        }, 800);
    }
}

// 🔄 reset turn
function resetTurn(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// 🔄 new game
newGame.addEventListener("click", () => {

    score = 0;
    result.innerText = score;

    cards.forEach((card) => {
        card.disabled = false;
    });

    resetTurn();
    assignNumbers();
});

// 🚀 start game
assignNumbers();