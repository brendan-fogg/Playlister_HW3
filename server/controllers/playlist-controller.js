const Playlist = require('../models/playlist-model')
const Song = require('../models/song-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: ");
    console.log(body);

    if (!body) {
        console.log("HERE!")
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}

getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs });
        }
    }).catch(err => console.log(err))
}
updatePlaylistById = async (req, res) => {
    console.log(req.body);

    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        console.log("BEFORE");
        console.log(list);

        list.name = req.body.name;
        list.songs = req.body.songs;
        console.log("AFTER");
        console.log(list);

        list
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    playlist: list,
                    message: 'Playlist Updated!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Playlist Not Updated!',
                })
            })
    })
}

deletePlaylistById = async (req, res) => {

   let id = req.params.id;
   console.log(id);

    await Playlist.findOne({ _id: id }, (err, list) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                error: err,
                message: "Error Finding List"
            })
        }

        list
            .delete()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    playlist: list,
                    message: 'Playlist Deleted!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Playlist Not Deleted!',
                })
            })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById,
}