alert('The Doctor');
//Creates game window dimension and Auto render.
var game = new Phaser.Game(640,360, Phaser.AUTO);
var GameState = {
  preload: function(){

  },
  create: function(){

  },
  update: function(){

  }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
