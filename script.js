const cardsArray = [
    {
        "name": "01",
        "image": "./assets/01.jpg",
        "id": "01"
    },
    {
        "name": "02",
        "image": "./assets/02.jpg",
        "id": "02"
    },
    {
        "name": "03",
        "image": "./assets/03.jpg",
        "id": "03"
    },
    {
        "name": "04",
        "image": "./assets/04.jpg",
        "id": "04"
    },
    {
        "name": "05",
        "image": "./assets/05.jpg",
        "id": "05"
    },
    {
        "name": "06",
        "image": "./assets/06.jpg",
        "id": "06"
    },
    {
        "name": "07",
        "image": "./assets/07.jpg",
        "id": "07"
    },
    {
        "name": "08",
        "image": "./assets/08.jpg",
        "id": "08"
    },
    {
        "name": "09",
        "image": "./assets/09.jpg",
        "id": "09"
    }
];

const doubleCardsArray = [...cardsArray, ...cardsArray]
let gameGrid = doubleCardsArray.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let matchedCount = 0;
let previousTarget = null;
let delay = 1000;
let timerCount = 60;
let clicks = 0;

const modal = document.getElementById('modal');
let modalText = document.querySelector('h1');
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const leaveButton = document.getElementById('leave');
let timerData = document.getElementById('timer-data');
const game = document.getElementById('game');
const grid = document.createElement('section');

grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
    const { name, image } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('card-front');

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.style.backgroundImage = `url(./assets/border.webp), url(${image})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });

    matchedCount++

    if (matchedCount === cardsArray.length) {
        leftPanel.style.transform = 'translateX(0%)';
        rightPanel.style.transform = 'translateX(0%)';

        startButton.disabled = true;
        startButton.classList.add('disabled');
        resetButton.disabled = false;
        resetButton.classList.remove('disabled');

        modalText.textContent = 'You won!';
    }
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', event => {

    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

let clock = () => {
    setTimeout(() => {
        const timer = setInterval(function () {
            timerCount--;

            timerData.textContent = timerCount.toString().padStart(2, '0');


            if (timerCount < 11) {
                timerData.classList.add('last-seconds');
            }

            if (timerCount === 0) {
                clearInterval(timer);

                timerData.innerHTML = ''
            }

            if (matchedCount !== cardsArray.length && timerCount === 0) {
                leftPanel.style.transform = 'translateX(0%)';
                rightPanel.style.transform = 'translateX(0%)';

                modalText.textContent = 'Try again!';
                modalText.classList.add('fail');

                startButton.disabled = true;
                startButton.classList.add('disabled');
                resetButton.disabled = false;
                resetButton.classList.remove('disabled');

                if (timerData.classList.contains('last-seconds')) {
                    timerData.classList.remove('last-seconds');
                }
            }

            if (matchedCount === cardsArray.length && timerCount !== 0) {
                modalText.classList.remove('fail');
                timerData.textContent = '';

                clearInterval(timer);
            }

            if (matchedCount === cardsArray.length && timerCount === 0) {
                modalText.classList.remove('fail');
                timerData.textContent = '';

                clearInterval(timer);
            }

            if (matchedCount === cardsArray.length && timerCount < 11) {
                modalText.classList.remove('fail');
                timerData.textContent = '';

                clearInterval(timer);

                if (timerData.classList.contains('last-seconds')) {
                    timerData.classList.remove('last-seconds');
                }
            }
        }, 1000);
    }, 400);
}

const normalDiff = () => {
    timerCount = 60;
    timerData.textContent = timerCount;
}

const hardDiff = () => {
    timerCount = 50;
    timerData.textContent = timerCount;
}

const masterDiff = () => {
    timerCount = 40;
    timerData.textContent = timerCount;
}

const tornmentDiff = () => {
    timerCount = 30;
    timerData.textContent = timerCount;
}

const startGame = () => {
    leftPanel.style.transform = 'translateX(-97%)';
    rightPanel.style.transform = 'translateX(97%)';

    clock();
};

const resetGame = () => {
    switch (timerCount) {
        case 60:
            timerCount = 60;
            clearInterval(timer);
            break
        case 50:
            timerCount = 50;
            clearInterval(timer);
            break
        case 40:
            timerCount = 40;
            clearInterval(timer);
            break
        case 30:
            timerCount = 30;
            clearInterval(timer);
            break
    }

    firstGuess = '';
    secondGuess = '';
    count = 0;
    matchedCount = 0;
    previousTarget = null;
    timerData.innerHTML = timerCount;
    grid.innerHTML = '';
    game.innerHTML = '';
    game.appendChild(grid);
    gameGrid = doubleCardsArray.sort(() => 0.5 - Math.random());

    leftPanel.style.transform = 'translateX(-97%)';
    rightPanel.style.transform = 'translateX(97%)';

    setTimeout(() => {
        gameGrid.forEach(item => {
            const { name, image } = item;

            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = name;

            card.classList.add('new-game');

            const front = document.createElement('div');
            front.classList.add('card-front');

            const back = document.createElement('div');
            back.classList.add('card-back');
            back.style.backgroundImage = `url(./assets/border.webp), url(${image})`;

            grid.appendChild(card);
            card.appendChild(front);
            card.appendChild(back);

            setTimeout(() => {
                card.classList.remove('new-game');
            }, 1000);
        });
    }, 500);

    clock();
};

const leaveGame = () => {
    window.close();
};