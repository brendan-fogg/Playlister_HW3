import { useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function closeEditModal(event){
        //Remove the current song for edit
        store.removeEditSongMark();
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }
    
    function editList(event) {
        //Edit Song
        store.updateSongInList();
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    let editSongModal =
        <div 
            className="modal" 
            id="edit-song-modal"
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-edit-song-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>                
                    <div className="modal-center">                 
                        <div className = "input-label box-one">Title:</div> <br/>
                        <div className = "input-label box-two">Artist:</div> <br/>
                        <div className = "input-label box-three">YouTube Id:</div> <br/>
                            
                        <input  className = "input-box input-one" id="edit-title"></input>
                        <input  className = "input-box input-two" id="edit-artist"></input>
                        <input  className = "input-box input-three" id="edit-youtube"></input>
                    </div>
                    <div className="modal-south">
                        <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={editList}/>
                        <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={closeEditModal}/>
                    </div>
                </div>
        </div>;

        return (
            editSongModal
        );
        
}
export default EditSongModal;
