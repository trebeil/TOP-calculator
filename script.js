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
document.querySelector('.dot').disabled = true;
document.querySelector('.plus').disabled = true;
document.querySelector('.minus').disabled = true;
document.querySelector('.times').disabled = true;
document.querySelector('.divided').disabled = true;
document.querySelector('.equal').disabled = true;

// corrigir: dividindo por 0.0 não está dando erro
document.querySelectorAll('button').forEach(button => {
    if(button.classList.value.split(' ').some(value => value === 'number')) {
        button.addEventListener('click', () => {
            if (startNewNumber === true) {
                displayValue.textContent = '';
                startNewNumber = false;
            };
            updateDisplayValue(displayValue.textContent + button.id);
            document.querySelector('.plus').disabled = false;
            document.querySelector('.minus').disabled = false;
            document.querySelector('.times').disabled = false;
            document.querySelector('.divided').disabled = false;
            document.querySelector('.equal').disabled = false;
            if (displayValue.textContent.includes(".")) {
                document.querySelector('.dot').disabled = true;
            } else {
                document.querySelector('.dot').disabled = false;
            };
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'operator')) {
        button.addEventListener('click', () => {
            if (operator === '') {
                number = displayValue.textContent;
                operator = button.id;
                startNewNumber = true;
            } else {
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
                    document.querySelector('.equal').disabled = true;
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
                if (operator === '/' && displayValue.textContent*1 === 0) {
                    updateDisplayValue(displayValue.textContent = 'Error: dividing by 0');
                    number = '';
                    operator = '';
                    startNewNumber = true;
                    document.querySelector('.dot').disabled = true;
                    document.querySelector('.plus').disabled = true;
                    document.querySelector('.minus').disabled = true;
                    document.querySelector('.times').disabled = true;
                    document.querySelector('.divided').disabled = true;
                    document.querySelector('.equal').disabled = true;
                } else {
                    updateDisplayValue(displayValue.textContent = Math.round(operate(number*1, displayValue.textContent*1, operator)*100)/100);
                    document.querySelector('.dot').disabled = true;
                    number = '';
                    operator = '';
                    startNewNumber = true;
                };
            };
        });
    };
    if(button.classList.value.split(' ').some(value => value === 'clear')) {
        button.addEventListener('click', () => {
            updateDisplayValue(displayValue.textContent = '');
            document.querySelector('.dot').disabled = true;
            document.querySelector('.plus').disabled = true;
            document.querySelector('.minus').disabled = true;
            document.querySelector('.times').disabled = true;
            document.querySelector('.divided').disabled = true;
            document.querySelector('.equal').disabled = true;
            number = '';
            operator = '';
            startNewNumber = true;
        });
    };
});