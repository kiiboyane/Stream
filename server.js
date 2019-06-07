
const express = require('express');
const bodyParser = require("body-parser"); 
const fs = require("fs");
const path = require('path');
var proxy = require('html2canvas-proxy');


// for the communication with the client 
//const cors = require('cors'); 
const fileUpload = require('express-fileupload');



// setting up my app
const app = express();

//app.use(cors());
app.use(fileUpload());
// servng static files 
app.use(express.static("public"));

//first middleware to parse the req to json 
app.use(bodyParser.json()); 
//app.use('/', proxy());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/launcher.html'))

  })
// the error handler middleware
app.use(function( err , req , res , next){
  // console.log(err.message.errors) ; 
    res.status(422).send({message : err.message});
});

app.get('/', function(req, res){
   res.redirect('/launcher');
});

app.get('/index', function (req, res) {

    res.sendFile(path.join(__dirname+'/index.html'))
  //});
})
app.get('/reciever', function (req, res) {

    res.sendFile(path.join(__dirname+'/reciever.html'))
  //});
})
app.get('/launcher', function (req, res) {

    res.sendFile(path.join(__dirname+'/launcher.html'))
  //});
})


app.listen(process.env.PORT || 3001 , function (){
  console.log("Hello")
});  












/*const http = require ('http'); 



var server = http.createServer(function (request , response){
  response.writeHead(200, {"Context-Type": "text/plain"}) ; 
  response.end("Hello World \n"); 
  //add_freopen(Compile_Execute);
});

server.listen(4000);



*/


//====LIST DEPENDENCIES===//
//const parseurl = require('parseurl');
//const bodyParser = require('body-parser');
//const path = require('path');
//const expressValidator = require('express-validator');
//const mongoose = require('mongoose');
//const Signature = require('./models/Compete.js')
//const url = 'mongodb://localhost:27017/Compete';
//=========================//


//====MONGOOSE CONNECT===//
/*mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});*/
//==========================//

//const mongoose = require('mongoose');
//let Schema = mongoose.Schema;
/*const competeSchema = new Schema({
  logins: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
})*/
//const Compete = mongoose.model('Compete', competeSchema);
//module.exports = Compete;


//====GET ALL SIGNATURES===//
/*app.get('/api/compete', function(req, res) {
  Compete.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })*/
//==========================//
//====POST NEW SIGNATURE===//
/*app.post('/api/compete', function(req, res) {
  Compete.create({
    logins: req.body.logins,
    message: req.body.MessageofGuest,
  }).then(compete => {
    res.json(compete)
  });
});*/


//==========================//

