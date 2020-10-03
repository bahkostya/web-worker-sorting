export function getRandomInt(max = 1_000_000) {
  return Math.floor(Math.random() * (Math.floor(max) + 1));
}

export function generateArray(length = 100_000) {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    arr.push(getRandomInt());
  }
  return arr;
}

export function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
