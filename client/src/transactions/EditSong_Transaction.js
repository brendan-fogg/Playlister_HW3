import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with adding a 
 * song. It will be managed by the transaction stack.
 * 
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.preEditSong = JSON.parse(JSON.stringify(store.songForEdit));
        this.index = store.editIndex;
        this.song ={
            title: document.getElementById("edit-title").value,
            artist: document.getElementById("edit-artist").value,
            youtube: document.getElementById("edit-youtube").value
        }
    }

    doTransaction() {
        this.store.changeSongById(this.index, this.song);
    }
    
    undoTransaction() {
        this.store.changeSongById(this.index, this.preEditSong);
    }
}