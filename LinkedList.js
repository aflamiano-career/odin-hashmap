class Node {
  constructor(key, value = true) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

export class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;

  append(key, value) {
    const newNode = new Node(key, value);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#size++;
      return;
    }

    this.#tail.nextNode = newNode;
    this.#tail = newNode;
    this.#size++;
  }

  update(key, value) {
    let current = this.#head;
    while (current) {
      if (current.key === key) {
        current.value = value;
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  findValue(key) {
    let current = this.#head;
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.nextNode;
    }
    return null;
  }

  findKey(key) {
    let current = this.#head;
    while (current) {
      if (current.key === key) {
        return current.key;
      }
      current = current.nextNode;
    }
    return null;
  }

  remove(key) {
    if (!this.#head) return false;

    if (this.#head.key === key) {
      this.#head = this.#head.nextNode;
      this.#size--;
      return true;
    }

    let previous = this.#head;
    let current = this.#head.nextNode;

    while (current) {
      if (current.key === key) {
        previous.nextNode = current.nextNode;
        this.#size--;
        return true;
      }

      previous = current;
      current = current.nextNode;
    }

    return false;
  }

  size() {
    return this.#size;
  }

  keys() {
    let keys = [];

    let current = this.#head;
    while (current) {
      keys.push(current.key);
      current = current.nextNode;
    }

    return keys;
  }

  values() {
    let values = [];

    let current = this.#head;
    while (current) {
      values.push(current.value);
      current = current.nextNode;
    }

    return values;
  }

  entries() {
    let entries = [];

    let current = this.#head;
    while (current) {
      entries.push([current.key, current.value]);
      current = current.nextNode;
    }

    return entries;
  }

  toString() {
    let string = "";

    let current = this.#head;
    while (current !== null) {
      string += `(${current.key}: ${current.value}) -> `;
      current = current.nextNode;
    }

    if (this.#head) {
      string += `null`;
    }
    return string;
  }
}
