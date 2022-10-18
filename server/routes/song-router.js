/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
//const PlaylistController = require('../controllers/playlist-controller')
const SongController = require('../controllers/song-controller')
const router = express.Router()

router.post('/song', SongController.createNewSong)
router.put('/song/:id', SongController.updateSongById)

module.exports = router