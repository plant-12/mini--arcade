const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image");

let points = parseInt(localStorage.getItem('totalPoints')) || 0;

function initializeTotalPoints() {
    updateAndStorePoints(points);
}

initializeTotalPoints();
updateAndStorePoints(points);

optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");
        userResult.src = cpuResult.src = "images/rock.png";
        result.textContent = "Wait...";

        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        setTimeout(() => {
            gameContainer.classList.remove("start");
            let imageSrc = e.target.querySelector("img").src;
            userResult.src = imageSrc;

            let randomNumber = Math.floor(Math.random() * 3);
            let cpuImages = ["images/rock.png", "images/paper.png", "images/scissor.png"];
            cpuResult.src = cpuImages[randomNumber];

            let cpuValue = ["R", "P", "S"][randomNumber];
            let userValue = ["R", "P", "S"][index];

            let outcomes = {
                RR: "Draw",
                RP: "Lost",
                RS: "Won",
                PP: "Draw",
                PR: "Won",
                PS: "Lost",
                SS: "Draw",
                SR: "Lost",
                SP: "Won",
            };

            let outComeValue = outcomes[userValue + cpuValue];
            result.textContent = userValue === cpuValue ? "Match Draw" : `You ${outComeValue} !`;

            // Update scores
            if (outComeValue === "Won") {
                points += 5;
                updateAndStorePoints(points);
            }
        }, 2500);
    });
});

function updateAndStorePoints(points) {
    localStorage.setItem('totalPoints', points);
    document.getElementById('points').textContent = 'Points: ' + points;
}
