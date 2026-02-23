import { LinkedList } from "./LinkedList.js";

export class HashMap {
  #loadFactor = 0.75;
  #capacity = 16;
  #hashTable = [];
  #entry = 0;

  #resize() {
    const oldTable = this.#hashTable;

    this.#capacity *= 2;
    this.#hashTable = [];
    this.#entry = 0;

    oldTable.forEach((bucket) => {
      if (!bucket) return;

      bucket.entries().forEach(([key, value]) => {
        this.set(key, value);
      });
    });
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.#hashTable[index]) {
      this.#hashTable[index] = new LinkedList();
    }

    if (this.#hashTable[index].update(key, value)) return;

    this.#hashTable[index].append(key, value);
    // console.log(this.#hashTable[index].toString());
    this.#entry++;

    if (this.#entry >= this.#capacity * this.#loadFactor) {
      console.log("Resizing...");
      this.#resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.#hashTable[index];
    return bucket ? bucket.findValue(key) : null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.#hashTable[index];
    return bucket ? bucket.remove(key) : false;
  }

  length() {
    let length = 0;
    this.#hashTable.forEach((bucket) => {
      if (bucket) length += bucket.size();
    });
    return length;
  }

  show() {
    return this.#hashTable.toString();
  }

  clear() {
    this.#capacity = 16;
    this.#hashTable = [];
    this.#entry = 0;
    return this.#hashTable;
  }

  keys() {
    let keys = [];

    this.#hashTable.forEach((bucket) => {
      if (!bucket) return;
      keys.push(...bucket.keys());
    });

    return keys;
  }

  values() {
    let values = [];

    this.#hashTable.forEach((bucket) => {
      if (!bucket) return;
      values.push(...bucket.values());
    });

    return values;
  }

  entries() {
    let entries = [];

    this.#hashTable.forEach((bucket) => {
      if (!bucket) return;
      entries.push(...bucket.entries());
    });

    return entries;
  }
}

let hmap = new HashMap();
hmap.set("apple", "red");
hmap.set("banana", "yellow");
hmap.set("carrot", "orange");
hmap.set("dog", "brown");
hmap.set("elephant", "gray");
hmap.set("frog", "green");
hmap.set("grape", "purple");
hmap.set("hat", "black");
hmap.set("ice cream", "white");
hmap.set("jacket", "blue");
hmap.set("kite", "pink");
hmap.set("lion", "golden");

hmap.set("apple", "suit");
console.log(hmap.show());
hmap.set("apple", "hatsukoi");
console.log(hmap.show());

console.log(hmap.get("hat"));
console.log(hmap.has("hat"));
console.log(hmap.has("ass"));
console.log(hmap.remove("hat"));
console.log(hmap.show());
console.log(hmap.has("hat"));
console.log(hmap.length());
console.log(hmap.clear());
console.log(hmap.length());
hmap.set("apple", "suit");
hmap.set("apple", "hatsukoi");
hmap.set("apple", "eeweewiie");
hmap.set("banana", "yellow");
hmap.set("apple", "red");
hmap.set("grape", "purple");
hmap.set("hat", "black");
console.log(hmap.show());
console.log(hmap.length());
console.log(hmap.keys());
console.log(hmap.values());
console.log(hmap.entries());
