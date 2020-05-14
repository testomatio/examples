# Heap

## Max binary heap

- Parent will be greater than the child nodes
- To find child nodes use (2n + 1) and (2n + 2) where n is the index of node
- To find parent use `Math.floor((n -1) / 2)` where n is index of node

Binary heap can be used to build priority queue