import animalSort from './animalSort';
import reporter from '@testomatio/reporter';
import {log} from '@testomatio/reporter';

describe('animalSort', () => {
  it('should also return sorted names of animals with same number of legs', () => {
    reporter.log('This is a log message');
    log('This is a warning message');
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
