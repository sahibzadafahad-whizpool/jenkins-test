var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello Node, Hi from Jenkins2!')
})

app.listen(8080, function () {
  console.log('Listening on port 8080...')
})
