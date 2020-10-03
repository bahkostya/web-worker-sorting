import insertionSort from './insertion-sort';

const defaultOptions = { chunkSize: 10000, interval: 250 };

export default class Sorter {
  constructor(array, { chunkSize, interval } = defaultOptions) {
    this.array = array;
    this.chunkSize = chunkSize;
    this.interval = interval;
    this.isPaused = false;
  }

  start(onFinish) {
    const startTime = performance.now();

    let startIndex = 0;

    // setInterval + chunks are used to be able to listen to changes in the array
    const intervalID = setInterval(() => {
      if (!this.isPaused) {
        insertionSort(this.array, startIndex, this.chunkSize);
        startIndex += this.chunkSize;

        if (startIndex >= this.array.length) {
          clearInterval(intervalID);

          if (onFinish)
            onFinish({
              array: this.array,
              time: performance.now() - startTime,
            });
        }
      }
    }, this.interval);
  }

  addNumber(number, onAdd) {
    const startTime = performance.now();
    this.isPaused = true;
    this.array.push(number);
    onAdd({
      number,
      time: performance.now() - startTime,
    });
    this.isPaused = false;
  }
}
