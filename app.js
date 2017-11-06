const express = require('express');
const chalk = require('chalk');
const app = express();

app.use('/', (req, res, next) => {
    res.send(req.query)
})

app.get('/', (req, res) => {
   res.send('Welcome to Fake Twitter.')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})