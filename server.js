var path = require('path');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 8080;

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/qrread', function (req, res) {
  var url='https://script.google.com/macros/s/AKfycbzF93CtBZE-RZgf7tW6EAnMhhw2pDfvkLkU5rLe098NuM23lA/exec?id='+req.param('id');
  request(url, function (error, response, body) {
    var responseArray=JSON.parse(response.body)
    console.log(responseArray);
    if (!error && response.statusCode == 200) {      
      res.send('<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="description" content="Response"> <title>Response</title> </head> <body> <fieldset class="pure-group"> <label for="name">Name: </label> <p id="name" name="name">'+responseArray[0]+'</p> </fieldset> <fieldset class="pure-group"> <label for="message">Message: </label> <p id="message" name="message" rows="10">'+responseArray[1]+'</p> </fieldset> <fieldset class="pure-group"> <label for="email">Email Address:</label> <p id="email" name="email">'+responseArray[2]+'</p> </fieldset> <fieldset class="pure-group"> <label for="color">Favourite Color: </label> <p id="color">'+responseArray[3]+'</p> </fieldset> </body> </html>')    
    }
  })
  
})

app.listen(port, function() {
  console.log('listening on:'+port);
});