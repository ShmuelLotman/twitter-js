const express = require('express');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const app = express();
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.use('/', routes);
app.use(express.static('public'))

app.get('/', (req, res) => {
    const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
    res.render( 'index', {title: 'Hall of Fame', people: people} );
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    if (err) throw new Error;
});
