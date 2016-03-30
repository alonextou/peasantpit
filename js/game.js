var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.time.advancedTiming = true;

    game.load.image('stars', 'assets/images/background.jpg');
    game.load.image('player', 'assets/images/player.png');
    game.load.image('playerArms', 'assets/images/player.png');
    game.load.image('sheep1', 'assets/images/sheep.png');
    game.load.image('sheep2', 'assets/images/sheep.png');
    game.load.image('campfire', 'assets/images/campfire.png');
    game.load.image('fire1', 'assets/images/fire1.png');
    game.load.image('fire2', 'assets/images/fire2.png');
    game.load.image('fire3', 'assets/images/fire3.png');
    game.load.image('smoke', 'assets/images/smoke-puff.png');

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

    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
    emitter.setAlpha(1, 0, 2000);
    emitter.setScale(0.8, 0, 0.8, 0, 2000);
    emitter.start(false, 2000, 5);

    // sheep1
    sheep1 = game.add.sprite(game.world.randomX, game.world.randomY, 'sheep1');
    game.physics.p2.enable(sheep1, false);
    sheep1.body.setCircle(40, 0, 0, 0);
    sheep1.body.damping = .99;
    sheep1.body.angularDamping = 1;
    sheep1.body.fixedRotation = true;

    // sheep2
    sheep2 = game.add.sprite(game.world.randomX, game.world.randomY, 'sheep2');
    game.physics.p2.enable(sheep2, false);
    sheep2.body.setCircle(40, 0, 0, 0);
    sheep2.body.damping = .99;
    sheep2.body.angularDamping = 1;
    //sheep2.body.fixedRotation = true;

    // playerArms
    playerArms = game.add.sprite(200, 200, 'playerArms');
    game.physics.p2.enable(playerArms, false);
    playerArms.body.clearShapes();
    playerArms.body.loadPolygon('playerPhysics', 'playerArms');
    playerArms.body.damping = 1;
    playerArms.alpha = 0;

    // player
    player = game.add.sprite(200, 200, 'player');
    player.anchor.setTo(.5);
    game.physics.p2.enable(player, false);
    player.body.setCircle(30, 0, 40, 0);
    player.body.damping = 1;


    game.camera.follow(player);

    game.physics.p2.setPostBroadphaseCallback(collideCampfire, this);

    cursors = game.input.keyboard.createCursorKeys();

}

function spriteBurning (object) {
  console.log('player damage');
  eval(object).tint = 0xff0000;
  eval(object).body.thrust(-500);

  //emitter = game.add.emitter(eval(object).body.x, eval(object).body.y, 100);
  //emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
  //emitter.setAlpha(1, 0, 100);
  //emitter.start(false, 100, null, 1);

}

function collideCampfire (body1, body2) {
    var hasPlayer = (body1.sprite.key === 'player' || body2.sprite.key === 'player');
    var hasPlayerArms = (body1.sprite.key === 'playerArms' || body2.sprite.key === 'playerArms');
    var hasCampfire = (body1.sprite.key === 'campfire' || body2.sprite.key === 'campfire');

    //if (hasCampfire) console.log('campfire')
    if (body1.sprite.key === 'sheep1') {
      //eval(body1.sprite.key).body.thrust(0);
      console.log('sheep1')
    } else if (body2.sprite.key === 'sheep2') {
      //eval(body2.sprite.key).body.thrust(0);
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

    s1angle = Math.atan2(campfire.body.y - sheep1.body.y, campfire.body.x - sheep1.body.x) * 180 / Math.PI;
    sheep1.body.angle = -s1angle;
    sheep1.body.thrust(500);

    s2angle = Math.atan2(campfire.body.y - sheep2.body.y, campfire.body.x - sheep2.body.x) * 180 / Math.PI;
    sheep2.body.angle = -s2angle;
    sheep2.body.thrust(500);

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

    game.debug.text(game.time.fps + 'fps: Sacrifice all the things!', 32, 32);

}
