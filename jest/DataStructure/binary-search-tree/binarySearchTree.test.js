import BinarySearchTree from './binarySearchTree';

describe('Binary Search tree', () => {
  it('Should insert values in BST', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);

    expect(bst.root.value).toBe(5);
    expect(bst.root.right.left.value).toBe(7);
    expect(bst.root.left.value).toBe(3);
    expect(bst.root.left.right.value).toBe(4);
  });

  it('Should find values in BST', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);

    expect(bst.find(6)).toBe(null);
    expect(bst.find(4).value).toBe(4);
    expect(bst.find(7).value).toBe(7);
  });

  it('Should apply breath first search', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);

    expect(bst.breathFirstSearch()).toStrictEqual([5, 3, 8, 4, 7]);
  });

  it('Should apply depth first search pre order', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);
    bst.insert(2);

    expect(bst.depthFirstSearchPre()).toStrictEqual([5, 3, 2, 4, 8, 7]);
  });

  it('Should apply depth first search post order', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);
    bst.insert(2);

    expect(bst.depthFirstSearchPost()).toStrictEqual([2, 4, 3, 7, 8, 5]);
  });

  it('Should apply depth first search in order', () => {
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(8);
    bst.insert(9);
    bst.insert(7);
    bst.insert(3);
    bst.insert(4);
    bst.insert(2);

    expect(bst.depthFirstSearchPostIn()).toStrictEqual([2, 3, 4, 5, 7, 8, 9]);
  });
});
