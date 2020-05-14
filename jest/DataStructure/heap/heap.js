const swap = (arr, id1, id2) => {
  [arr[id1], arr[id2]] = [arr[id2], arr[id1]];
};

const getParentId = id => Math.floor((id - 1) / 2);

const getChildId = id => (2 * id) + 1;

export default class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    let currentIndex = this.values.length - 1;

    // Bubble up
    while (getParentId(currentIndex) >= 0) {
      const parentIndex = getParentId(currentIndex);
      if (this.values[parentIndex] < this.values[currentIndex]) {
        swap(this.values, parentIndex, currentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMax() {
    if (!this.values.length) return null;
    const value = this.values.shift();
    this.values.unshift(this.values.pop());

    // Bubble down
    let index = 0;
    while (index < this.values.length - 1) {
      const childId = getChildId(index);
      const parent = this.values[index];
      const childOne = this.values[childId];
      const childTwo = this.values[childId + 1];

      if (childOne > parent || childTwo > parent) {
        if (childOne > childTwo) {
          swap(this.values, index, childId);
          index = childId;
        } else {
          swap(this.values, index, childId + 1);
          index = childId;
        }
      } else break;
    }
    return value;
  }
}
