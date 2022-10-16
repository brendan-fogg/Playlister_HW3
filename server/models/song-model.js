const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const songSchema = new Schema(
    {
        title: String,
        artist: String,
        youTubeId: String
        
    },
    { timestamps: false },
)

module.exports = mongoose.model('song', songSchema)