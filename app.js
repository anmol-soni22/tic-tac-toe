let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-game-btn');
let msgContainer = document.querySelector('.msg-container');
let message = document.querySelector('#msg');
let heading = document.querySelector('#heading');
let turnX = false;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnX) {
            box.innerText = 'X';
            box.style.backgroundColor = 'lightblue';
            turnX = false;
        } else {
            box.innerText = 'O';
            box.style.backgroundColor = 'lightcoral';
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
    });
});


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
    checkDraw();
}

const checkDraw = () => {
    count++;
    if (count == 9) {
        showDraw();
    }
}

const showWinner = (winner) => {
    message.innerText = `Congratulations, winner is ${winner}`;
    afterResultTasks();
}

const showDraw = () => {
    message.innerText = `Oops! , The game is Draw`;
    afterResultTasks();
}

const afterResultTasks = () => {
    msgContainer.classList.remove('hide');
    heading.innerText = "Your game's snapshot";
    resetBtn.classList.add("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = '';
    }
}

const resetGame = () => {
    turnX = false;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    heading.innerText = "Tic Tac Toe";
    resetBtn.classList.remove("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);