const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    const sha = sha256(key).slice(0,8);
    return parseInt(sha, 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      throw new Error("hash collision or same key/value pair already exists!");
    }

    this.data[index] = new KeyValuePair(key, value);
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      let head = this.data[index];

      this.data[index] = new KeyValuePair(key, value);
      this.count++;
      this.data[index].next = head;

    } else {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    }
  }

  insert(key, value) {
    // Your code here
    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      let head = this.data[index];

      while(true) {
        if(head.key === key){
          head.value = value;
          break;
        }

        if(head.next) {
          head = head.next;
        } else {
          head = this.data[index];

          this.data[index] = new KeyValuePair(key, value);
          this.count++;
          this.data[index].next = head;

          break;
        }
      }

    } else {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    }
    console.log(this.data);
  }

}


module.exports = HashTable;