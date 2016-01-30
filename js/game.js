// alert('The Doctor');
//Creates game window dimension and Auto render.t
var game = new Phaser.Game("100", "100", Phaser.AUTO);
var GameState = {
  preload: function(){
    game.load.image('player', 'assets/images/player.png');
    game.load.image('bg', 'assets/images/background.jpg');
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    land = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.5,0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.collideWorldBounds = true;
  },
  update: function(){

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
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
