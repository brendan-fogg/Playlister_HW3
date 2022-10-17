const Song = require('../models/song-model')
const Playlist = require('../models/playlist-model')

//FUNCTION FOR CREATING AND RETURNING A NEW SONG
createNewSong = (req, res) => {
    const body = req.body;
    console.log("createNewSong body: ");
    console.log(body);

    if (body == null) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const song = new Song(body);
    console.log("song: " + JSON.stringify(body));
    if (song == null) {
        return res.status(400).json({ 
            success: false, 
            error: err,
            message: "Error Creating the Song"
        })
    }

    song.save().then(() => {
            return res.status(201).json({
                success: true,
                newSong: song,
                message: 'Song Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Song Not Created!',
            })
        })
}

getSongIdFromIndex = async (req, res) => {

    console.log("INDEX");
    console.log(req.body);

    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ 
                success: false, 
                error: err,
                message: "Couldn't find list"
            })
        }

        if(list == null){
            return res.status(400).json({ 
                success: false, 
                error: err,
                message: "Couldn't find list"
            })
        }
        let index = list.songs.length-1;
        let id = list.songs[index]._id;

        return res.status(200).json({ 
            success: true, 
            id: id 
        })
    }).catch(err => console.log(err))
}


module.exports = {
    createNewSong,
    getSongIdFromIndex
}