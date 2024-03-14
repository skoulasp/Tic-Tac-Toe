					mainBlock.insertBefore(nextSibling, temp);
const mainElement = document.querySelector("main");
const mainBlock = document.querySelector(".main-grid");
const titleElement = document.querySelector("h1");
const resetButton = document.querySelector(".btn");
const winnerBlock = document.querySelector("h2");
let posArray =document.querySelectorAll(".area");
let turn = 0;
let winner;
let hasWonBool = false;
let fullGrid = false;
let pos = [];

const play = (e) => {
	if (!hasWonBool) {
		let currentTarget = e.target;
		if (currentTarget.className.includes("pos")) {
			let filled = currentTarget.className.split(' ');
			pos.push(filled[1]);
			console.log(pos);
			if (currentTarget.textContent !== "X" && currentTarget.textContent !== "O") {
				console.log(currentTarget.textContent)
				turn === 0 ? currentTarget.innerText = "X" : currentTarget.innerText = "O";
				let temp = currentTarget;
				currentTarget.remove();
				let dataset;
				let nextSibling;
				if (dataset < 8) {
					dataset = temp.dataset.pos + 1;
					nextSibling = document.querySelector(".pos-" + dataset) 
					mainBlock.insertBefore(nextSibling, temp);
				} else {
					dataset = temp.dataset.pos - 1;
					nextSibling = document.querySelector(".pos-" + dataset) 
					mainBlock.append(nextSibling, temp);
				}



				console.log("THIS:", this)
				currentTarget.classList.add("active");
				turn === 0 ? turn = 1 :	turn = 0;
			}
			winner = hasWon(posArray);
		}
	}
}

const hasWon = (data) => {

	fullGrid = true;
	for (var i = 0; i < data.length; i++) {
		if (data[i].textContent === "") {
			fullGrid = false;
		}
	}

	if ((data[0].textContent == "X" && data[1].textContent == "X" && data[2].textContent == "X")
		|| (data[3].textContent == "X" && data[4].textContent == "X" && data[5].textContent == "X")
		|| (data[6].textContent == "X" && data[7].textContent == "X" && data[8].textContent == "X")
		|| (data[0].textContent == "X" && data[3].textContent == "X" && data[6].textContent == "X")
		|| (data[1].textContent == "X" && data[4].textContent == "X" && data[7].textContent == "X")
		|| (data[2].textContent == "X" && data[5].textContent == "X" && data[8].textContent == "X")
		|| (data[0].textContent == "X" && data[4].textContent == "X" && data[8].textContent == "X")
		|| (data[2].textContent == "X" && data[4].textContent == "X" && data[6].textContent == "X")) {
			winner = "X";
			winnerBlock.textContent = `Player ${winner} has Won!`;
			hasWonBool = true;
			posArray.forEach((i) => {
				i.classList.add("won");
				return;
		})
	}
	if ((data[0].textContent  == "O" && data[1].textContent  == "O" && data[2].textContent == "O") 
		|| (data[3].textContent == "O" && data[4].textContent == "O" && data[5].textContent == "O")
		|| (data[6].textContent == "O" && data[7].textContent == "O" && data[8].textContent == "O")
		|| (data[0].textContent == "O" && data[3].textContent == "O" && data[6].textContent == "O")
		|| (data[1].textContent == "O" && data[4].textContent == "O" && data[7].textContent == "O")
		|| (data[2].textContent == "O" && data[5].textContent == "O" && data[8].textContent == "O")
		|| (data[0].textContent == "O" && data[4].textContent == "O" && data[8].textContent == "O")
		|| (data[2].textContent == "O" && data[4].textContent == "O" && data[6].textContent == "O")) {
			winner = "O";
			winnerBlock.textContent = `Player ${winner} has Won!`;
			hasWonBool = true;
			posArray.forEach((i) => {
				i.classList.add("won");
				return;
		})
	}

	if (fullGrid === true && hasWonBool === false) {
		winnerBlock.textContent = `It's a Tie!`;
		posArray.forEach((i) => {
			i.classList.add("won");
		})
		hasWonBool = true;
		return;
	}
}

const resetGame = () => {
	hasWonBool = false;
	posArray.forEach((i) => {
		i.classList.remove("won");
		})
	posArray.forEach((i) => {
		i.textContent = "";
	})
	winnerBlock.textContent = "";
	winnerBlock.textContent = "";
}

const areaTotal = document.querySelector(".main-grid");
const playerTurn = document.createElement("h2");
playerTurn.textContent = "Player:";
console.log(typeof playerTurn);


areaTotal.addEventListener("click", play);
resetButton.addEventListener("click", resetGame);