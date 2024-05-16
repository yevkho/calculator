
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

// 2. three core variables 
let a = "";
let ops = "";
let b = "";

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
    return Number(solution.toString() //prevent 'solution' from overflowing display
                          .split("")
                          .slice(0,9)
                          .join(""))
}

// 5. display and store numbers
let numbers = document.querySelector(".numbers")
let display = document.querySelector("#display")
let displayValue = ""
let displayArray = [];

numbers.addEventListener('click', (e) => {
    if (solution) { //clears data after first calculation if nr. is pressed
        clearData();
    }
    if (displayArray.length < 9) { //handles display overflow at numbers intake
    display.textContent = displayValue + e.target.id;
    displayValue = display.textContent;
    decimalHandling ();
    }
})

//5.0 dealing with more than one initial '0'
let zero = document.querySelector("[id='0']")
zero.addEventListener('click', () => {
    if (displayArray.length == 1 && displayArray[0] == 0) { 
        displayValue = "";
    }
})

//5.1 keyboard support
document.addEventListener('keydown', (e) => {
    if (solution) {
        clearData();
    }
    if (e.key >= 0 && e.key <=9 || e.key == ".") {
    display.textContent = displayValue + e.key;
    displayValue = display.textContent;
    decimalHandling ();
    }
})

//5.2 backspace button
let backspace = document.querySelector("#back");
backspace.addEventListener('click', () => {
    displayArray.pop();
    display.textContent = displayArray.join("");
    displayValue = display.textContent;
});

//5.3 decimal button
let decimal = document.querySelector("[id='.']")
function decimalHandling () {
    displayArray = displayValue.split("");
    if (displayArray.some((item) => item == ".")) {
        decimal.disabled = true;
    } else {
        decimal.disabled = false;
    }
}

//5.4 clear-data button
let clear = document.querySelector("#clear")
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
let operators = document.querySelector(".operators")
let solution = "";

operators.addEventListener('click', (e) => { //operators: + - * / = 
        if (ops) { //execute 'operation' once there is an 'ops' in place
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








