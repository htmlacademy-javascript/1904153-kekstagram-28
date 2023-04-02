const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateUniqValue = (minElement, maxElement) => {
  const previousValues = [];
  return () => {
    let value = getRandomInteger(minElement, maxElement);
    if (previousValues.length >= maxElement) {
      return null;
    }
    while (previousValues.includes(value)) {
      value = getRandomInteger(minElement, maxElement);
    }
    previousValues.push(value);
    return value;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '500';
  alert.style.let = '0';
  alert.style.top = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
};

export { getRandomInteger, getRandomArrayElement, generateUniqValue, isEscapeKey, showAlert };
