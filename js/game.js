var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var currentSpeed = 0;

EnemyPlayer = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.enemy = game.add.sprite(x, y, 'enemy', 'enemy');

    this.enemy.anchor.set(0.5);

    this.enemy.name = index.toString();
    game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.setTo(1, 1);

    this.enemy.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.enemy.rotation, 100, this.enemy.body.velocity);

};

function preload () {
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('background', 'assets/images/background.jpg');
    game.load.image('campfire', 'assets/images/campfire.png');
}

function create () {

    game.world.setBounds(-1000, -1000, 2000, 2000);

    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    background.fixedToCamera = true;

    campfire = game.add.sprite(0, 0, 'campfire');
    campfire.anchor.setTo(0.5, 0.5);

    player = game.add.sprite(100, 100, 'player');
    player.anchor.setTo(0.5, 0.5);

    game.physics.enable([player, campfire], Phaser.Physics.ARCADE);

    player.body.drag.set(0.2);
    player.body.maxVelocity.setTo(400, 400);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    enemies = [];

    enemiesTotal = 20;
    enemiesAlive = 20;

    for (var i = 0; i < enemiesTotal; i++)
    {
        enemies.push(new EnemyPlayer(i, game, player));
    }

    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

}

function collisionHandler (campfire, player) {

   console.log('damage')

}

function update () {

    game.physics.arcade.overlap(campfire, player, collisionHandler, null, this);


    if (cursors.left.isDown)
    {
        player.angle -= 4;
    }
    else if (cursors.right.isDown)
    {
        player.angle += 4;
    }

    if (cursors.up.isDown)
    {
        //  The speed we'll travel at
        currentSpeed = 300;
    }
    else
    {
        if (currentSpeed > 0)
        {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);
    }

    background.tilePosition.x = -game.camera.x;
    background.tilePosition.y = -game.camera.y;

}

function render () {

}