import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, dragIndex, dropIndex) {
        super();
        this.store = store;
        this.dragId = dragIndex;
        this.dropId = dropIndex;
    }

    doTransaction() {
        this.store.moveSong(this.dragId, this.dropId);
    }
    
    undoTransaction() {
        this.store.moveSong(this.dropId, this.dragId);
    }
}