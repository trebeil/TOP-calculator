const add = (a,b) => a+b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b;

const operate = (a, b, operator) => {
    return  operator === '+' ? add(a,b) :
            operator === '-' ? subtract(a,b) :
            operator === '*' ? multiply(a,b) :
            operator === '/' ? divide(a,b) : 'Invalid operator';
};

function updateDisplayValue (value) {
    displayValue.textContent = value;
}

let displayValue = document.querySelector('#display');
let number = '';
let operator = '';
let startNewNumber = true;

document.querySelectorAll('button').forEach(button => {
    if(button.classList.value.split(' ').some(value => value === 'number')) {
        button.addEventListener('click', () => {
            if (startNewNumber === true) {
                displayValue.textContent = '';
                startNewNumber = false;
            };
            updateDisplayValue(displayValue.textContent + button.id);
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'operator')) {
        button.addEventListener('click', () => {
            if (displayValue.textContent === 'Error: dividing by 0') {
                operator = '';
                startNewNumber = true;
            } else if (operator === '') {
                number = displayValue.textContent;
                operator = button.id;
                startNewNumber = true;
            } else {
                if (operator === '/' && displayValue.textContent === '0') {
                    updateDisplayValue('Error: dividing by 0');
                    number = '';
                    operator = '';
                    startNewNumber = true;
                } else {
                    updateDisplayValue(Math.round(operate(number*1, displayValue.textContent*1, operator)*100)/100);
                    number = displayValue.textContent;
                    operator = button.id;
                    startNewNumber = true;
                };
            };
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'equal')) {
        button.addEventListener('click', () => {
            if(number !== '' && operator !== '') {
                if (displayValue.textContent === 'Error: dividing by 0') {
                    operator = '';
                    startNewNumber = true;
                } else if (operator === '/' && displayValue.textContent === '0') {
                    updateDisplayValue(displayValue.textContent = 'Error: dividing by 0');
                    number = '';
                    operator = '';
                    startNewNumber = true;
                } else {
                    updateDisplayValue(displayValue.textContent = Math.round(operate(number*1, displayValue.textContent*1, operator)*100)/100);
                    number = '';
                    operator = '';
                    startNewNumber = true;
                };
            };
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'clear')) {
        button.addEventListener('click', () => {
            updateDisplayValue(displayValue.textContent = '0');
            number = '';
            operator = '';
            startNewNumber = true;
        });
    };
});