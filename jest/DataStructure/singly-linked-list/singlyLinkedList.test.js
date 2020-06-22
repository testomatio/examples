import SinglyLinkedList from './singlyLinkedList';

describe('Singly Linked List', () => {
  it('Should push a value to list', () => {
    const list = new SinglyLinkedList();

    list.push('Hello');
    list.push('how');
    expect(list.head.value).toBe('Hello');
    expect(list.head.next.value).toBe('how');
    expect(list.tail.value).toBe('how');
    expect(list.length).toBe(2);
  });

  it('Should pop a value from list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    expect(list.pop()).toBe('you');
    expect(list.pop()).toBe('are');
    expect(list.length).toBe(2);
    expect(list.pop()).toBe('how');
    expect(list.pop()).toBe('Hello');
    expect(list.pop()).toBe(null);
    expect(list.length).toBe(0);
  });

  it('Should shift a value from list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    expect(list.shift()).toBe('Hello');
    expect(list.shift()).toBe('how');
    expect(list.length).toBe(2);
    expect(list.shift()).toBe('are');
    expect(list.shift()).toBe('you');
    expect(list.shift()).toBe(null);
    expect(list.length).toBe(0);
    expect(list.tail).toBe(null);
    list.push('you');
    expect(list.pop()).toBe('you');
  });

  it('Should unshift a value from list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('how');
    list.unshift('Hello');

    expect(list.length).toBe(2);
    expect(list.pop()).toBe('how');
    expect(list.pop()).toBe('Hello');

    list.unshift('Hello');
    expect(list.length).toBe(1);
  });

  it('Should get a value from list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    expect(list.get(0).value).toBe('Hello');
    expect(list.get(1).value).toBe('how');
    expect(list.get(2).value).toBe('are');
    expect(list.get(-1)).toBe(null);
    expect(list.get(4)).toBe(null);
  });

  it('Should set a value of a node in list', () => {
    const list = new SinglyLinkedList();

    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    expect(list.set(1, 'How')).toBe(true);
    expect(list.get(1).value).toBe('How');
    expect(list.set(-1, 'How')).toBe(false);
  });

  it('Should insert a value in a postion of list', () => {
    const list = new SinglyLinkedList();

    list.push('Hello');
    list.push('are');
    list.push('you');

    expect(list.length).toBe(3);
    expect(list.insert(1, 'How')).toBe(true);

    expect(list.length).toBe(4);
    expect(list.get(1).value).toBe('How');

    expect(list.insert(0, 'Hey')).toBe(true);
    expect(list.length).toBe(5);

    expect(list.insert(5, '?')).toBe(true);
    expect(list.length).toBe(6);

    expect(list.get(0).value).toBe('Hey');
    expect(list.get(5).value).toBe('?');
    expect(list.insert(-1, 'How')).toBe(false);
    expect(list.insert(8, 'How')).toBe(false);
  });

  it('Should remove a node from list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    expect(list.remove(1)).toBe('how');
    expect(list.get(1).value).toBe('are');
    expect(list.length).toBe(3);
    expect(list.remove(2)).toBe('you');
    expect(list.remove(0)).toBe('Hello');
    expect(list.length).toBe(1);
  });

  it('Should reverse singly linked list', () => {
    const list = new SinglyLinkedList();

    expect(list.pop()).toBe(null);
    list.push('Hello');
    list.push('how');
    list.push('are');
    list.push('you');

    list.reverse();
    expect(list.get(1).value).toBe('are');

  });
});
