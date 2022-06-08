const add = (a,b) => a+b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b;

const operator = (a, b, operator) => {
    return  operator === '+' ? add(a,b) :
            operator === '-' ? subtract(a,b) :
            operator === '*' ? multiply(a,b) :
            operator === '/' ? divide(a,b) : 'Invalid operator';
};

function updateDisplayValue (value) {
    displayValue.textContent += value;
}

let displayValue = document.querySelector('#display');

let buttons = document.querySelectorAll('.operator');

buttons.forEach(button => {
        button.addEventListener('click', () => {
        updateDisplayValue(button.id)
    })
})

// let a = 5;
// let b = 2;
// console.log(add(a,b));
// console.log(subtract(a,b));
// console.log(multiply(a,b));
// console.log(divide(a,b));
// console.log(operator(a, b, '+'));
// console.log(operator(a, b, '-'));
// console.log(operator(a, b, '*'));
// console.log(operator(a, b, '/'));
// console.log(operator(a, b, '='));