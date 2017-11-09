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
    var resultQ;
  
    var queryTweets = client.query(`select name, users.id, content from users
    JOIN tweets 
    on tweets.user_id = users.id`, function(err, result) {
    if (err) return next(err);
    resultQ = result.rows;
    var tweets = resultQ;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
    
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    if(name.match(/^[0-9]+$/) === null) {
      var list =  resultQuery.filter( a => a.name === name);
      res.render( 'index', { tweets: list, showForm: true, username: name});
    } else {
      var list =  resultQuery.filter( a => a.id === parseInt(name));
      console.log('resultQuery ', resultQuery);
      console.log('list ', list);
      res.render( 'index', { tweets: list, showForm: true, username: list[0].name});
    }
  });
  
  router.post('/tweets', function(req, res){
      client.query(`select name, users.id, content from users
        JOIN tweets 
        on tweets.user_id = users.id`, function(err, result) {
        const data = result.rows.filter(a => a.name == req.body.name);
        console.log(data)
      if (err) return next(err);
       if(data.length > 0) {
        client.query('INSERT INTO tweets(user_id, content) VALUES($1, $2) RETURNING *',[data[0].id, req.body.text], function(err, result) {
          io.sockets.emit('newTweet', result.rows[0]);
          res.redirect('/')
        });
      } else {
        client.query('INSERT INTO users(name) VALUES($1) RETURNING *',[req.body.name], function(err, result) {
          client.query('INSERT INTO tweets(user_id, content) VALUES($1, $2) RETURNING *', [result.rows[0].id, req.body.text], function(err, result) {
            io.sockets.emit('newTweet', {name: result.rows[0].name, tweet: req.body.text});
            res.redirect('/')
          })
        })
      }
    
    });


    res.redirect('/');
    var nam = req.body.name,
    bod = req.body.text;
    io.sockets.emit('newTweet', {name: nam, tweet: bod});
  });
  
  return router;
};
