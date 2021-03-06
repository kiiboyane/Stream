
const express = require('express');
const bodyParser = require("body-parser"); 
const fs = require("fs");
const path = require('path');
const cors = require('cors'); 

const mongoose  = require("mongoose"); 



// for the communication with the client 
//const cors = require('cors'); 
const fileUpload = require('express-fileupload');



// setting up my app
const app = express();


// connecting to mongodb :)
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/P2P", { useNewUrlParser: true }) ; 
mongoose.Promise = global.Promise; 


app.use(cors());
app.use(fileUpload());
// servng static files 
app.use(express.static("public"));

//first middleware to parse the req to json 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/', proxy());

app.use("/", require("./userRoute")); 


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
});
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
});
app.get('/reciever', function (req, res) {
    res.sendFile(path.join(__dirname+'/reciever.html'))
});
app.get('/launcher', function (req, res) {
    res.sendFile(path.join(__dirname+'/launcher.html'))
});
app.get('/connect/:id', function (req, res) { 
   //console.log(req.params.id); 
   res.sendFile(path.join(__dirname+'/connect.html'))   
   //res.send(req.params.id);
});
app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname+'/test.html'))
});
app.get('/NOTFOUND', function (req, res) {
    res.sendFile(path.join(__dirname+'/404.html'))
});
app.post('/connectIndex', function (req, res) {
   console.log(req.body); 
   res.redirect('/test');   
});

let server = app.listen(process.env.PORT || 3001 , function (){
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

