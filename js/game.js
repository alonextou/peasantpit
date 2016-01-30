// alert('The Doctor');
//Creates game window dimension and Auto render.t
var game = new Phaser.Game(640,360, Phaser.AUTO);
var GameState = {
  preload: function(){
    game.load.image('player', 'assets/images/player.png');
    game.load.image('bg', 'assets/images/background.jpg');
  },
  create: function(){
    game.world.setBounds(-1000, -1000, 2000, 2000);
    land = game.add.tileSprite(0, 0, 800, 600, 'bg');
    player = game.add.sprite(320, 180, 'player');
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function(){

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
            player.scale.x = 1;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
            player.scale.x = -1;
        }

        if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
        }

  }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
