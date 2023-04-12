const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootStart = null;
  }

  root() {
    return this.rootStart ? this.rootStart : null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootStart) {
      this.rootStart = newNode;
      return;
    }

    let node = this.rootStart;

    while (node) {
      console.log(node);
      if ((newNode.data < node.data) && !node.left) {
        node.left = newNode;
        break;
      }
      else if (newNode.data < node.data) {
        node = node.left;
      }
      else if (!node.right) {
        node.right = newNode;
        break;
      }
      else {
        node = node.right;
      }
    }
  }

  has(data) {
    if (!this.rootStart) {
      return false;
    }

    let node = this.rootStart;
    let result = false;

    while (node) {
      if (node.data === data) {
        result = true;
        break;
      }
      else if (data < node.data) {
        node = node.left;
      }
      else {
        node = node.right;
      }
    }

    return result;
  }

  find(data) {
    if (!this.rootStart) {
      return null;
    }

    let node = this.rootStart;
    let result = null;

    while (node) {
      if (node.data === data) {
        result = node;
        break;
      }
      else if (data < node.data) {
        node = node.left;
      }
      else {
        node = node.right;
      }
    }

    return result;
  }

  remove(value) {
    this.rootStart = removeNode(this.rootStart, value);

    function removeNode(node, value) {
      if (!node) return null;
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootStart) {
      return null;
    }

    let node = this.rootStart;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootStart) {
      return null;
    }

    let node = this.rootStart;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);
// assert.strictEqual(tree.has(14), false);
// assert.strictEqual(tree.has(8), false);
// assert.strictEqual(tree.has(9), false);
// assert.strictEqual(tree.has(2), true);
// assert.strictEqual(tree.has(6), true);
// assert.strictEqual(tree.has(128), true);
// assert.strictEqual(tree.has(31), true);
// assert.strictEqual(tree.has(54), true);
// assert.strictEqual(tree.has(1), true);

module.exports = {
  BinarySearchTree
};