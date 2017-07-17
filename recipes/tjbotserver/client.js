var io = require('socket.io-client');
var ss = require('socket.io-stream');
var mic = require('mic');

//setup socket
var socketURL = 'http://localhost:3000';
var socket = io.connect(socketURL, {reconnect: true});
var stream = ss.createStream();
ss(socket).emit('audio', stream, {name: "tjbot-client"});
//fs.createReadStream(filename).pipe(stream);
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
});


// Initiate Microphone Instance to Get audio samples
var mic = require('mic');
var micInstance = mic({ 'rate': '44100', 'channels': '2', 'debug': false, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
   //console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
  console.log("Error in Input Stream: " + err);
});

micInputStream.on('silence', function() {
  // detect silence.
});
micInstance.start();
console.log("TJBot is listening, you may speak now.");

micInputStream.pipe(stream);
