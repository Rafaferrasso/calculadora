// script.js

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const display = document.querySelector('.result');
    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                if (resultDisplayed) {
                    currentInput = value;
                    resultDisplayed = false;
                } else {
                    if (currentInput === '0') {
                        currentInput = value;
                    } else {
                        currentInput += value;
                    }
                }
            } else if (button.classList.contains('operator')) {
                if (value === '=') {
                    if (operator && previousInput !== '') {
                        currentInput = String(operate(previousInput, operator, currentInput));
                        operator = '';
                        previousInput = '';
                        resultDisplayed = true;
                    }
                } else {
                    if (previousInput === '') {
                        previousInput = currentInput;
                        currentInput = '0';
                    } else if (operator && !resultDisplayed) {
                        previousInput = String(operate(previousInput, operator, currentInput));
                        currentInput = '0';
                    }
                    operator = value;
                }
            } else if (button.classList.contains('function')) {
                if (value === 'AC') {
                    currentInput = '0';
                    operator = '';
                    previousInput = '';
                } else if (value === '+/-') {
                    currentInput = String(currentInput * -1);
                } else if (value === '%') {
                    currentInput = String(currentInput / 100);
                }
            }

            display.textContent = currentInput;
        });
    });

    function operate(num1, operator, num2) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return a / b;
            default:
                return b;
        }
    }
});
