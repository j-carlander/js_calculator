let btnContainer = document.querySelector('.btn-container');
let btnToolbar = document.querySelector('.btn-toolbar');

let display = document.querySelector('.display');
let historyDisplay = document.querySelector('.history');

let symbols = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '.', 0, '=', '/'];

let tools = ['(', ')', 'Undo', 'Clear'];

function handleSymbolClick(symbol) {
    if (symbol == '=') {
        // If "=" is pressed, evaluate the expression in display
        let result = eval(display.innerText); //store the result
        historyDisplay.innerText = display.innerText + symbol;
        display.innerText = result; // Display the expression and result
    } else if (historyDisplay.innerText) {
        display.innerText = '';
        historyDisplay.innerText = '';
        display.innerText = display.innerText + symbol;
    } else {
        display.innerText = display.innerText + symbol; // display the expression
    }
}

function handleToolbarClick(tool) {
    if (tool == 'Undo') {
        if (historyDisplay.innerText) {
            // display.innerText.includes('=')
            //checks if display.innertext is evaluated (contains "=")
            display.innerText = historyDisplay.innerText.slice(0, -1); //let index = display.innerText.indexOf('='); // finds index of "="
            historyDisplay.innerText = ''; //display.innerText = display.innerText.slice(0, index); // Clears the evaluated result
        } else {
            // return everthing but the last character from display.innertext to display.innertext
            display.innerText = display.innerText.slice(0, -1);
        }
    } else if (tool == 'Clear') {
        display.innerText = '';
        historyDisplay.innerText = ''; // Clears what is displayed
    } else {
        display.innerText = display.innerText + tool;
    }
}

function createSymbolButton(symbol) {
    let button = document.createElement('button');
    button.innerText = symbol;
    button.classList.add('btn', 'symbol-btn');
    if (isNaN(symbol) && symbol != '.') {
        button.classList.add('operation-btn');
    }
    // Add a listener to every symbol button to be created
    button.addEventListener('click', (event) => {
        handleSymbolClick(symbol);
    });

    return button;
}

function createToolButton(tool) {
    let button = document.createElement('button');
    button.innerText = tool;
    button.classList.add('btn', 'tool-btn');

    button.addEventListener('click', (event) => {
        handleToolbarClick(tool);
    });

    return button;
}

function appendSymbolButtons(container) {
    for (let symbol of symbols) {
        container.append(createSymbolButton(symbol));
    }
}
function appendToolButtons(container) {
    for (let tool of tools) {
        container.append(createToolButton(tool));
    }
}

function updateDisplay() {}

//Create everything to do with the calculator
function initializeCalculator() {
    appendSymbolButtons(btnContainer);
    appendToolButtons(btnToolbar);
}

initializeCalculator();
