const express = require('express');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const socketio = require('socket.io');
const server = app.listen(3000);
const io = socketio.listen(server);
//set = tell the view engine which type of file to load up to the browser; (or set headers)
//engine: when rendering first param (filetype), run second param function. 
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes(io));
app.use(express.static('public'))



// parse application/json

nunjucks.configure('views', {noCache: true});
