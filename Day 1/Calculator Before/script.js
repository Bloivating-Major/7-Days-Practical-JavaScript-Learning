const numbers = document.querySelectorAll('[data-number]');

const operators = document.querySelectorAll('[data-operation]');

const clearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');

const secondaryOperand = document.querySelector('[data-secondary-operand]');
const primaryOperand = document.querySelector('[data-primary-operand]');

numbers.forEach(number => {
  number.addEventListener('click', () => {
    primaryOperand.textContent += number.textContent;
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    secondaryOperand.textContent = primaryOperand.textContent;
    primaryOperand.textContent = '';
    document.querySelector('[data-operation]').textContent = operator.textContent;
  });
});

equalsBtn.addEventListener('click', () => {
  const prev = parseInt(secondaryOperand.textContent);
  const current = parseInt(primaryOperand.textContent);
  const operation = document.querySelector('[data-operation]').textContent;

  let result;
  switch(operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }

  primaryOperand.textContent = result;
  secondaryOperand.textContent = '';
  document.querySelector('[data-operation]').textContent = '';
});

clearBtn.addEventListener('click', () => {
  primaryOperand.textContent = '';
  secondaryOperand.textContent = '';
  document.querySelector('[data-operation]').textContent = '';
});

deleteBtn.addEventListener('click', () => {
  primaryOperand.textContent = primaryOperand.textContent.slice(0, -1);
});
