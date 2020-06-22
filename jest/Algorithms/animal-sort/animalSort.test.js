import animalSort from './animalSort';

describe('animalSort', () => {
  it('should return empty array if empty animal array is passed in', () => {
    expect(animalSort([])).toEqual([]);
  });

  it('should return a sorted array of animal objects by their number of legs', () => {
    const arr = [
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Snake', numberOfLegs: 0 },
    ];
    const result = [
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Dog', numberOfLegs: 4 },
    ];
    expect(animalSort(arr)).toEqual(result);
  });

  it('should also return sorted names of animals with same number of legs', () => {
    const arr = [
      { name: 'Cat', numberOfLegs: 4 },
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Pig', numberOfLegs: 4 },
      { name: 'Human', numberOfLegs: 2 },
      { name: 'Bird', numberOfLegs: 2 },
    ];
    const result = [
      { name: 'Snake', numberOfLegs: 0 },
      { name: 'Bird', numberOfLegs: 2 },
      { name: 'Human', numberOfLegs: 2 },
      { name: 'Cat', numberOfLegs: 4 },
      { name: 'Dog', numberOfLegs: 4 },
      { name: 'Pig', numberOfLegs: 4 },
    ];
    expect(animalSort(arr)).toEqual(result);
  });
});
