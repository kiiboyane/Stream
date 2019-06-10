const express = require('express');
const router = express.Router(); 
const User = require("./user.js") ; 
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
/*
I have added the next argument in the callback functions
which refers to the next middleware , in my case the error handler
middleware . :P 
*/

router.post('/IamConnected/:_id', function (req, res) {
	//console.log("kkkkkkkkk");
	//console.log(req.params._id);
	let data = {last : new Date()}; 
	//console.log(data); 
      User.findByIdAndUpdate({_id : req.params._id}, data).then(function(){
			              	  res.send("success"); 
		                  });
});


// getting a list of current users 
router.get('/users' , function(req , res , next){
	User.find({}).then(function(users){
			  res.send(users); 
	});
}); 

//adding a  new user
router.post('/adduser' , function(req , res , next){
	        console.log(req.body.tags);
			User.create(req.body).then(function(user){
				console.log(user);
				res.send(JSON.stringify(user._id));
			}).catch(next); 
}); 


//finding a peer for the user 
router.post('/findpeer' , function(req , res , next){
	        let  id = req.body._id
			User.find(req.body).then(function(user){
				if(user.length === 0 ){
					res.send("the user Id expired"); 
				}else{
					User.find({}).then(function(users){
	                       for (var i = users.length - 1; i >= 0; i--) {
	                              	if(users[i]._id !=id) {
	                              		users[i].peerId = id; 
	                              		user[0].peerId  = users[i]._id; 
					                    res.send(JSON.stringify(user[0]));
	                                    break;
	                              	}
	                        } 
					});
					
				}
			}).catch(next); 
}); 


//delete a user // quand tu supprimes un utilisateur tu dois supprimer ses comptes admin et competitor ect 
router.post('/deleteuser/:_id' , function(req , res, next){
	 console.log("lol");
	 User.findOneAndRemove({_id : req.params._id}).then(function(user){
	 	res.send(user); 
	});
}); 
router.post('/IamConnected/:_id', function (req, res) {
	console.log("kkkkkkkkk");
	console.log(req.params._id);
      User.findByIdAndUpdate({_id : req.params._id}, {last : new Date()}).then(function(){
			              	  res.send(contest); 
		                  });
});


function findlateusers(){
	//console.log("hey");
	 User.find({}).then(function(users){
			  //res.send(users); 
			  for (var i =    users.length - 1; i >= 0; i--) {
			      
			  	let retdate = users[i].last;
				let current = new Date();
				let difference = current - retdate  ; // difference in milliseconds

				const MILLE_IN_MIN = 1000 * 60;
				if (Math.floor(difference / MILLE_IN_MIN) >= 5) {
    					console.log("Current user " + users[i]._id +" is more than 5 min disconnected " );
    					 User.findOneAndRemove({_id :users[i]._id}).then(function(user){
	 								console.log("deleted");  
						});
					}
			  }
	});
}
setInterval( function (){
		findlateusers();
}, 6000);
module.exports = router; 
