import { bubbleSort, selectionSort, insertionSort, mergeSortedArray, mergeSort } from './sort';

describe('Sorting Algorithms', () => {
  it('Should perform bubble sort the given array', () => {
    expect(bubbleSort([7, 3, 4, 2, 3, 5])).toStrictEqual([2, 3, 3, 4, 5, 7]);
    expect(bubbleSort([6, 5, 4, 3, 2, 1])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(bubbleSort([8, 1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5, 8]);
  });

  it('Should perform selection sort the given array', () => {
    expect(selectionSort([7, 3, 4, 2, 3, 5])).toStrictEqual([2, 3, 3, 4, 5, 7]);
    expect(selectionSort([6, 5, 4, 3, 2, 1])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(selectionSort([8, 1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5, 8]);
  });

  it('Should perform insertion sort the given array', () => {
    expect(insertionSort([7, 3, 4, 2, 3, 5])).toStrictEqual([2, 3, 3, 4, 5, 7]);
    expect(insertionSort([6, 5, 4, 3, 2, 1])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(insertionSort([8, 1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5, 8]);
  });

  it('Should merge sorted Array', () => {
    expect(mergeSortedArray([1, 3, 5, 8], [2, 4, 7, 9, 10, 12]))
      .toStrictEqual([1, 2, 3, 4, 5, 7, 8, 9, 10, 12]);
    expect(mergeSortedArray([], [2, 3])).toStrictEqual([2, 3]);
  });

  it('Should perform merge sort on array', () => {
    expect(mergeSort([7, 3, 4, 2, 3, 5])).toStrictEqual([2, 3, 3, 4, 5, 7]);
    expect(mergeSort([6, 5, 4, 3, 2, 1])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(mergeSort([8, 1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5, 8]);
  });
});
