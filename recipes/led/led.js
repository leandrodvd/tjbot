var Gpio = require('onoff').Gpio;
var sleep = require('sleep');

var led_RED = new Gpio(17, 'out');
var led_GREEN = new Gpio(27, 'out');
var led_BLUE = new Gpio(22, 'out');

function setLED(r,g,b){
  console.log("set led to R:"+r+" G:"+g+" B:"+b);
  led_RED.writeSync(r);
  led_GREEN.writeSync(g);
  led_BLUE.writeSync(b);
}
while (1){

  setLED(1,0,0);
  sleep.sleep(2); // sleep for ten seconds
  setLED(0,1,0);
  sleep.sleep(2);
  setLED(0,0,1);
  sleep.sleep(2);
  setLED(1,1,0);
  sleep.sleep(2);
  setLED(1,1,1);
  sleep.sleep(2);
  setLED(1,0,1);
  sleep.sleep(2);
  setLED(0,1,1);
  sleep.sleep(2);
}
