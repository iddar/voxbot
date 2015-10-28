var path = require('path');
var Player = require('player');

var songs = [
  path.join(__dirname, './mp3/monster.mp3')
];

var player = new Player(songs)
  .on('playing', function(song) {
    console.log('I\'m playing... ');
  })
  .on('playend', function(song) {
    console.log('Play done ...');
  })
  .on('error', function(err) {
    console.log('Opps...!')
    console.log(err);
  });

module.exports = player;
