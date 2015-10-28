var five = require('johnny-five');
var HeadMovements = require('./commands/head-movements');
var board = new five.Board();

var HEAD = {UP: 90, DOWN: 120};
var JAW = {OPEN: 60, CLOSED: 170};
var DISTANCE_TRESHOLD = 5;

var distance = 0;
var skullMoving = false;

var isObjectClose(objectDistance, previousDistance) {
  return objectDistance <= previousDistance - DISTANCE_TRESHOLD;
};

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 11
  });

  var eye = new five.Led(6);
  var head = new five.Servo(10);
  var jaw = new five.Servo(9);

  this.repl.inject({
    head: head,
    jaw: jaw,
    proximity: proximity
   });

  head.to(HEAD.DOWN);
  jaw.to(JAW.CLOSED);
  //eye.blink(500);

  proximity.on('data', function() {
    if (isClose(this.cm, distance) && !skullMoving) {
      distance = this.cm;
      skullMoving = true;
      eye.on();
      HeadMovements.laugh(head, jaw, function() {
        console.log('Done lauging bitch');
        eye.off();
        skullMoving = false;
      });
    }
  });
});
