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

// Recibe un operador y dos números, y devuelve el resultado de la operación que corresponde (suma, resta, multiplicación o división)
function operate(operator, a, b) {
	if (operator === "+") {
		return add(a, b);
	} else if (operator === "-") {
		return subtract(a, b);
	} else if (operator === "*") {
		return multiply(a, b);
	} else if (operator === "/") {
		return divide(a, b);
	}
}

// Reduce el tamaño de letra de una caja hasta que el texto cabe en una línea
function fitText(element, baseSize) {
	let size = baseSize;
	element.style.fontSize = size + "rem";

	while (element.scrollWidth > element.clientWidth && size > 1) {
		size -= 0.1;
		element.style.fontSize = size + "rem";
	}
}

const display = document.querySelector("#display");
const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const resultBox = document.querySelector("#result");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");

let firstNumber = 0;
let operatorResult = "";
let currentNumber = "";
let endOperate = false;

// Al pulsar un dígito: si ya se pulsó igual (endOperate es true) no hace nada; si es un punto y el número está vacío o ya tiene uno, tampoco; si no, lo añade a la pantalla y al número que se está escribiendo (currentNumber)
digitButtons.forEach((digitButton) => {

	digitButton.addEventListener("click", function () {
		if (endOperate === true) {
			return;
		}

		if (digitButton.dataset.value === "." && (currentNumber === "" || currentNumber.includes("."))) {
			return;
		}

		display.textContent += digitButton.dataset.value;
		currentNumber += digitButton.dataset.value;
		fitText(display, 2.5);
	});
});

// Al pulsar un operador: si la pantalla está vacía no hace nada; si se pulsa un operador tras otro, sustituye el anterior; si hay una operación pendiente la calcula; guarda el operador y lo añade a la pantalla
operatorButtons.forEach((operatorButton) => {
	operatorButton.addEventListener("click", function () {

		if (display.textContent === "") return;
		if (currentNumber === "") {
			display.textContent = display.textContent.slice(0, -1);
		}

		if (operatorResult !== "" && currentNumber !== "") {
			firstNumber = operate(operatorResult, firstNumber, Number(currentNumber));
			currentNumber = "";
		} else if (currentNumber !== "") {
			firstNumber = Number(currentNumber);
			currentNumber = "";
		}

		operatorResult = operatorButton.dataset.value;
		display.textContent += operatorButton.textContent;
		fitText(display, 2.5);
	});
});

// Al pulsar igual: sin operador no hace nada; si divide entre cero avisa; si ya se pulsó igual no repite; si no, calcula con operate, muestra el resultado y bloquea los dígitos (endOperate)
equalButton.addEventListener("click", function () {

	if (operatorResult === "") {
		return;
	}

	if (operatorResult === "/" && Number(currentNumber) === 0) {
		resultBox.textContent = "No se puede dividir entre cero";
		fitText(resultBox, 3);
		return;
	}

	if (endOperate === true) {
		return;
	}

	display.textContent += "=";
	resultBox.textContent = operate(operatorResult, firstNumber, Number(currentNumber));
	endOperate = true;
	fitText(display, 2.5);
	fitText(resultBox, 3);
});

// Al pulsar clear: vacía la pantalla y el resultado, y devuelve todas las variables a su valor inicial (incluido endOperate, para poder escribir dígitos otra vez)
clearButton.addEventListener("click", function () {
	display.textContent = "";
	resultBox.textContent = "";
	firstNumber = 0;
	operatorResult = "";
	currentNumber = "";
	endOperate = false;
	fitText(display, 2.5);
	fitText(resultBox, 3);
});

// Al pulsar borrar: si ya se pulsó igual o no hay un número escrito no hace nada; si no, quita el último dígito de la pantalla y de currentNumber
deleteButton.addEventListener("click", function () {
	if (endOperate === true) {
		return;
	}
	if (currentNumber === "") {
		return;
	}

	display.textContent = display.textContent.slice(0, -1);
	currentNumber = currentNumber.slice(0, -1);
	fitText(display, 2.5);
});

// Al pulsar una tecla: si coincide con el data-value de un botón (dígitos, operadores y punto) hace clic en él; Enter hace clic en igual, Backspace en borrar y Escape en clear
document.addEventListener("keydown", function (event) {

	const button = document.querySelector(`[data-value="${event.key}"]`);

	if (button !== null) {
		button.click();
	}
	if (event.key === "Enter") {
		equalButton.click();
	}
	if (event.key === "Backspace") {
		deleteButton.click();
	}
	if (event.key === "Escape") {
		clearButton.click();
	}
});