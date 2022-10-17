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
    }

    doTransaction() {
        console.log("DELETE SONG TRANSACTION")
        this.store.deleteSongFromList();

        let song = this.store.songForDeletion;
        let playlist = this.store.currentList;

        let newList = [];
        for(const element of playlist.songs) {
            if(element._id !== song._id){
                newList.push(element);
            }
        }
        playlist.songs = newList;
        this.currentList = playlist;
        console.log("store after delete song transaction")
        console.log(this.store.currentList);
    }
    
    undoTransaction() {
        console.log("UNDO DELETE SONG TRANSACTION")
    }
}