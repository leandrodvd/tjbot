var Gpio = require('onoff').Gpio;
var sleep = require('sleep');

var led_RED = new Gpio(17, 'out');
var led_GREEN = new Gpio(27, 'out');
var led_BLUE = new Gpio(22, 'out');

led_RED.writeSync(1);
sleep.sleep(20); 

function setLED(r,g,b){
  console.log("set led to R:"+r+" G:"+g+" B:"+b);
  led_RED.writeSync(r);
  led_GREEN.writeSync(g);
  led_BLUE.writeSync(b);
}
while (true){

  setLED(true,false,false);
  sleep.sleep(2); // sleep for ten seconds
  setLED(false,true,false);
  sleep.sleep(2);
  setLED(false,false,true);
  sleep.sleep(2);
  setLED(true,true,false);
  sleep.sleep(2);
  setLED(true,true,true);
  sleep.sleep(2);
  setLED(true,false,true);
  sleep.sleep(2);
  setLED(false,true,true);
  sleep.sleep(2);
}
