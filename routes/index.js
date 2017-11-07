const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
module.exports = function (io) {

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
   // console.log(tweets);
  
    res.render( 'index', { tweets: tweets, showForm: true} );
  });
  
  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    if(name.match(/^[0-9]+$/) === null) {
      var list = tweetBank.find( {name: name} );
      res.render( 'index', { tweets: list, showForm: true, username: name});
    } else {
      var list = tweetBank.find( {id: parseInt(name)} );
      res.render( 'index', { tweets: list, showForm: true, username: list[0].name});
    }
  });
  
  router.post('/tweets', function(req, res){
    console.log(req)
    //console.log('reqbody', req.body);
    tweetBank.add(req.body.name, req.body.text);
    res.redirect('/');
    var nam = req.body.name,
    bod = req.body.text;
    io.sockets.emit('newTweet', {name: nam, tweet: bod});
  });
  return router;
};
