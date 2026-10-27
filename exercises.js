
// const choiceButtons = document.querySelectorAll(".buttons-container");

const { createElement } = require("react");

// choiceButtons.forEach((button) => {
// 	button.addEventListener("click", () => {
// 		let humanChoice = button.dateset.choice;
// 		let computerChoice = getComputerChoice();
// 		playRound(humanChoice, computerChoice)
// 	});
// });



function showComputerChoice(choice) {
	const computerChoice = document.querySelector(".computer-choice");
	computerChoice.textContent = "";
	const img = document.createElement("img");
	img.src = `images/${choice}.png`;
	img.alt = "";
	computerChoice.appendChild(img);
}