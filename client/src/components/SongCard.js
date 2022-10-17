import React, { useContext} from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function openEditSongModal(){
        //Set the song for edit
        store.setSongForEdit(index);
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }

    function openDeleteSongModal(){
        //Set the song for edit
        store.setSongForDeletion(index);
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }

    function handleDragStart(event){
        let target = event.target;
        let targetId = target.id.substring(target.id.indexOf("-") + 1, target.id.indexOf("-") + 2);
        let index = parseInt(targetId);
        store.addDragIndex(index);
    }
    function handleDragOver(event){
        event.preventDefault();
        //console.log("HANDLE DRAG OVER");
        //console.log(event);
    }
    function handleDragEnter(event){
        //console.log("HANDLE DRAG ENTER");
        //console.log(event);
    }
    function handleDragLeave(event){
        //console.log("HANDLE DRAG LEAVE");
        //console.log(event);
    }
    function handleDrop(event){
        event.preventDefault();
        let target = event.target;
        let targetId = target.id.substring(target.id.indexOf("-") + 1, target.id.indexOf("-") + 2);
        let index = parseInt(targetId);

        store.moveSongTransaction(store.songIndexDragged, index);
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={openEditSongModal}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={openDeleteSongModal}
            />
        </div>
    );
}

export default SongCard;