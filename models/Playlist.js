const mongoose = require('mongoose');
const Schema   = mongoose.Schema;



const playlistSchema = new Schema({
      creator: { type: Schema.Types.ObjectId, ref:'User' },
      name: String,
      songs: [],
      time: Number
})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;

// first make models in express api app.

// IF TIME ADD AN ARTISTLIST model