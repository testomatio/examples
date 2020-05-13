/**
 * @param {Array} array
 */
export const bubbleSort = array => {
  for (let i = array.length; i >= 0; i -= 1) {
    let swapped = false;
    for (let j = 0; j < i - 1; j += 1) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }

  return array;
};

/**
 * @param {Array} array
 */
export const selectionSort = array => {
  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j += 1) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    if (array[i] >= array[minIndex]) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
};

/**
 * @param {Array} array
 */
export const insertionSort = array => {
  for (let i = 1; i < array.length; i += 1) {
    const currentValue = array[i];
    let j = i - 1;
    for (; j >= 0 && array[j] > currentValue; j -= 1) {
      array[j + 1] = array[j];
    }
    array[j + 1] = currentValue;
  }
  return array;
};

/**
 * @param {Array} firstArray
 * @param {Array} secondArray
 */
export const mergeSortedArray = (firstArray = [], secondArray = []) => {
  const resultArray = [];
  let firstPoint = 0;
  let secondPoint = 0;
  while (firstPoint < firstArray.length && secondPoint < secondArray.length) {
    if (firstArray[firstPoint] < secondArray[secondPoint]) {
      resultArray.push(firstArray[firstPoint]);
      firstPoint += 1;
    } else {
      resultArray.push(secondArray[secondPoint]);
      secondPoint += 1;
    }
  }
  while (firstPoint < firstArray.length) {
    resultArray.push(firstArray[firstPoint]);
    firstPoint += 1;
  }
  while (secondPoint < secondArray.length) {
    resultArray.push(secondArray[secondPoint]);
    secondPoint += 1;
  }

  return resultArray;
};

/**
 * @param {Array} array
 */
export const mergeSort = array => {
  if (array.length <= 1) return array;
  const half = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, half));
  const right = mergeSort(array.slice(half));

  return mergeSortedArray(left, right);
};


export const pivotHelper = (arr, start = 0, end = arr.length - 1) => {
  const swap = (array, idx1, idx2) => {
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  };

  // We are assuming the pivot is always the first element
  const pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i += 1) {
    if (pivot > arr[i]) {
      swapIdx += 1;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
};
