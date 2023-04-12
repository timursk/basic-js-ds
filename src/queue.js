const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.root = null;
  }

  getUnderlyingList() {
    const nodes = [];
    let node = this.root;

    while(node) {
      nodes.push(node);
      node = node.next;
    }

    let newRoot = null;
    let newRootNode = null;

    for (let i = (nodes.length - 1); i >= 0 ; i--) {
      const node = nodes[i];
      node.next = null;

      if (!newRoot) {
        newRoot = node;
        newRootNode = newRoot;
        continue; 
      }

      newRootNode.next = node;
      newRootNode = newRootNode.next;
    }

    return newRoot;
  }

  enqueue(value) {
    if (!this.root) {
      this.root = new ListNode(value);
      return;
    }

    const tmp = this.root;
    this.root = new ListNode(value);
    this.root.next = tmp;
  }

  dequeue() {
    let node = this.root;
    let result = null;

    while (node && node.next && node.next.next) {
      node = node.next;
    }

    if (node && node.next && node.next.next) {
      result = node.next.next.value;
      node.next.next = null;
    }
    else if (node && node.next) {
      result = node.next.value;
      node.next = null;
    }
    else if (node) {
      result = this.root.value;
      this.root = null;
    }

    return result;
  }
}

module.exports = {
  Queue
};
