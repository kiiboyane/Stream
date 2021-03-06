let button = document.querySelector('.connectbutton');
let shareScreen = false ;
const video = document.querySelector('#destvid');
const video1 = document.querySelector('#peervid');
var destid = document.getElementById("destid");
var connecteddiv = document.getElementById("connecteddiv");
var connectiondiv = document.getElementById("connectiondiv");
var connectbutton = document.getElementById("connectbutton");
var inputmessage = document.getElementById("inputmessage");
var recievermsg = document.getElementById("recievermsg");
var peerId = null;
var conn = null;
var peer = null;
let call = null ; 
const constraints = {
    audio: true,
    video: {
        width:500,
        height: 500
    }
};
var connected = false; 
let string = window.location.href ; 
let id = '';
for (var i = string.length - 1; i >= 0; i--) {
    if(string[i]==='/')  break; 
    else id = string[i] +id ; 
}
console.log(id);

function findPeer(){
  var xmlHttp = new XMLHttpRequest();
  var data = {
     _id : id 
  }
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);  
            
        }
  xmlHttp.open("POST", "/findPeer", true); // true for asynchronous 
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(JSON.stringify(data));

} 
function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    // Good to go!
} else {
    alert('getUserMedia() is not supported by your browser');
}

function notEmpty(string) {
    return !(string.length === 0 || !string.trim());
}

function initialize() {
    if(peer != null && !peer.disconnected)return ;
    peer = new Peer(id,{
         host:'peerjs-server.herokuapp.com', secure:true, port:443,
        config: {
            'iceServers': [{
                    url: 'stun:stun01.sipphone.com'
                },
                {
                    url: 'stun:stun.ekiga.net'
                },
                {
                    url: 'stun:stun.fwdnet.net'
                },
                {
                    url: 'stun:stun.ideasip.com'
                },
                {
                    url: 'stun:stun.iptel.org'
                },
                {
                    url: 'stun:stun.rixtelecom.se'
                },
                {
                    url: 'stun:stun.schlund.de'
                },
                {
                    url: 'stun:stun.l.google.com:19302'
                },
                {
                    url: 'stun:stun1.l.google.com:19302'
                },
                {
                    url: 'stun:stun2.l.google.com:19302'
                },
                {
                    url: 'stun:stun3.l.google.com:19302'
                },
                {
                    url: 'stun:stun4.l.google.com:19302'
                },
                {
                    url: 'stun:stunserver.org'
                },
                {
                    url: 'stun:stun.softjoys.com'
                },
                {
                    url: 'stun:stun.voiparound.com'
                },
                {
                    url: 'stun:stun.voipbuster.com'
                },
                {
                    url: 'stun:stun.voipstunt.com'
                },
                {
                    url: 'stun:stun.voxgratia.org'
                },
                {
                    url: 'stun:stun.xten.com'
                },
                {
                    'url': 'turn:numb.viagenie.ca',
                    'credential': 'muazkh',
                    'username': 'webrtc@live.com'
                },
                {
                    'url': 'turn:192.158.29.39:3478?transport=udp',
                    'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    'username': '28224511:1379330808'
                },
                {
                    'url': 'turn:192.158.29.39:3478?transport=tcp',
                    'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    'username': '28224511:1379330808'
                }
            ]
        }
    });
    peer.on('open', function(id) {
        peerId = id;
        console.log('ID: ' + id);
         peer.on('call', function(call) {
            destid = call.peer;
            call.answer(window.stream);
            call.on('stream', function(remoteStream) {
                video.srcObject = remoteStream;
                //idtext.style.display = "none";
                connectbutton.style.display = "block";
                connectbutton.style.backgroundColor = "#0D2C3E";        
        });
        });
        peer.on('connection', function(c) {
            conn = c;
            conn.on('open', function() {
                sendandrecieve();
            });
        });
    });
    peer.on('error', function(err) {
        if (err.type === 'unavailable-id') {
            alert('' + err);
            peer.reconnect();
        } else
            alert('' + err);
    });
    console.log(peer.disconnected); 
};

function sendandrecieve() {
    conn.on('data', function(data) {
        recievermsg.innerHTML = "<div class='messages'><p class='sentmsg'>" + data + "</p></div>" + recievermsg.innerHTML;
    });
    sendbutton.onclick = function() {
        if (notEmpty(inputmessage.value)) {
            conn.send(inputmessage.value);
            recievermsg.innerHTML = "<div class='messager'><p class='recievedmsg'>" + inputmessage.value + "</p></div>" + recievermsg.innerHTML;
            inputmessage.value = "";
        }
    };
    inputmessage.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        sendbutton.click();
      }
    });
}
initialize();

/*navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
        //so that i dont hear my voice repeated   :P
        video1.muted = true;
        video1.srcObject = stream;
        window.stream = stream ;
});*/  
window.constraints = constraints; 
function changeVideo(){
    document.querySelector('#connectiondiv').style.display = "grid"; 
    if(shareScreen){
        navigator.mediaDevices.getDisplayMedia(constraints).then((captureStream) => {
                    video1.srcObject = captureStream; 
                    window.stream = captureStream; 
                    button.innerHTML = "switch to camera"; 
                    video1.className = "videoCapture";
                    shareScreen = false; 
                    initialize(); 
                   call = peer.call(destid.value, captureStream);
                    call.on('stream', function(remoteStream) {
                        video.srcObject = remoteStream;
                    });
        }); 
    }else{
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                    video1.srcObject = stream;
                    window.stream = stream; 
                    button.innerHTML = "Share the screen"; 
                    video1.className = "videoCamera";
                    shareScreen = true; 
                    initialize(); 
                    call = peer.call(destid.value, stream);
                    call.on('stream', function(remoteStream) {
                        video.srcObject = remoteStream;
                    });
        }); 
    }
}
function go() {
        connecteddiv.style.display = "grid";
        destid.style.display = "none";
        connectbutton.innerHTML = "Connected";
        connectbutton.disabled = "disabled";
        connectbutton.style.backgroundColor = "#0D2C3E";
        call = peer.call(destid.value, window.stream);
        call.on('stream', function(remoteStream) {
            video.srcObject = remoteStream;
        });
        conn = peer.connect(destid.value);
        conn.on('open', function() {
            sendandrecieve();
        });

}
function IamOn(){
  console.log("/IamConnected/"+id);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);  
        }
  xmlHttp.open("POST","/IamConnected/"+id, true); // true for asynchronous 
  xmlHttp.send();
}
window.setInterval(function(){
       IamOn();
}, 6000);
//setInterval(IamOn(), 5000);
/* window.onbeforeunload = confirmExit;
  function confirmExit()
  {
     console.log("loooooooooooo"); 
   return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
  }
*/
/*function deleteUser(event){
  event.preventDefault();
  var xmlHttp = new XMLHttpRequest();
  console.log( "/deleteuser/"+id); 
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);  
        }
  xmlHttp.open("DELETE", "/deleteuser/"+id, true); // true for asynchronous 
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  return "are you sure !";
}*/
//window.addEventListener("beforeunload",(event) => {
 // event.preventDefault();
 /* alert("are you sure !!");
  var xmlHttp = new XMLHttpRequest();
  //console.log( "/deleteuser/"+id); 
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);  
        }
  xmlHttp.open("DELETE", "/deleteuser/"+id, true); // true for asynchronous 
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");*/
  //return "are you sure !";
//});