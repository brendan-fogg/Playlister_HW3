const Song = require('../models/song-model')

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


module.exports = {
    createNewSong,
}