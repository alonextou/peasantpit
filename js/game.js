var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

//var currentSpeed = 0;

function preload () {
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('background', 'assets/images/background.jpg');
    game.load.image('campfire', 'assets/images/campfire.png');
}

function create () {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    game.world.setBounds(0, 0, 2000, 2000);

    background = game.add.tileSprite(0, 0, 800, 800, 'background');
    background.fixedToCamera = true;

    // campfire
    campfire = game.add.sprite(game.world.centerX, game.world.centerY, 'campfire');
    //game.physics.arcade.enable(campfire);
    //campfire.anchor.setTo(0.5, 0.5);

    // player
    player = game.add.sprite(game.world.centerX + 200, game.world.centerY + 200, 'player');
    //game.physics.arcade.enable(player);
    game.physics.p2.enable(player);
    //player.scale.setTo(.4, .4);
    //player.anchor.setTo(0.5, 0.5);
    //player.body.collideWorldBounds = true;

    // enemy
    enemy = game.add.sprite(game.world.centerX - 200, game.world.centerY - 200, 'enemy');
    //game.physics.arcade.enable(enemy);
    game.physics.p2.enable(enemy);
    //enemy.scale.setTo(.4, .4);
    //enemy.anchor.setTo(0.5, 0.5);
    //enemy.body.drag.set(1000);
    //enemy.body.collideWorldBounds = true;

    // camera
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(200, 200, 400, 400);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

}

function playerBurning (campfire, player) {

    console.log('player damage');
    player.tint = 0xff0000;

}

function enemyBurning (campfire, player) {

    console.log('enemy damage');
    enemy.tint = 0xff0000;

}

function update () {

    player.tint = 0xffffff;
    game.physics.arcade.overlap(campfire, player, playerBurning);
    game.physics.arcade.overlap(campfire, enemy, enemyBurning);
    game.physics.arcade.collide(enemy, player);

    if (cursors.left.isDown)
    {
        player.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        player.body.rotateRight(100);
    }
    else
    {
        player.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        player.body.thrust(400);
        player.body.velocity = 0; 
    }
    else if (cursors.down.isDown)
    {
        player.body.reverse(400);
    }

    /*
    if (cursors.left.isDown)
    {
        player.angle -= 5;
    }
    else if (cursors.right.isDown)
    {
        player.angle += 5;
    }

    if (cursors.up.isDown)
    {
        currentSpeed = 200;
    }
    else
    {
        currentSpeed = 0;
    }
    */



    //game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);

    background.tilePosition.x = -game.camera.x;
    background.tilePosition.y = -game.camera.y;

}

function render () {

}