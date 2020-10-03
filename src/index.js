import { MESSAGES } from './messages';
import { generateArray, getRandomInt, isSorted } from './utils';

let numberAddIntervalID;
let addedNumbers = [];

const myWorker = new Worker('dist/worker.js');

myWorker.onmessage = function ({ data }) {
  switch (data.type) {
    case MESSAGES.FINISH: {
      clearInterval(numberAddIntervalID);

      const { time, array } = data.payload;
      renderResults(time, array);
      break;
    }

    case MESSAGES.NUMBER_ADDED: {
      addedNumbers.push(data.payload);
      break;
    }

    default:
      break;
  }
};

const resultsElement = document.getElementById('results');
const startButton = document.getElementById('start-sorting');
startButton.addEventListener('click', handleStartClick);

const loadingIndicator = document.createElement('p');
loadingIndicator.innerText = 'Loading...';

function handleStartClick() {
  addedNumbers = [];

  resultsElement.innerHTML = '';
  startButton.setAttribute('disabled', true);
  resultsElement.appendChild(loadingIndicator);

  myWorker.postMessage({ type: MESSAGES.START, payload: generateArray() });

  const interval = parseInt(document.getElementById('interval-input').value, 10);

  numberAddIntervalID = setInterval(() => {
    myWorker.postMessage({
      type: MESSAGES.ADD_NUMBER,
      payload: getRandomInt(),
    });
  }, interval);
}

function renderResults(time, array) {
  const sortingCheckElement = document.createElement('p');
  sortingCheckElement.innerText = `Sorting successful: ${isSorted(array)}.`;

  const sortingTimeElement = document.createElement('p');
  sortingTimeElement.innerHTML = `Insertion sort took <b>${time} ms</b>`;

  const listHeading = document.createElement('p');
  listHeading.innerText = `Time of processing ${addedNumbers.length} added numbers:`;

  const listElement = document.createElement('ul');
  addedNumbers.forEach((addedNumber) => {
    const listItemElement = document.createElement('li');
    listItemElement.innerText = `${addedNumber.number} - ${addedNumber.time} ms`;
    listElement.appendChild(listItemElement);
  });

  startButton.removeAttribute('disabled');
  loadingIndicator.remove();
  resultsElement.appendChild(sortingCheckElement);
  resultsElement.appendChild(sortingTimeElement);
  resultsElement.appendChild(listHeading);
  resultsElement.appendChild(listElement);
}
