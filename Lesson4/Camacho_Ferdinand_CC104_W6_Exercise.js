'use strict';

// CC104 Week 6 Hands-On Exercise: Campus IT Support Request Manager
// Topics: Stack, Queue, Priority Queue, and Linked List

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// PART A: STACK

// Stack (LIFO): the last element pushed is the first one removed.
class Stack {
  // Create the internal storage; the top is the end of the array.
  constructor() {
    this.items = [];
  }

  // Add an element to the top.
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element (null when empty).
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Return the top element without removing it (null when empty).
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Return true when the stack has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements.
  size() {
    return this.items.length;
  }

  // Return all elements as text, from bottom to top.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

const actionHistory = new Stack();

// Push the three required actions in order.
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// Show the top, undo it, then show what is left.
console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());

// PART B: QUEUE

// Queue (FIFO): the first element added is the first one removed.
class Queue {
  // Create the internal storage; the front is index 0.
  constructor() {
    this.items = [];
  }

  // Add an element at the back.
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element (null when empty).
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Return the front element without removing it (null when empty).
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Return true when the queue has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements.
  size() {
    return this.items.length;
  }

  // Return all elements as text, from front to back.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

const waitingRequests = new Queue();

// Enqueue the four requests in arrival order.
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Show the front, process two requests, then show what is left.
console.log('Next Request: ' + waitingRequests.front());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());

// PART C: PRIORITY QUEUE

// Priority Queue: smaller priority number = served first.
// Items are kept in a chain of connected entries (no array, per Rule 2).
// Each entry looks like { item: { request, priority }, next: ... }.
class PriorityQueue {
  // Start with an empty chain.
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Insert a request at the position that keeps priority order.
  enqueue(request, priority) {
    // Build the item that stores both the request and its priority.
    const entry = { item: { request: request, priority: priority }, next: null };

    if (this.head === null || priority < this.head.item.priority) {
      // Empty queue, or more urgent than the current first item: insert at the front.
      entry.next = this.head;
      this.head = entry;
    } else {
      // Skip past every item with the same or higher priority (keeps arrival order).
      let current = this.head;
      while (current.next !== null && current.next.item.priority <= priority) {
        current = current.next;
      }
      entry.next = current.next;
      current.next = entry;
    }

    this.length++;
  }

  // Remove and return the first item (null when empty).
  dequeue() {
    if (this.head === null) {
      return null;
    }
    const removed = this.head.item;
    this.head = this.head.next;
    this.length--;
    return removed;
  }

  // Return the number of items.
  size() {
    return this.length;
  }

  // Display every request with its priority, in processing order.
  print() {
    if (this.head === null) {
      console.log('(empty)');
      return;
    }
    let current = this.head;
    while (current !== null) {
      console.log(current.item.request + ', Priority ' + current.item.priority);
      current = current.next;
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');

const urgentRequests = new PriorityQueue();

// Enqueue the four requests in arrival order.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

// Show the initial order, process the first request, then show the rest.
console.log('Initial Priority Order:');
urgentRequests.print();

const processedUrgent = urgentRequests.dequeue();
console.log('Processed Priority Request: ' + processedUrgent.request + ', Priority ' + processedUrgent.priority);

console.log('Remaining Priority Requests:');
urgentRequests.print();

// PART D: LINKED LIST

// Node: one link in the list, holding an element and a pointer to the next node.
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// LinkedList: a chain of connected nodes starting at head.
class LinkedList {
  // Start with an empty list.
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // Add a node at the end.
  append(element) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      // Walk to the last node, then link the new one.
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }

    this.length++;
  }

  // Insert at a position (0 to size); return false when the position is invalid.
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    }

    const node = new Node(element);

    if (position === 0) {
      // Beginning: new node points to the old head.
      node.next = this.head;
      this.head = node;
    } else {
      // Middle or end: stop at the node just before the position.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      node.next = previous.next;
      previous.next = node;
    }

    this.length++;
    return true;
  }

  // Remove and return the element at a position; return null when invalid.
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }

    let removed;

    if (position === 0) {
      // Removing the head: move head forward.
      removed = this.head;
      this.head = this.head.next;
    } else {
      // Stop at the node before the target, then skip over the target.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      removed = previous.next;
      previous.next = removed.next;
    }

    this.length--;
    return removed.element;
  }

  // Return the position of the element, or -1 when absent.
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Remove the first matching element using indexOf and removeAt.
  remove(element) {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  // Return true when there are no nodes.
  isEmpty() {
    return this.length === 0;
  }

  // Return the number of nodes.
  size() {
    return this.length;
  }

  // Traverse the list and return all elements as text.
  toString() {
    const parts = [];
    let current = this.head;

    while (current !== null) {
      parts.push(current.element);
      current = current.next;
    }

    return parts.join(' -> ');
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

const completedRequests = new LinkedList();

// Append the three required requests.
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// Insert #400 at the start and #405 at the end.
completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

// Show the list, then search for #402.
console.log('Complete List: ' + completedRequests.toString());
console.log('Index of Ticket #402: ' + completedRequests.indexOf('Ticket #402 - Printer Connected'));

// Remove by position, then by value.
console.log('Removed at Position 1: ' + completedRequests.removeAt(1));
console.log('Removed by Value: ' + completedRequests.remove('Ticket #403 - Antivirus Updated'));

// Show the final result.
console.log('Final List: ' + completedRequests.toString());
console.log('Final Size: ' + completedRequests.size());