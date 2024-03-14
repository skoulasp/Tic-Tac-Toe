class TicTacToe {
    constructor() {
        this.board = document.querySelector("main");
        this.headingTwo = document.getElementsByTagName("h2")[0];
        this.resetButton = document.querySelector(".btn");
        this.moveSpan = document.querySelectorAll(".play-field");
        this.posArray = document.querySelectorAll(".area");
        this.manageAnimation = this.manageAnimation.bind(this);
        this.turn = 0;
        this.hasWonBool = false;
        this.fullGrid = false;
        this.pos = [];
        this.winner = null;
        this.board.addEventListener("click", this.playGame.bind(this));
        this.resetButton.addEventListener("click", this.resetGame.bind(this));
        document.addEventListener("animationend", this.manageAnimation);
    }

    manageAnimation(e) {
        if (
            e.animationName === "fadeOut" &&
            !e.target.classList.contains(".play-field-x") &&
            !e.target.classList.contains(".play-field-y")
        ) {
            if (this.turn === 0) {
                this.headingTwo.textContent = `Player X's turn`;
            } else {
                this.headingTwo.textContent = `Player O's turn`;
            }
            e.target.classList.add("fadeIn");
        }
        e.target.classList.remove(e.animationName);
        console.log("A");
    }

    startGame() {
        this.turn = 0;
        this.pos = [];
        this.hasWonBool = false;
        this.winner = null;
        this.board.classList.add("playerx");
        this.headingTwo.classList.add("playerx");
        this.headingTwo.textContent = "Player X's turn";
    }

    resetGame() {
        this.board.classList.add("fadeOutPerma");
        console.log("FR");
        setTimeout(() => {
            this.board.classList.remove("fadeOutPerma");
            this.startGame();
        }, 300);

        const winningCells = document.querySelectorAll(".winning");
        for (let i = 0; i < winningCells.length; i++) {
            winningCells[i].classList.remove("winning");
        }

        this.board.classList.remove("won");
        this.board.classList.remove("playery");
        this.headingTwo.classList.remove("playery", "fadeOut", "fadeIn", "winner", "tie");
        this.headingTwo.classList.add("fadeOut");
        this.resetButton.classList.remove("gameover");
        this.resetButton.textContent = "Restart";

        this.headingTwo.style.color = null;
        this.headingTwo.style.animation = null;
        document.addEventListener("animationend", this.manageAnimation);
        this.posArray.forEach((i) => {
            if (i.firstElementChild.dataset.move !== "") {
                i.firstElementChild.dataset.move = "";
            }
            if (i.classList.contains("active")) {
                i.classList.remove("active");
            }
        });
        this.moveSpan.forEach((i) => {
            if (i.classList.contains("play-field-x")) {
                i.classList.remove("play-field-x");
            }
            if (i.classList.contains("play-field-o")) {
                i.classList.remove("play-field-o");
            }
        });
        this.posArray.forEach((i) => {
            i.classList.remove("won");
        });
    }

    hasWon(data) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                data[a].firstElementChild.dataset.move &&
                data[a].firstElementChild.dataset.move === data[b].firstElementChild.dataset.move &&
                data[a].firstElementChild.dataset.move === data[c].firstElementChild.dataset.move
            ) {
                const winner = data[a].firstElementChild.dataset.move;
                this.winner = winner;
                this.board.classList.add("won");

                // Add winning class to the three positions
                setTimeout(() => {
                    data[a].classList.add("winning");
                }, 100);
                setTimeout(() => {
                    data[b].classList.add("winning");
                }, 200);
                setTimeout(() => {
                    data[c].classList.add("winning");
                }, 300);

                if (winner === "X") {
                    this.headingTwo.classList.remove("playery", "fadeOut", "fadeIn");
                    this.headingTwo.classList.add("playerx");
                } else if (winner === "O") {
                    this.headingTwo.classList.remove("playerx", "fadeOut", "fadeIn");
                    this.headingTwo.classList.add("playery");
                }

                this.headingTwo.classList.add("winner");
                this.headingTwo.textContent = `Player ${winner} has Won!`;
                this.headingTwo.classList.add("fadeIn");
                this.resetButton.classList.add("gameover");
                this.resetButton.textContent = "Play Again";
                this.hasWonBool = true;
                document.removeEventListener("animationend", this.manageAnimation);
                return true;
            }
        }
        this.fullGrid = true;
        for (let i = 0; i < data.length; i++) {
            if (data[i].firstElementChild.dataset.move === "") {
                this.fullGrid = false;
                break;
            }
        }

        if (this.fullGrid) {
            this.headingTwo.style.color = "#f53384";
            this.headingTwo.classList.remove("playerx", "playery", "fadeOut", "fadeIn");
            this.headingTwo.textContent = "It's a Tie!";
            this.headingTwo.classList.add("tie");
            this.resetButton.classList.add("gameover");
            this.resetButton.textContent = "Play Again";

            this.hasWonBool = true;
            document.removeEventListener("animationend", this.manageAnimation);
            return "tie";
        }

        return false;
    }

    playGame(e) {
        if (this.hasWonBool) return;
        const currentTarget = e.target;
        if (currentTarget.className.includes("pos")) {
            const filled = currentTarget.className.split(" ");
            this.pos.push(filled[1]);
            this.headingTwo.style.removeProperty("color");
            if (currentTarget.dataset.move !== "X" && currentTarget.dataset.move !== "O" && !e.target.classList.contains("active")) {
                currentTarget.classList.add("active");
                if (this.turn === 0) {
                    if (!currentTarget.firstElementChild.classList.contains("play-field-o")) {
                        currentTarget.firstElementChild.dataset.move = "X";
                        this.moveSpan[currentTarget.dataset.pos].classList.add("play-field-x");
                        this.headingTwo.classList.add("fadeOut");
                        this.headingTwo.classList.remove("playerx");
                        this.headingTwo.classList.add("playery");
                        this.board.classList.remove("playerx");
                        this.board.classList.add("playery");
                    }
                } else {
                    if (!currentTarget.firstElementChild.classList.contains("play-field-x")) {
                        currentTarget.firstElementChild.dataset.move = "O";
                        this.moveSpan[currentTarget.dataset.pos].classList.add("play-field-o");
                        this.headingTwo.classList.add("fadeOut");
                        this.headingTwo.classList.remove("playery");
                        this.headingTwo.classList.add("playerx");
                        this.board.classList.remove("playery");
                        this.board.classList.add("playerx");
                    }
                }
                this.turn === 0 ? (this.turn = 1) : (this.turn = 0);
            }
            this.winner = this.hasWon(this.posArray);
        }
        console.log("haswonbool is", this.hasWonBool);
    }
}
const i = document.querySelector(".information");
let modalActive = false;
document.addEventListener("click", (e) => {
    if (e.target === i && modalActive === false) {
        modalActive = true;
        document.body.classList.add("modal-open");
        const modal = document.createElement("div");
        modal.classList.add("modal-background");
        // document.body.classList.add("blur");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "The JavaScript Tic Tac Toe game";
        const modalText = document.createElement("p");
        modalText.textContent = "Created by Petros Skoulas in 2023. This project was built using HTML, CSS and vanilla JavaScript.";
        const modalClose = document.createElement("button");
        modalClose.classList.add("modal-close");
        modalClose.innerHTML = "&#10006;";
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalClose);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modalClose.addEventListener("click", () => {
            document.body.classList.remove("modal-open");
            modal.remove();

            modalActive = false;
        });
    } else if (e.target === i && modalActive) {
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-background").remove();
        modalActive = false;
    }
});

document.addEventListener("keydown", function (e) {
    if (e.code === "Escape" && modalActive) {
        document.body.classList.remove("modal-open");
        document.querySelector(".modal-background").remove();
        modalActive = false;
    }
});

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const game = new TicTacToe();
game.startGame();
