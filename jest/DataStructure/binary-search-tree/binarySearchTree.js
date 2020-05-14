class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    const insertNode = (newNode, currentNode) => {
      if (currentNode.value > newNode.value) {
        currentNode.left = currentNode.left ? insertNode(newNode, currentNode.left) : newNode;
      } else {
        currentNode.right = currentNode.right ? insertNode(newNode, currentNode.right) : newNode;
      }
      return currentNode;
    };

    if (!this.root) {
      this.root = node;
    } else {
      insertNode(node, this.root);
    }

    return this;
  }

  find(value) {
    const findNode = node => {
      if (!node) return null;
      if (node.value === value) return node;
      if (node.value > value) return findNode(node.left);
      return findNode(node.right);
    };

    return findNode(this.root);
  }

  breathFirstSearch() {
    if (!this.root) return [];

    const data = [];
    const queue = [];
    let node = null;
    queue.push(this.root);
    while (queue.length) {
      node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      data.push(node.value);
    }

    return data;
  }

  depthFirstSearchPre() {
    if (!this.root) return [];
    const data = [];
    const traverse = node => {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);

    return data;
  }

  depthFirstSearchPost() {
    if (!this.root) return [];
    const data = [];
    const traverse = node => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    };

    traverse(this.root);

    return data;
  }

  depthFirstSearchPostIn() {
    if (!this.root) return [];
    const data = [];
    const traverse = node => {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);

    return data;
  }
}

export default BinarySearchTree;
