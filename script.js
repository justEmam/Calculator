// Function to add two numbers
function add(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
}

// Function to multiply two numbers
function multiply(n1, n2) {
    return parseFloat(n1) * parseFloat(n2);
}

// Function to divide two numbers
function divide(n1, n2) {
    return parseFloat(n1) / parseFloat(n2);
}

// Function to subtract two numbers
function subtract(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
}

// Function to perform the appropriate operation based on the operator
function operate(n1, n2, operator) {
    switch (operator) {
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case '/':
            return divide(n1, n2);
        case '*':
            return multiply(n1, n2);
        default:
            return null; // Handle any unknown operator
    }
}

// Select all buttons and other UI elements
const allButtons = document.querySelectorAll('button');
const equalButton = document.querySelector('#equal');
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const allOperatorButtons = document.querySelectorAll('.operatornoeq');
const clearbtn = document.querySelector('#clear');
const delbtn = document.querySelector('#del');
const pointbtn = document.querySelector('#point');

// Initialize display value and operands
let displayVal = '';
let n1 = '';
let n2 = '';
let operator = '';

const keyBackGroundColor = 'hsl(185, 42%, 37%)';

// Function to handle displaying values and setting up button event listeners
function displayValue() {
    // Add click event listeners to number buttons
    numberButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.target.style.backgroundColor = 'pink'; // Change color on click
            setTimeout(() => {
                e.target.style.backgroundColor = keyBackGroundColor; // Change back to original color
            }, 200);
            displayVal += e.target.textContent; // Update displayVal with button text
            display.textContent = displayVal; // Update the display
        });
    });

    // Add click event listeners to operator buttons
    allOperatorButtons.forEach(operatorbtn => {
        operatorbtn.addEventListener('click', (e) => {
            e.target.style.backgroundColor = 'pink'; // Change color on click
            setTimeout(() => {
                e.target.style.backgroundColor = keyBackGroundColor; // Change back to original color
            }, 200);
            
            // Handle negative number support
            if (displayVal === '' && e.target.textContent === '-') {
                displayVal += e.target.textContent;
                display.textContent += displayVal;
            } else {
                if (displayVal !== '') {
                    // If there is an existing n1, perform the operation
                    if (n1 !== '' && operator !== '' && n2 === '') {
                        n2 = displayVal; // Set n2 to the current displayVal
                        displayVal = operate(n1, n2, operator); // Perform the operation
                        if (displayVal === Infinity) {
                            displayVal = "cant divide by zero"; // Handle division by zero
                            display.textContent = displayVal;
                        } else {
                            display.textContent = displayVal; // Update the display
                            n1 = displayVal; // Update n1 for the next operation
                            n2 = '';
                            displayVal = ''; // Reset displayVal
                        }
                    } else {
                        // First operator input
                        n1 = displayVal; // Set n1 to the current displayVal
                        displayVal = ''; // Reset displayVal for next input
                    }
                    operator = e.target.textContent; // Update the operator
                    console.log('Current operator:', operator);
                }
            }
        });
    });
}

// Event listener for the equals button
equalButton.addEventListener('click', () => {
    if (n1 !== '' && displayVal !== '' && operator !== '') {
        n2 = displayVal; // Set n2 to the current displayVal
        displayVal = operate(n1, n2, operator); // Perform the operation
        if (displayVal === Infinity) {
            displayVal = "cant divide by zero"; // Handle division by zero
            display.textContent = displayVal;
        } else {
            display.textContent = displayVal; // Update the display
            // Reset for next calculation
            n1 = displayVal;
            n2 = '';
            operator = '';
        }
    }
});

// Clear button event listener
clearbtn.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'pink'; // Change to pink
    displayVal = ''; // Clear displayVal
    display.textContent = ''; // Clear display

    setTimeout(() => {
        e.target.style.backgroundColor = keyBackGroundColor; // Change back to the original color
    }, 200);
});

// Delete button event listener
delbtn.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'pink'; // Change color on click
    setTimeout(() => {
        e.target.style.backgroundColor = keyBackGroundColor; // Change back to the original color
    }, 200);
    // Remove the last character from displayVal
    stringDisplay = displayVal.toString();
    displayVal = stringDisplay.substring(0, stringDisplay.length - 1);
    display.textContent = displayVal; // Update the display
});

// Point button event listener
pointbtn.addEventListener('click', (e) => {
    stringDisplay = displayVal.toString();
    // Only allow one decimal point
    if (stringDisplay.split('').includes('.') === false) {
        e.target.style.backgroundColor = 'pink'; // Change color on click
        setTimeout(() => {
            e.target.style.backgroundColor = keyBackGroundColor; // Change back to the original color
        }, 200);
        displayVal += e.target.textContent; // Add point to displayVal
        display.textContent = displayVal; // Update the display
    }
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const targetBtn = Array.from(allButtons).find(btn => btn.textContent === e.key);
    if (targetBtn) {
        targetBtn.click(); // Simulate button click for the pressed key
    }
});

// Initialize the display value handling
displayValue();
