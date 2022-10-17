import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding a 
 * song. It will be managed by the transaction stack.
 * 
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        console.log(this.store.currentList);
        this.store.addNewSong();
        console.log("Heyo There--")
        console.log(this.store.currentList);

    }
    
    undoTransaction() {
        console.log(this.store.currentList);
    }
}