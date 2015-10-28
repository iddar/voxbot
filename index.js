var five = require('johnny-five');
var board = new five.Board();

var HEAD = {UP: 90, DOWN: 120};
var JAW = {OPEN: 60, CLOSED: 170};

var distance = 0;

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
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
  eye.blink(500);

  proximity.on("data", function() {
    if (this.cm < (distance - 5)) {
      distance = this.cm;
      console.log(distance);
    }
  });
});
