// alert('The Doctor');
//Creates game window dimension and Auto render.
var w = window.innerWidth;
if (w > 500) {
    w = window.innerHeight;
}
var game = new Phaser.Game(w, w, Phaser.AUTO);
var GameState = {
  preload: function(){
    // game.load.image('player', 'assets/images/player.png');
    game.load.image('bg', 'assets/images/background.jpg');
  },
  create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        land = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');
        var dudeData = [
        '.......3.....',
        '......333....',
        '....5343335..',
        '...332333333.',
        '..33333333333',
        '..37773337773',
        '..38587778583',
        '..38588888583',
        '..37888888873',
        '...333333333.',
        '.F....5556...',
        '3E34.6757.6..',
        '.E.55.666.5..',
        '......777.5..',
        '.....6..7....',
        '.....7..7....'
    ];
    game.create.texture('player', dudeData, 4, 4, 0);
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5,0.5);
    player.width = w*0.1;
    player.height = player.width;

    game.physics.enable(player, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.collideWorldBounds = true;
  },
  update: function(){

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -w/2;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = w/2;
        }

        if (cursors.up.isDown)
        {
            player.body.velocity.y = -w/2;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = w/2;
        }

  }

};

game.state.add('GameState', GameState);
game.state.start('GameState');
