var five = require('johnny-five');
var player = require('./monstersound/index');
var HeadMovements = require('./commands/head-movements');
var board = new five.Board();

var HEAD = {UP: 90, DOWN: 120};
var JAW = {OPEN: 60, CLOSED: 170};
var DISTANCE_TRESHOLD = 20;

var distance = 1;
var skullMoving = false;

var isObjectClose = function(objectDistance, previousDistance) {
  var isClose = objectDistance <= DISTANCE_TRESHOLD;
  return isClose;
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

  proximity.on('data', function() {
    console.log(this.cm);
    if (isObjectClose(this.cm, distance) && !skullMoving) {
      console.log('go lauging');
      distance = this.cm;
      skullMoving = true;
      eye.on();
      player.play();
      HeadMovements.laugh(head, jaw, function() {
        console.log('Done lauging bitch');
        eye.off();
        player.stop();
        skullMoving = false;
      });
    }
  });
});
