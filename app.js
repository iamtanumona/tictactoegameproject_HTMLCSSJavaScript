let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msgPara = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [[0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8]];

const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((boxEl) => {
    boxEl.addEventListener("click",() => {
        if(turnO){
            boxEl.innerText = "O";
            boxEl.style.color = "green";
            turnO = false;
        } else {
            boxEl.innerText = "X";
            boxEl.style.color = "red";
            turnO = true;
        }
        boxEl.disabled = true;

        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msgPara.innerText = `Game Draw. Play Again`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msgPara.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);