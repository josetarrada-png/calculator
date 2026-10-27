function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;	
}

function operate(operator, a, b) {
	if (operator === "+") {
		return add(a, b);
	}else if (operator === "-"){
		return subtract(a, b);
	}else if (operator === "*"){
		return multiply(a, b);
	} else if (operator === "/"){
		return divide(a, b);
	}
}

const display = document.getElementById("display");
const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const resultBox = document.querySelector("#result");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");

let firstNumber = 0;
let operatorResult = "";
let currentNumber = "";
let endOperate = false;


// Al pulsar un dígito: se añade a la pantalla y al número que se está escribiendo (currentNumber)
digitButtons.forEach((digitButton) => {
	
	digitButton.addEventListener("click", function () {	
		if(endOperate === true) {
		return;
	}	
		display.textContent += digitButton.dataset.value;
		currentNumber += digitButton.dataset.value;
	} )	
});

// Al pulsar un operador: calcula la operación pendiente si la hay, guarda el operador y lo añade a la pantalla
operatorButtons.forEach((operatorButton) => {
	operatorButton.addEventListener("click", function () {

		if (display.textContent === "") return;
		if (currentNumber === "") {
			display.textContent = display.textContent.slice(0, -1);
		}	

		if(operatorResult !== "" && currentNumber !== ""){
			firstNumber = operate(operatorResult, firstNumber, Number(currentNumber));
			currentNumber = "";
		}else if (currentNumber !=="" ){
			firstNumber = Number(currentNumber);
			currentNumber = "";
		}					

		operatorResult = operatorButton.dataset.value;		
		display.textContent += operatorResult;
		
	})
});

// Al pulsar igual: sin operador no hace nada; si divide entre cero avisa; si ya se pulsó igual no repite; si no, calcula con operate, muestra el resultado y bloquea los dígitos (endOperate)
equalButton.addEventListener("click", function () {	

	if(operatorResult === ""){
		return;
	}

	if (operatorResult === "/" && Number(currentNumber) === 0) {
		resultBox.textContent = "No se puede dividir entre cero";
		return;
  	}

	if (endOperate === true){
			return;
	}

  	display.textContent += "=";
	resultBox.textContent = operate(operatorResult, firstNumber, Number(currentNumber));
	endOperate = true;	
});

clearButton.addEventListener("click", function () {
	display.textContent = "";
	resultBox.textContent = "";
	firstNumber = 0;
	operatorResult = ""; 
	currentNumber = "";
	endOperate = false;
});







