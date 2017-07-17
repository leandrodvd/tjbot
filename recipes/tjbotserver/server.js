const watson = require('watson-developer-cloud');
const ss = require('socket.io-stream');
const server = require('http').createServer();
const io = require('socket.io')(server);
const config = require("./config.js");

var speech_to_text = watson.speech_to_text({
  username: config.credentials.speech_to_text.username,
  password: config.credentials.speech_to_text.password,
  version: 'v1'
});

io.on('connection', function(socket) {
  console.log("io connection");
  initTextStream(socket);
});

function initTextStream(socket){
  console.log("init text stream")
  var textStream;
  var ss_socket=ss(socket)
  ss_socket.on('audio', function(stream, data) {
    console.log(data);
    stream.on('data', function(data) {
       process.stdout.write(".");
    });
    textStream = stream.pipe(speech_to_text.createRecognizeStream({
      // content_type: 'audio/l16; rate=44100; channels=2',
      // model: 'pt-BR_BroadbandModel',
      content_type: 'audio/l16; rate=8000; channels=1',
      model: 'pt-BR_NarrowbandModel',
      //customization_id: config.STTCustomizationID,
      interim_results: true,
      continuous: true,
      inactivity_timeout: -1,
      profanity_filter: true,
      // keywords: [attentionWord],
      smart_formatting: true,
      // keywords_threshold: 0.5
    }));

    textStream.setEncoding('utf8');

    textStream.on('close', function(event) {
      console.log("Speech to Text Stream closed");
      console.log(JSON.stringify(event, null, 2));
      initTextStream(socket);
    });
    var context = {} ; // Save information on conversation context/stage for continous conversation

    textStream.on('data', function(str) {
      console.log(' ===== Speech to Text ===== : ' + str); // print the text once received
      socket.emit('message', { text: str});
    });

    textStream.on('error', function(err) {
      console.log(' === Watson Speech to Text : An Error has occurred =====') ; // handle errors
      console.log(err) ;
      console.log("Press <ctrl>+C to exit.") ;
    });

  });
}


// start the server
const port = (process.env.PORT || 3000);
server.listen(port,function(err){
  if (err) {
    return console.error(err);
  }
  return console.info("Server running on http://localhost:"+port);
});
