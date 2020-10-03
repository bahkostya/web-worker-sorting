export default function insertionSort(
  array,
  startIndex = 1,
  chunk = array.length - 1
) {
  const length =
    startIndex + chunk > array.length ? array.length : startIndex + chunk;

  for (let i = startIndex; i < length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }

  return array;
}
