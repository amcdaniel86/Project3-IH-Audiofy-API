const mongoose = require('mongoose');
const Schema   = mongoose.Schema;



const playlistSchema = new Schema({
      creator: { type: Schema.Types.ObjectId, ref:'User' },
      name: String,
      songs: [],
      totalTime: number
})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;