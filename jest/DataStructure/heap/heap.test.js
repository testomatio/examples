import MaxBinaryHeap from './heap';

describe('Max binary heap', () => {
  it('Should insert into max heap', () => {
    const maxHeap = new MaxBinaryHeap();
    maxHeap.insert(30);
    maxHeap.insert(31);
    maxHeap.insert(45);
    maxHeap.insert(10);
    maxHeap.insert(100);

    expect(maxHeap.values).toStrictEqual([100, 45, 31, 10, 30]);
  });

  it('Should extract from max heap', () => {
    const maxHeap = new MaxBinaryHeap();
    maxHeap.insert(30);
    maxHeap.insert(31);
    maxHeap.insert(45);
    maxHeap.insert(10);
    maxHeap.insert(100);
    maxHeap.insert(20);

    expect(maxHeap.values).toStrictEqual([100, 45, 31, 10, 30, 20]);
    expect(maxHeap.extractMax()).toBe(100);
    expect(maxHeap.values).toStrictEqual([45, 30, 31, 10, 20]);
  });
});
