import { LinkedList } from "./LinkedList.js";

class HashSet {
  #capacity;
  #loadFactor;
  #buckets;
  #entries;

  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.#capacity = initialCapacity;
    this.#loadFactor = loadFactor;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#entries = 0;
  }

  #resize() {
    const oldBuckets = this.#buckets;

    this.#capacity *= 2;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#entries = 0;

    oldBuckets.forEach((bucket) => {
      if (!bucket) return;

      bucket.keys().forEach((key) => {
        this.set(key);
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

  set(key) {
    const index = this.hash(key);

    if (!this.#buckets[index]) {
      this.#buckets[index] = new LinkedList();
    }

    if (this.#buckets[index].findKey(key)) return;

    this.#buckets[index].append(key);
    this.#entries++;

    if (this.#entries >= this.#capacity * this.#loadFactor) {
      console.log("Resizing...");
      this.#resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.#buckets[index];
    return bucket ? bucket.findKey(key) : null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.#buckets[index];

    if (!bucket) return false;

    if (bucket.remove(key)) {
      this.#buckets[index] = null;
      return true;
    }
    return false;
  }

  length() {
    let length = 0;
    this.#buckets.forEach((bucket) => {
      if (bucket) length += bucket.size();
    });
    return length;
  }

  show() {
    return this.#buckets.toString();
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#entries = 0;
    return this.#buckets;
  }

  keys() {
    let keys = [];

    this.#buckets.forEach((bucket) => {
      if (!bucket) return;
      keys.push(...bucket.keys());
    });

    return keys;
  }
}

const hSet = new HashSet();
hSet.set("apple");
hSet.set("banana");
console.log(hSet.get("apple"));
hSet.set("banana");
console.log(hSet.has("banana"));
hSet.remove("banana");
console.log(hSet.show());
console.log(hSet.length());
console.log(hSet.clear());
console.log(hSet.show());
hSet.set("apple");
hSet.set("banana");
console.log(hSet.show());
console.log(hSet.keys());

hSet.set("apple");
hSet.set("banana");
hSet.set("carrot");
hSet.set("dog");
hSet.set("elephant");
hSet.set("frog");
hSet.set("grape");
hSet.set("hat");
hSet.set("ice cream");
hSet.set("jacket");
hSet.set("kite");
hSet.set("lion");
console.log(hSet.show());
