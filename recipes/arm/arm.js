const TJBot = require('tjbot');

var hardware = ['servo'];
var configuration = {};
var credentials = {};
var tj = new TJBot(hardware, configuration, credentials);


function wave(){
  tj.wave()
tj.wave();
tj.wave();;
  setTimeout(wave, 5000);
}

wave();
