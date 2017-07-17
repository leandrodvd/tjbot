var io = require('socket.io-client');
var ss = require('socket.io-stream');
var mic = require('mic');

//setup socket
var socketURL = 'https://tjbotserver-ldavid.mybluemix.net';
if(process.argv[2] == '-dev'){
  socketURL = 'http://localhost:3000';
}

var socket = io.connect(socketURL, {reconnect: true});
var stream
function connectStream(micInputStream){
  stream = ss.createStream();
  ss(socket).emit('audio', stream, {name: "tjbot-client"});
  socket.on('connect', function (socket) {
      console.log('Connected!');
  });
  socket.on('message', function (message) {
      console.log('Received socket message:' + JSON.stringify(message));
  });
  stream.on('error', function (socket) {
      console.log('Error on audio output stream!');
  });
  stream.on('close', function (socket) {
      console.log('Audio output stream CLOSED!');
      connectStream(micInputStream);
  });
  micInputStream.pipe(stream);
}

// Initiate Microphone Instance to Get audio samples
var mic = require('mic');
var micInstance = mic({ 'rate': '44100', 'channels': '2', 'debug': false, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
   //console.log("Recieved Input Stream: " + data.length);
   process.stdout.write(".");
});

micInputStream.on('error', function(err) {
  console.log("Error in Input Stream: " + err);
});

micInputStream.on('silence', function() {
  // detect silence.
});
micInstance.start();
console.log("TJBot is listening, you may speak now.");

connectStream(micInputStream);
