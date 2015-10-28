var series = require('nimble').series;
var HEAD_UP = 90;
var HEAD_DOWN = 120;
var MOUTH_OPEN = 70;
var MOUTH_CLOSED = 160;

var HeadMovements = {};

module.exports = HeadMovements;

var headUp = function(head, done) {
  head.to(HEAD_UP);
  setTimeout(done, 1000);
};
HeadMovements.headUp = headUp;

var headDown = function(head, done) {
  head.to(HEAD_DOWN);
  setTimeout(done, 1000);
};
HeadMovements.headDown = headDown;

var openMouth = function(jaw, done) {
  jaw.to(MOUTH_OPEN);
  setTimeout(done, 1000);
};
HeadMovements.openMouth = openMouth;

var closeMouth = function(jaw, done) {
  jaw.to(MOUTH_CLOSED);
  setTimeout(done, 1000);
};
HeadMovements.closeMouth = closeMouth;

HeadMovements.laugh = function(head, jaw, done) {
  series([
    function(next) {
      headUp(head, next)
    },
    function(next) {
      openMouth(jaw, next);
    },
    function(next) {
      closeMouth(jaw, next);
    },
    function(next) {
      openMouth(jaw, next);
    },
    function(next) {
      closeMouth(jaw, next);
    },
    function(next) {
      headDown(jaw, next);
    }
  ], done);
};
