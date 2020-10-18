var Popa = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function Popa() {
            Phaser.Scene.call(this, { key: 'Popa' });
            this.bricks;
            this.bullet;
            this.background;
            this.main;
            this.buttons;
            this.topbar;
            this.pieces;
            this.timedEvent;
            this.buttonD;
            this.bgm;
            this.score = 0;
            this.scoreText;
        },

    preload: function () {
        this.load.image('background', 'assets/background.png');
        this.load.image('main', 'assets/main.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('topbar', 'assets/topbar.png');
        this.load.image('piece', 'assets/piece.png');
        this.load.spritesheet('spriteD', 'assets/spriteD.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteF', 'assets/spriteF.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteJ', 'assets/spriteJ.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteK', 'assets/spriteK.png', { frameWidth: 100, frameHeight: 100 });
        this.load.audio('bass', 'assets/Popa Theme 2.mp3');
    },

    create: function () {

        this.bgm = this.sound.add('bass', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.bgm.play();

        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.main = this.physics.add.staticGroup();
        this.main.create(200, 0, 'main').setOrigin(0, 0);

        // create buttons group
        this.buttons = this.physics.add.staticGroup();
        this.buttons.create(250, 550, 'spriteD');
        this.buttons.create(350, 550, 'spriteF');
        this.buttons.create(450, 550, 'spriteJ');
        this.buttons.create(550, 550, 'spriteK');

        // create pieces group
        this.pieces = this.physics.add.group({
            velocityY: 100,
        });

        // set key bindings
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);


        this.topbar = this.physics.add.staticGroup();
        this.topbar.create(400, 10, 'topbar');

        this.bullet = this.physics.add.group({
            velocityY: -100
        });


        this.scoreText = this.add.text(620, 16, "Score: 0", { fontSize: '32px', fill: '#ffffff' });

        //  Our colliders
        this.physics.add.collider(this.bullet, this.topbar, this.collideWithTop, null, this);
        this.physics.add.collider(this.bullet, this.pieces, this.collideWithPiece, null, this);
        this.physics.add.collider(this.pieces, this.buttons, this.collideWithButton, null, this);

        // timer
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.createPiece, callbackScope: this, loop: true });
    },

    collideWithPiece: function (bullet, piece) {
        bullet.disableBody(true, true);
        piece.disableBody(true, true);
        this.score++;
        console.log(this.score);
        this.scoreText.setText('Score: ' + this.score);
    },

    collideWithTop: function (bullet, topbar) {
        bullet.disableBody(true, true);
    },

    collideWithButton: function (piece, button) {
        piece.disableBody(true, true);
    },

    update: function () {
        //  Input events
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.bullet.create(250, 470, 'bullet');
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.bullet.create(350, 470, 'bullet');
        }
        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.bullet.create(450, 470, 'bullet');
        }
        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            this.bullet.create(550, 470, 'bullet');
        }
    },

    createPiece: function () {
        var randColumn = Math.floor(Math.random() * 4); // random int from 0-3
        if (randColumn == 0) {
            this.pieces.create(250, 65, 'piece');
        }
        else if (randColumn == 1) {
            this.pieces.create(350, 65, 'piece');
        }
        else if (randColumn == 2) {
            this.pieces.create(450, 65, 'piece');
        }
        else if (randColumn == 3) {
            this.pieces.create(550, 65, 'piece');
        }
    }

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [Popa],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);
