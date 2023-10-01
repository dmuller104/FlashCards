class CLLNode {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class CircledLinkedList {
    constructor() {
        this.current = null;
        this.size = 0;
    }

    add(data) {
        let newNode = new CLLNode(data);
        if (this.current == null) {
            this.current = newNode;
            this.current.prev = this.current;
            this.current.next = this.current;
        } else {
            newNode.next = this.current;
            newNode.prev = this.current.prev;
            this.current.prev.next = newNode;
            this.current.prev = newNode;
        }
        this.size++;
    }

    remove() {
        if (this.size == 0) {
            return -1;
        } else if (this.size == 1) {
            this.size--;
            this.current = null;
            return this.size
        } else {
            this.size--;
            this.current.prev.next = this.current.next;
            this.current.next.prev = this.current.prev;
            this.current = this.current.next;
            return this.size
        }
    }

    next() {
        this.current = this.current.next;
        return this.current;
    }
    
    prev() {
        this.current = this.current.prev;
        return this.current;
    }

    fill(arr) {
        for (let value of arr) {
            this.add(value);
        }
    }
}