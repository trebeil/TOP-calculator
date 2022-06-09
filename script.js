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

function numberClick(value) {
    if (startNewNumber === true) {
        displayValue.textContent = '';
        startNewNumber = false;
    };
    updateDisplayValue(displayValue.textContent + value);
    document.querySelector('.plus').disabled = false;
    document.querySelector('.minus').disabled = false;
    document.querySelector('.times').disabled = false;
    document.querySelector('.divided').disabled = false;
    document.querySelector('.backspace').disabled = false;
    document.querySelector('.equal').disabled = false;
    disableOperators = false;
    disableBackspace = false;
    disableEqual = false;
    if (displayValue.textContent.includes(".")) {
        document.querySelector('.dot').disabled = true;
        disableDot = true;
    } else {
        document.querySelector('.dot').disabled = false;
        disableDot = false;
    };
};

function operatorClick(value) {
    if (operator === '') {
        number = displayValue.textContent;
        operator = value;
        startNewNumber = true;
        document.querySelector('.backspace').disabled = true;
        disableBackspace = true;
    } else if (operator === '/' && displayValue.textContent*1 === 0) {
        updateDisplayValue('Error: dividing by 0');
        number = '';
        operator = '';
        startNewNumber = true;
        document.querySelector('.dot').disabled = true;
        document.querySelector('.plus').disabled = true;
        document.querySelector('.minus').disabled = true;
        document.querySelector('.times').disabled = true;
        document.querySelector('.divided').disabled = true;
        document.querySelector('.backspace').disabled = true;
        document.querySelector('.equal').disabled = true;
        disableDot = true;
        disableOperators = true;
        disableBackspace = true;
        disableEqual = true;
    } else {
        updateDisplayValue(Math.round(operate(number*1, displayValue.textContent*1, operator)*100)/100);
        number = displayValue.textContent;
        operator = value;
        startNewNumber = true;
        document.querySelector('.backspace').disabled = true;
        disableBackspace = true;
    };
};

function equalClick() {
    if(number !== '' && operator !== '') {
        if (operator === '/' && displayValue.textContent*1 === 0) {
            updateDisplayValue('Error: dividing by 0');
            number = '';
            operator = '';
            startNewNumber = true;
            document.querySelector('.dot').disabled = true;
            document.querySelector('.plus').disabled = true;
            document.querySelector('.minus').disabled = true;
            document.querySelector('.times').disabled = true;
            document.querySelector('.divided').disabled = true;
            document.querySelector('.backspace').disabled = true;
            document.querySelector('.equal').disabled = true;
            disableDot = true;
            disableOperators = true;
            disableBackspace = true;
            disableEqual = true;
        } else {
            updateDisplayValue(Math.round(operate(number*1, displayValue.textContent*1, operator)*100)/100);
            document.querySelector('.dot').disabled = true;
            document.querySelector('.backspace').disabled = true;
            disableDot = true;
            disableBackspace = true;
            number = '';
            operator = '';
            startNewNumber = true;
        };
    };
};

function backspaceClick() {
    updateDisplayValue(displayValue.textContent.slice(0,displayValue.textContent.length-1));
    if (displayValue.textContent === '') {
        document.querySelector('.backspace').disabled = true;
        disableBackspace = true;
    };
};

function clearClick() {
    updateDisplayValue('');
    document.querySelector('.dot').disabled = true;
    document.querySelector('.plus').disabled = true;
    document.querySelector('.minus').disabled = true;
    document.querySelector('.times').disabled = true;
    document.querySelector('.divided').disabled = true;
    document.querySelector('.backspace').disabled = true;
    document.querySelector('.equal').disabled = true;
    disableDot = true;
    disableOperators = true;
    disableBackspace = true;
    disableEqual = true;
    number = '';
    operator = '';
    startNewNumber = true;
};

let displayValue = document.querySelector('#display');
let number = '';
let operator = '';
let startNewNumber = true;
document.querySelector('.dot').disabled = true;
document.querySelector('.plus').disabled = true;
document.querySelector('.minus').disabled = true;
document.querySelector('.times').disabled = true;
document.querySelector('.divided').disabled = true;
document.querySelector('.backspace').disabled = true;
document.querySelector('.equal').disabled = true;
let disableDot = true;
let disableOperators = true;
let disableBackspace = true;
let disableEqual = true;

document.querySelectorAll('button').forEach(button => {
    if(button.classList.value.split(' ').some(value => value === 'number')) {
        button.addEventListener('click', () => {
            numberClick(button.id);
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'operator')) {
        button.addEventListener('click', () => {
            operatorClick(button.id);
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'equal')) {
        button.addEventListener('click', equalClick);
    };
    if(button.classList.value.split(' ').some(value => value === 'backspace')) {
        button.addEventListener('click', backspaceClick);
    };
    if(button.classList.value.split(' ').some(value => value === 'clear')) {
        button.addEventListener('click', clearClick);
    };
});

document.addEventListener('keydown', (event) => {
    let name = event.key;
    if (/[0-9]/.test(name)) {numberClick(name)};
    if (disableDot === false && /\./.test(name)) {numberClick(name)};
    if (disableOperators === false && /[\+\-\*\/]/.test(name)) {operatorClick(name)};
    if (disableEqual === false && /(\=|Enter)/.test(name)) {equalClick()};
    if (disableBackspace === false && /Backspace/.test(name)) {backspaceClick()};
    if (/Delete/.test(name)) {clearClick()};
})