const express = require('express');
const router = express.Router();
const axios  = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

const Albumlist = require('../models/Albumlist');
// import Albumlist model so we can perform Albumlist.find, findByIdAndUpdate etc.
const Playlist = require('../models/Playlist');
// import Playlist model so we can perform Playlist.find, findByIdAndUpdate etc.

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.SECRETCLIENTID,
  redirectUri: 'http://localhost:5000/viewalbums'
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch((err) => {
    console.log('Something went wrong when retrieving an access token', err);
});


// Get Elvis' albums
router.get('/getArtistSearch', (req, res, next )=> {
  spotifyApi.searchArtists('eminem')
  .then((data) => {
    console.log('Artist albums', data.body);
    // whatever request is used, .body is used to grab the information from the api
    res.json(data.body)
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
})

// Add here spotify routes - and test them all in postman




//var theSplitURL = req.body.theUrl.split('/')

//spotifyApi.getArtist(theSplitURL[theSplitURL.length-1])








module.exports = router;