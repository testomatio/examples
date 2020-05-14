class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;

    return this;
  }

  pop() {
    if (this.length === 0) {
      return null;
    }

    let current = this.head;
    let previous = current;

    while (current.next) {
      previous = current;
      current = current.next;
    }
    this.tail = previous;
    this.tail.next = null;
    this.length -= 1;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current.value;
  }

  shift() {
    if (!this.head) {
      return null;
    }
    const { value } = this.head;
    this.head = this.head.next;
    this.length -= 1;
    if (this.length === 0) {
      this.tail = null;
    }
    return value;
  }

  unshift(value) {
    if (!this.head) {
      this.push(value);
    } else {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
      this.length += 1;
    }

    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter += 1;
    }

    return current;
  }

  set(index, value) {
    const node = this.get(index);
    if (!node) {
      return false;
    }
    node.value = value;
    return true;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      this.unshift(value);
    } else if (index === this.length) {
      this.push(value);
    } else {
      const newNode = new Node(value);
      const prevNode = this.get(index - 1);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length += 1;
    }

    return true;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index === 0) return this.shift(0);
    if (index === this.length - 1) return this.pop();
    const previous = this.get(index - 1);
    const { value } = previous.next;
    previous.next = previous.next.next;
    this.length -= 1;
    return value;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    for (let i = 0; i < this.length; i += 1) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
}

export default SinglyLinkedList;

// 1 2 3 4
// 1 null