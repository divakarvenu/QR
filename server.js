var path = require('path');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 8080;



app.set('view engine', 'jade');
app.set('views', __dirname + '/public/views');

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index');
});



// app.set('views', path.join(__dirname, '/public'))
// var staticPath = path.join(__dirname, '/public');
// app.use(express.static(staticPath));

app.get('/qrread', function (req, res) {
  var url='https://script.google.com/macros/s/AKfycbzF93CtBZE-RZgf7tW6EAnMhhw2pDfvkLkU5rLe098NuM23lA/exec?id='+req.param('id');
  request(url, function (error, response, body) {
    var responseArray=JSON.parse(response.body)
    responseArray[2]=responseArray[2].split('T');
    responseArray[2]=responseArray[2][0];
    responseArray[3]=responseArray[3].split('T');
    responseArray[3]=responseArray[3][0];
    if (!error && response.statusCode == 200) {      
      res.render('profile',{
        name:responseArray[0],
        markers:responseArray[1],
        harvestdate:responseArray[2],
        soilinspdate:responseArray[3]
      })    
    }
  })
  
})

app.listen(port, function() {
  console.log('listening on:'+port);
});