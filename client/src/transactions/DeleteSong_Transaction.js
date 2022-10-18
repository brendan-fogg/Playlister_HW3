import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with adding a 
 * song. It will be managed by the transaction stack.
 * 
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.deletionIndex = store.deleteIndex;
        this.deletedSong = store.songForDeletion;
    }

    doTransaction() {
        this.store.deleteSongFromList();
    }
    
    undoTransaction() {
        this.store.addSongAtIndex(this.deletedSong, this.deletionIndex);


    }
}