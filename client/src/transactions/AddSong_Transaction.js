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
        this.newSongId = null;
    }

    doTransaction() {
        console.log("store before add song transaction")
        console.log(this.store.currentList);
        this.store.addNewSong();
        let songBody = { 
            _id: null,
            title: "Untitled", 
            artist: "Unknown", 
            youTubeId: "dQw4w9WgXcQ"
        }
        this.store.currentList.songs.push(songBody);
        console.log("store after add song transaction")
        console.log(this.store.currentList);
    }
    
    undoTransaction() {
        console.log("store reached from undoing add song transaction")
        console.log(this.store.currentList);
        let index = this.store.currentList.songs.length - 1;
        this.store.deleteSongByIndex(index);
        
        let newList = [];
        for (let i = 0; i < this.store.currentList.songs.length; i++){
            if(i !== index){
                newList.push(this.store.currentList.songs[i]);
            }
        }
        this.store.currentList.songs = newList;

        console.log("store after undoing add song transaction");
        console.log(this.store.currentList);
    }
}