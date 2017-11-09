const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const client = require('../db/index.js');
module.exports = function (io) {
  var resultQuery;
  var queryTweets = client.query(`select name, users.id, content from users
  JOIN tweets 
  on tweets.user_id = users.id`, function(err, result) {
    if (err) return next(err);
    resultQuery = result.rows;
  });
  router.get('/', function (req, res) {
    var tweets = resultQuery;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    if(name.match(/^[0-9]+$/) === null) {
      var list =  resultQuery.filter( a => a.name === name);
      res.render( 'index', { tweets: list, showForm: true, username: name});
    } else {
      var list = tweetBank.find( {id: parseInt(name)} );
      res.render( 'index', { tweets: list, showForm: true, username: list[0].name});
    }
  });
  
  router.post('/tweets', function(req, res){
    var existingName =  resultQuery.filter( a => a.name == req.body.name);
    if(existingName.length) {
      client.query('INSERT INTO tweets(user_id, content) VALUES($1, $2)',[existingName[0].id, req.body.text] ,function(err, result) {
          console.log(result)
      });
    }
    res.redirect('/');
    var nam = req.body.name,
    bod = req.body.text;
    io.sockets.emit('newTweet', {name: nam, tweet: bod});
  });
  
  return router;
};
