const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
// import Playlist model so we can perform Playlist.find, findByIdAndUpdate etc.


// All Playlists List - Get Route
router.get('/playlists', (req, res, next) => {
  // this route.. keep in mind, is ACTUALLY /api/playlists because we prefixed this ENTIRE file with /api.
  // found in app.js line 58.

    Playlist.find()
      .then((allThePlaylists) => {

          res.json(allThePlaylists)
          // ONLY command we will do in this app in back end routes is RES.JSON. Since it is an API, we will not be using res.render or res.redirect since those are used for views/handlebars and the API will carry all of our data and json's for us to view.
          // Part 2 of this is - ensure we grab all the .json paths from the React side. keep in mind
      })
      .catch((err) => {
          res.json(err);
      })
});


// One Playlist Details - Get Route
router.get('/playlist-details/:id', (req, res, next) => {
  // because we are making this route unique, with :id, not necessary to put at bottom of the file.
  // Ask Nick/Marcos if it is necessary since I prefer mine to not have /details.
    Playlist.findById(req.params.id)
      // when ANY route requires id, specific instance of a model, use REQ.PARAMS.ID inside the function argument. It will find the single playlist in the database.
      .then((aPlaylist) => {
        res.json(aPlaylist);
          // ?? then render json for all the info about the playlist.
      })
      .catch((err) => {
          res.json(err);
      })
})


// in a pure express app w/o react or angular, to Create a New Task or Object Instance, it involves a get route where a user sees a form to fill in information.
// then that form submits to a post route where the info is received and then a new instance is created.
// However, with an API and a REACT front end, we only need one route.. the POST route, no get route, since React takes care of the get route for us.
// The form the user will fill out will be in the React app, and we will have to retrofit the React app, so it can successfully make a post request useing Axios to the post route we define below.

// Add/Create a New Playlist - Post Route
router.post('/playlists/add-new', (req, res, next) => {
    Playlist.create({
      // we will need to be sure when making the React app, we design a page that gives users the ability to make a post request to https://localhost:5000/api/playlists/add-new, and have to be sure that when we send the request from our React app, there are four things in the body of the request. they must be called theName, theCreator, theSongs[], and theTime.
      // this will be done with Axios.
      creator: req.body.theCreator,
      name: req.body.theName,
      songs: req.body.theSongs,
      time: req.body.theTime
    })
    .then((response) => {
      // response is equivalent to response from React after the playlist is created in the database.
      res.json(response)
    })
    .catch((err) => {
      res.json(err);
    })
})

// Edit a Task - Post Route
router.post('/playlist-edit/:id', (req, res, next) => {
    Playlist.findByIdAndUpdate(req.params.id, {
      creator: req.body.theCreator,
      name: req.body.theName,
      songs: req.body.theSongs,
      time: req.body.theTime
      // same as in the add a new playlist post route.
    })
    .then((response) => {
      if (response === null ) {
        res.json({ message: 'sorry no playlist found' });
        return;
      }
      // if there isn't an error, and we can't find the instance with that id, then we do an if statement saying response === null then show a message. because this situation does not show a true console error.
        res.json([{ message: 'the playlist was successfully updated'}, response ])
        // after res.json, the message is an object within the argument, IF you want to console.log the response as well, then you must make the argument an array, object message being 0 index, response being 1 index.
    })
    .catch((err) => {
      res.json(err.message);
    })
})


// Delete a Playlist - Post Route
router.post('/playlist-delete/:id', (req, res, next) => {
    Playlist.findByIdAndRemove(req.params.id)
      .then((deletedTask) => {
        if (deletedTask === null) {
          res.json({ message: 'sorry playlist not found' })
          // res.json takes an object, err or a custom one like message: .. { message: }
          return;
        }
        res.json([{ message: 'task successfully deleted'}, deletedTask])
      })
      .catch((err) => {
        res.json(err);
      })
})


module.exports = router;

// second step is to make the routes file.

// postman will test the API, while we're building the app.
// to test: enter route into top bar for postman, and add keys and test to see if in the browser a new json object is added, edited, deleted, etc depending on route being tested.

// cross origin request security - cors needs to be installed as well.

// ALL ROUTES NEED TO BE TESTED WITH POSTMAN