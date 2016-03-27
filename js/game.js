var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('stars', 'assets/images/background.jpg');
    game.load.image('player', 'assets/images/player.png');
    game.load.image('playerArms', 'assets/images/player.png');
    game.load.image('sheep1', 'assets/images/sheep.png');
    game.load.image('sheep2', 'assets/images/sheep.png');
    game.load.image('campfire', 'assets/images/campfire.png');

    game.load.physics("playerPhysics", "assets/player_collision.json");
}

var starfield;
var campfire;
var player;
var playerArms;
var sheep1;
var sheep2;
var cursors;

function create() {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = .1;

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
    starfield.fixedToCamera = true;

    // campfire
    campfire = game.add.sprite(game.world.centerX, game.world.centerY, 'campfire');
    campfire.anchor.setTo(.5);
    game.physics.p2.enable(campfire, false);
    campfire.body.setCircle(40, 0, 0, 0);

    // sheep1
    sheep1 = game.add.sprite(game.world.randomX, game.world.randomY, 'sheep1');
    game.physics.p2.enable(sheep1, true);
    sheep1.body.setCircle(30, 0, 0, 0);
    sheep1.body.damping = .99;
    sheep1.body.angularDamping = 1;

    // sheep2
    sheep2 = game.add.sprite(game.world.randomX, game.world.randomY, 'sheep2');
    game.physics.p2.enable(sheep2, true);
    sheep2.body.setCircle(30, 0, 0, 0);
    sheep2.body.damping = .99;
    sheep2.body.angularDamping = 1;

    // player
    player = game.add.sprite(200, 200, 'player');
    player.anchor.setTo(.5);
    game.physics.p2.enable(player, true);
    player.body.setCircle(30, 0, 40, 0);
    player.body.damping = 1;

    // playerArms
    playerArms = game.add.sprite(200, 200, 'playerArms');
    game.physics.p2.enable(playerArms, true);
    playerArms.body.clearShapes();
    playerArms.body.loadPolygon('playerPhysics', 'playerArms');
    playerArms.body.damping = 1;
    playerArms.alpha = 0;


    game.camera.follow(player);

    game.physics.p2.setPostBroadphaseCallback(collideCampfire, this);

    cursors = game.input.keyboard.createCursorKeys();

}

function spriteBurning (object) {
  console.log('player damage');
  eval(object).tint = 0xff0000;
  eval(object).body.thrust(-100);
}

function collideCampfire (body1, body2) {
    var hasPlayer = (body1.sprite.key === 'player' || body2.sprite.key === 'player');
    var hasPlayerArms = (body1.sprite.key === 'playerArms' || body2.sprite.key === 'playerArms');
    var hasCampfire = (body1.sprite.key === 'campfire' || body2.sprite.key === 'campfire');

    //if (hasCampfire) console.log('campfire')
    if (body1.sprite.key === 'sheep1') {
      eval(body1.sprite.key).body.thrust(0);
      console.log('sheep1')
    } else if (body2.sprite.key === 'sheep2') {
      eval(body2.sprite.key).body.thrust(0);
      console.log('sheep2');
    }

    if (hasPlayer) {
      if (hasCampfire) {
        spriteBurning('player')
        return false;
      }
      if (hasPlayerArms) {
        return false;
      }
    }

    if (body1.sprite.key === 'campfire') {
      spriteBurning(body2.sprite.key);
      return false;
    } else if (body2.sprite.key === 'campfire') {
      spriteBurning(body1.sprite.key);
      return false;
    }

    return true;
}

function update() {

    player.tint = 0xffffff;
    sheep1.tint = 0xffffff;
    sheep2.tint = 0xffffff;

    sheep1.body.thrust(100);
    sheep2.body.thrust(100);

    if (cursors.left.isDown)
    {
        player.body.rotateLeft(90);
    }
    else if (cursors.right.isDown)
    {
        player.body.rotateRight(90);
    } else {
      player.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        player.body.thrust(30000);
    }
    else if (cursors.down.isDown)
    {
        player.body.thrust(-30000);
    }

    if (!game.camera.atLimit.x)
    {
        starfield.tilePosition.x += (player.body.velocity.x * 16) * game.time.physicsElapsed;
    }

    if (!game.camera.atLimit.y)
    {
        starfield.tilePosition.y += (player.body.velocity.y * 16) * game.time.physicsElapsed;
    }

    playerArms.body.x = player.body.x
    playerArms.body.angle = player.body.angle
    playerArms.body.y = player.body.y

}

function render() {

    game.debug.text('Sacrifice all the things!', 32, 32);

}
