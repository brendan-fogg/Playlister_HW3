import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import EditSongModal from './EditSongModal'
import DeleteSongModal from './DeleteSongModal'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let ctrlPressed = false;
    document.onkeydown = handleAppKeyDown;
    document.onkeyup = handleAppKeyUp;

    function handleAppKeyDown(keyEvent){
        let CTRL_KEY_CODE = 17;
        if (keyEvent.which == CTRL_KEY_CODE) {
            ctrlPressed = true;
        }
        else if (keyEvent.key.toLowerCase() == "z") {
            if (ctrlPressed) {
                store.undo();
            }
        }
        else if (keyEvent.key.toLowerCase() == "y") {
            if (ctrlPressed) {
                store.redo();
            }
        }
    }
    function handleAppKeyUp(keyEvent){
        if (keyEvent.which === "17")
            ctrlPressed = false;
    }


    let editModal = <EditSongModal/>;
    let deleteModal = <DeleteSongModal/>;

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        {editModal}
        {deleteModal}
        </div>
    )
}

export default PlaylistCards;