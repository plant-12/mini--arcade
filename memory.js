const cards = document.querySelectorAll(".card");
const scoreDisplay = document.getElementById("points");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
var points = parseInt(localStorage.getItem('totalPoints')) || 0;

function initializeTotalPoints() {
    updateAndStorePoints(points);
}

initializeTotalPoints();
updateAndStorePoints(points);

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            updateScore(5); // Add 5 points when all cards are matched
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function updateScore(amount) {
    points += amount;
    scoreDisplay.innerText = `Points: ${points}`;
    updateAndStorePoints(points);
}

function updateTotalPoints(winnerMark) {
    if (winnerMark === mark) {
        points += 5;
        updateAndStorePoints(points);
    }
}

function updateAndStorePoints(points) {
    localStorage.setItem('totalPoints', points);
    document.getElementById('points').textContent = 'Points: ' + points;
}


shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
