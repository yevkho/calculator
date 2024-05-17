
// 1. basic math functions 
function add (a, b) {
    return a + b;
}
function subtract (a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    return a / b;
}

// 2. core variables 
let a = "";
let ops = "";
let b = "";
let solution = "";
let displayValue = "";
let displayArray = [];

let display = document.querySelector("#display");
let numbers = document.querySelector(".numbers");
let zero = document.querySelector("[id='0']");
let decimal = document.querySelector("[id='.']");
let operators = document.querySelector(".operators");
let clear = document.querySelector("#clear");
let backspace = document.querySelector("#back");


// 3. the operate function
function operate (ops, a, b) {
    let solution = "";    
    if (ops == "+") {
        solution = add(a, b);
    } else if (ops == "-") {
        solution = subtract(a,b);
    } else if (ops == "*") {
        solution = multiply (a,b);
    } else if (ops == "/") {
        if (b === 0) {
            return solution = "No Way Jose";
        } else {
        solution = divide(a,b);
        }
    }   
    solution = Number(solution.toString() //prevent 'solution' from overflowing display
                          .split("")
                          .slice(0,9)
                          .join(""))
    
    solution = Math.round(solution*1000000)/1000000; 
    return solution
}

// 5. display and store numbers
numbers.addEventListener('click', (e) => {
    if (solution) { //clears data after first calculation if 'numbers' is pressed
        clearData();
    }
    
    if (displayArray.length < 9) { //handles display overflow at numbers intake
        if (displayValue == "0" && e.target.id !== ".") { //handles multiple zeros as initial input
            displayValue = ""; 
        } else if (displayValue == "" && e.target.id === ".") { //handles "."" as initial input
            displayValue = "0"; 
        }
    display.textContent = displayValue + e.target.id;
    displayValue = display.textContent;
    decimalHandling ();
    }
})

//5.1 keyboard support
document.addEventListener('keydown', (e) => {
    if (solution) {
        clearData();
    }
    if (e.key >= 0 && e.key <=9 || e.key == ".") {
        if (displayArray.length < 9) {
            display.textContent = displayValue + e.key;
            displayValue = display.textContent;
            decimalHandling ();
            }
        }
})

//5.2 backspace button
backspace.addEventListener('click', backspaceFunction)
function backspaceFunction (e) {
    // display.textContent = display.textContent.toString().slice(0, -1)
    console.log(e)
    if (displayArray.length === 1) {
        clearData();
        displayArray[0] = 0;
        return
    }
    displayArray.pop();
    display.textContent = displayArray.join("");
    displayValue = display.textContent;
    decimalHandling ();
}

//5.3 decimal button
function decimalHandling () {
    displayArray = displayValue.split("");
    if (displayArray.some((item) => item == ".")) {
        decimal.disabled = true;
    } else {
        decimal.disabled = false;
    }
}

//5.4 clear-data button
clear.addEventListener('click', clearData);
function clearData () {
    display.textContent = 0;
    a = "";
    b = "";
    ops = "";
    solution = "";
    displayValue = "";
    displayArray = [];
    decimal.disabled = false;
}

// 6 store core variables (a, b, ops) & operate on them
operators.addEventListener('click', (e) => { //operators: + - * / = 
        if (ops) { //evaluate 'operation' once there is an 'ops' in place
            b = Number(displayValue);
            solution = operate (ops, a, b);
            display.textContent = solution
            displayValue = "";
            ops = "";
            decimalHandling ();
        }
        if (solution === "" && e.target.id !== "=") { //first entry of nr 'a'
            ops = e.target.id;
            a = Number(displayValue);
            displayValue = "";
            displayArray = [];
        } else if (solution !== "" && e.target.id !== "=") { //once 'solution' exists
            a = solution;
            ops = e.target.id;
            solution = "";
            b = "";
            displayValue = "";
        } 
})








