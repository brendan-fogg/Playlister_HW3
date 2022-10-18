import { useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let pair = store.listPairForDeletion;
    let name = null;
    let id = null;

    if(pair != null){
        name = pair.name;
        id = pair._id;
    }

    function closeDeleteModal(event){
        store.removeDeleteMark();
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }
    
    function deleteList(event) {
        let id = store.listPairForDeletion._id;
        store.deleteList(id);
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    let deleteListModal =
        <div 
            className="modal" 
            id="delete-list-modal"
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {name} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            value='Confirm' 
                            onClick={deleteList}/>
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            value='Cancel' 
                            onClick={closeDeleteModal}/>
                    </div>
                </div>
        </div>;

        return (
            deleteListModal
        );
        
}
export default DeleteListModal;
