import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';


import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_LIST: "DELETE_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    ADD_NEW_SONG: "ADD_NEW_SONG",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    UPDATE_SONG: "UPDATE_SONG",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    SET_DRAG_INDEX: "SET_DRAG_INDEX",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listPairForDeletion: null,
        songForEdit: null,
        songForDeletion: null,
        songIndexDragged: null,
        editIndex: null,
        deleteIndex: null,
        toolbarDisabled: true,
        undoable: tps.hasTransactionToUndo(),
        redoable: tps.hasTransactionToRedo(),
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: true,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.newList,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            // DELETE A LIST
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs:  payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: payload.pair,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: false,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                });
            }
            // ADD A NEW SONG
            case GlobalStoreActionType.ADD_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.updatedList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: payload.song,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: payload.index,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.UPDATE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.updatedList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: payload.song,
                    songIndexDragged: null,
                    editIndex: null,
                    deleteIndex: payload.index,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            case GlobalStoreActionType.SET_DRAG_INDEX: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listPairForDeletion: null,
                    songForEdit: null,
                    songForDeletion: null,
                    songIndexDragged: payload.index,
                    editIndex: null,
                    deleteIndex: null,
                    toolbarDisabled: store.toolbarDisabled,
                    undoable: tps.hasTransactionToUndo(),
                    redoable: tps.hasTransactionToRedo(),
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions()
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THIS FUNCTION CREATES A NEW PLAYLIST
    store.createNewList = function () {
        async function asyncCreateNewList() {
            let defaultList = { name: "Untitled", songs: []};
            const response = await api.createPlaylist(defaultList);
            if (response.data.success) {
                let newPairs = store.idNamePairs;
                let newIdNamePair = {_id: response.data.playlist._id, name: response.data.playlist.name}
                newPairs.push(newIdNamePair);
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: {idNamePairs: newPairs, newList: response.data.playlist}
                });
            }
            else {
                console.log("API FAILED TO CREATE LIST");
            }
        }
        asyncCreateNewList();
    }
    //THIS FUNCTION MARKS A LIST FOR DELETION
    store.markListForDeletion = function (id) {
        async function asyncMarkListForDeletion(id){
            let pairs = store.idNamePairs;
            let markedPair = null;
            for (const element of pairs) {
                if(element._id === id){
                    markedPair = element;
                }
            }
            if(markedPair != null){
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {pair: markedPair}
                });
            }
        }
        asyncMarkListForDeletion(id);
    }

    store.removeDeleteMark = function () {
        async function asyncRemoveDeleteMark(){
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: {pair: null}
            });
        }
        asyncRemoveDeleteMark();
    }


    // THIS FUNCTION CREATES A NEW PLAYLIST
    store.deleteList = function (id) {
        async function asyncDeleteList(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.DELETE_LIST,
                        payload: {
                            idNamePairs: pairsArray
                        }
                    });
                }
            }
            else {
                console.log("API FAILED TO DELETE LIST");
            }
        }
        asyncDeleteList(id);
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    //THIS FUNCTION CREATES A NEW SONG AND ADDS IT TO THE CURRENT LIST
    store.addNewSong = function () {
        if(store.currentList == null){
            return
        }
        async function asyncAddNewSong() {

            let id = store.currentList._id;
            let songBody = { 
                title: "Untitled", 
                artist: "Unknown", 
                youTubeId: "dQw4w9WgXcQ"
            }
            let response = await api.getPlaylistById(id);
            let playlist = null;
            if (response.data.success) {
                playlist = response.data.playlist;
            }

            async function asyncCreateNewSong(songBody){
                response = await api.createNewSong(songBody);
                let song = null;
                if (response.data.success) {
                    song = response.data.newSong;
                }
                if(playlist != null){
                    playlist.songs.push(song);
                }
                async function asyncUpdateList(playlist, id){
                    response = await api.updatePlaylistById(id, playlist);
                    if(response.data.success) {
                        
                        storeReducer({
                            type: GlobalStoreActionType.ADD_NEW_SONG,
                            payload: {updatedList: response.data.playlist}
                        });
                    }
                }
                asyncUpdateList(playlist, id);
                
            }
            asyncCreateNewSong(songBody);
        }
        asyncAddNewSong();
    }

    store.addSongAtIndex = function (song, index) {
        if(store.currentList == null){
            return
        }
        async function asyncAddSong(song, index) {

            let playlist = store.currentList;
            let id = store.currentList._id;

            playlist.songs.splice(index, 0, song);
                
            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.ADD_NEW_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, id);
        }
        asyncAddSong(song,index);
    }

    store.setSongForEdit = function (index){
        async function asyncSetSongForEdit(index){
            let list = store.currentList;
            if(list != null){
                let songAtIndex = list.songs[index];

                let title = document.getElementById("edit-title");
                let artist = document.getElementById("edit-artist");
                let youtube = document.getElementById("edit-youtube");

                title.value = songAtIndex.title;
                artist.value = songAtIndex.artist;
                youtube.value = songAtIndex.youTubeId;

                storeReducer({
                    type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
                    payload: {song: songAtIndex, index: index}
                });
            }
        }
        asyncSetSongForEdit(index);
    }

    store.removeEditSongMark = function () {
        async function asyncRemoveEditSongMark(){
            storeReducer({
                type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
                payload: {song: null, index: null}
            });
        }
        asyncRemoveEditSongMark();
    }


    store.updateSongInList = function (){
        async function asyncUpdateSongInList(){
            let song = store.songForEdit;
            let title = document.getElementById("edit-title");
            let artist = document.getElementById("edit-artist");
            let youtube = document.getElementById("edit-youtube");
            song.title = title.value;
            song.artist = artist.value;
            song.youTubeId = youtube.value;

            let playlist = store.currentList;
            
            let count = 0;
            let index = -1;
            for(const element of playlist.songs) {
                if(element._id === song._id){
                    index = count;
                }
                count = count+1;
            }

            if(index !== -1){
                playlist.songs[index].title = song;
            }else{
                return;
            }
            
            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, playlist._id);
        }
        asyncUpdateSongInList();
    }

    store.changeSongById = function (index, song){
        async function asyncChangeSongById(index, song){
            let playlist = store.currentList;

            playlist.songs[index].title = song.title;
            playlist.songs[index].artist = song.artist;
            playlist.songs[index].youTubeId = song.youtube;

            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, playlist._id);
        }
        asyncChangeSongById(index, song);
    }

    store.setSongForDeletion = function (index){
        async function asyncSetSongForDeletion(index){
            let list = store.currentList;
            if(list != null){
                let songAtIndex = list.songs[index];
                storeReducer({
                    type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                    payload: {song: songAtIndex, index: index}
                });
            }
        }
        asyncSetSongForDeletion(index);
    }

    store.removeDeleteSongMark = function () {
        async function asyncRemoveDeleteSongMark(){
            storeReducer({
                type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                payload: {song: null, index: null}
            });
        }
        asyncRemoveDeleteSongMark();
    }

    store.deleteSongFromList = function (){
        async function asyncDeleteSongFromList(){
            let song = store.songForDeletion;
            let playlist = store.currentList;

            let newList = [];
            for(const element of playlist.songs) {
                if(element._id !== song._id){
                    newList.push(element);
                }
            }
            playlist.songs = newList;

            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, playlist._id);
        }
        asyncDeleteSongFromList();
    }

    store.deleteSongByIndex = function (index){
        async function asyncDeleteSongFromList(index){
            let playlist = store.currentList;

            let newList = [];

            for (let i = 0; i < playlist.songs.length; i++){
                if(i !== index){
                    newList.push(playlist.songs[i]);
                }
            }
            playlist.songs = newList;

            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, playlist._id);
        }
        asyncDeleteSongFromList(index);
    }

    store.getSongIdOfNewSong = function () {
        async function asyncGetSongId(){
            let listId = store.currentList._id;
            let response = await api.getSongIdFromIndex(listId);
            if(response.data.success) {
                return response.data.id;
            }
        }
        asyncGetSongId();
    }

    store.addDragIndex = function (index) {
        storeReducer({
            type: GlobalStoreActionType.SET_DRAG_INDEX,
            payload: {index: index}
        });
    }

    store.moveSong = function (drag, drop){
        async function asyncMoveSong(drag, drop){
            let playlist = store.currentList;
            let newList = [];

            for (let i = 0; i < playlist.songs.length; i++){
                if(i !== drag){
                    newList.push(playlist.songs[i]);
                }
            }

            newList.splice(drop, 0, playlist.songs[drag]);
            playlist.songs = newList;

            async function asyncUpdateList(playlist, id){
                let response = await api.updatePlaylistById(id, playlist);
                if(response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_SONG,
                        payload: {updatedList: response.data.playlist}
                    });
                }
            }
            asyncUpdateList(playlist, playlist._id);
        }
        asyncMoveSong(drag, drop);
    }

    store.addNewSongTransaction = function () {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.deleteSongTransaction = function () {
        let transaction = new DeleteSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.moveSongTransaction = function (drag, drop) {
        if(drag === null || drop === null){
            return;
        }
        let transaction = new MoveSong_Transaction(store, drag, drop);
        tps.addTransaction(transaction);
    }
    store.editSongTransaction = function () {
        let transaction = new EditSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}