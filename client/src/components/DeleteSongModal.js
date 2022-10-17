import { useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(){
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let song = store.songForDeletion;
    let title = null;

    if(song != null){
        title = song.title;
    }

    function closeDeleteModal(event){
        store.removeDeleteSongMark();
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }
    
    function deleteSong(event) {
        store.deleteNewSongTransaction();
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    let deleteSongModal =
        <div 
            className="modal" 
            id="delete-song-modal"
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-song-root'>
                    <div className="modal-north">
                        Delete Song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete {title} from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            value='Confirm' 
                            onClick={deleteSong}/>
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            value='Cancel' 
                            onClick={closeDeleteModal}/>
                    </div>
                </div>
        </div>;

        return (
            deleteSongModal
        );
        
}
export default DeleteSongModal;
