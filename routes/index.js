const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  console.log(tweets);

  res.render( 'index', { tweets: tweets, showForm: true} );
});
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  if(name.match(/^[0-9]+$/) === null) {
    var list = tweetBank.find( {name: name} );
  } else {
    var list = tweetBank.find( {id: parseInt(name)} );
  }
  res.render( 'index', { tweets: list, showForm: true});
});


module.exports = router;
