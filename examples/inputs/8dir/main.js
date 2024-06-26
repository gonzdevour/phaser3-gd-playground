import 'phaser/src/phaser';
import AllPlugins from "gdkPlugins/AllPlugins.js";
import createJoystick from './create/createJoystick.js';
//class
import Player from './class/player.js';
import Ground from './class/Ground.js';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }

    create() {
        //scene

        var scene = this;
        var viewport = scene.viewport;
        scene.vpRect.setStrokeStyle(10, 0x0000ff, 1)

        //input

        this.Keyboardkeys = this.input.keyboard.addKeys('W,S,A,D,SPACE');

        // 監聽鍵盤按下事件
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === this.keys.W.keyCode) {
                console.log('W key pressed');
            } else if (event.keyCode === this.keys.S.keyCode) {
                console.log('S key pressed');
            } else if (event.keyCode === this.keys.A.keyCode) {
                console.log('A key pressed');
            } else if (event.keyCode === this.keys.D.keyCode) {
                console.log('D key pressed');
            } else if (event.keyCode === this.keys.SPACE.keyCode) {
                console.log('Space key pressed');
            }
        });

        //stage

        var bg = scene.add.image(0, 0, 'classroom')
            .setAlpha(0.2)
            ._locate({layerName:"bg", vpxOffset: viewport.centerX, vpyOffset: viewport.centerY,})

        var txtAngle = scene.rexUI.add.BBCodeText(0,0,"touchAngle", {fontSize:32})
            .setOrigin(0,0)
            ._locate({layerName:"ui", vpx:0, vpy:0, vpxOffset: 50, vpyOffset: 50})

        //arcade

        var player = new Player(scene, 100, 200);
        var ground = new Ground(scene, 0, scene.scale.gameSize.height, viewport.width, 32);
        scene.physics.add.collider(player, ground);

        //ui

        var joystick = createJoystick(scene, 'ui', 150, -150, 0, 1, {
                analog:true
            })
            .on("goTo", function(angle, dir, dist, polarX, polarY){
                player.moveforce = Math.abs(polarX*5)
            })
            .on("stop", function(){
                txtAngle.setText("stop");
            })

        //input

        var keysHub = this.plugins.get('rexKeysHub').add(this)   //輸入值總管
        .plugKeys(this.input.keyboard.createCursorKeys())        //加入keyboard方向鍵值
        .plugKeys(joystick.vector2CursorKeys.createCursorKeys()) //加入joystick方向鍵值

        this.cursorkeys = keysHub.createCursorKeys(); //統合方向鍵值

        var eightDirection = scene.plugins.get('rexEightDirection').add(player, {
            speed: 200,
            dir: '8dir',     // 0|'up&down'|1|'left&right'|2|'4dir'|3|'8dir'
            // rotateToDirection: false,
            // wrap: false,
            // padding: 0,
            // enable: true,
            cursorKeys: scene.cursorkeys
        });

        this.player = player;
        this.ground = ground;
        this.joystick = joystick;
        this.text = txtAngle;

    }

    update() { 
        // var keyboard = this.Keyboardkeys;

        // if (Phaser.Input.Keyboard.JustDown(keyboard.SPACE)) {
        //     if (this.player.body.touching.down){
        //         this.player.body.setVelocityY(-500);
        //         //this.sound.play("jump");
        //     }
        // }

        // var cursorKeys = this.cursorkeys;
        // var s = 'Key down: ';
        // for (var name in cursorKeys) {
        //     if (cursorKeys[name].isDown) {
        //         s += `${name} `;
        //     }
        // }
        // this.text.setText(s);

        // if (cursorKeys.left.isDown){
        //     this.player.body.setVelocityX(-160);
        // } else if (cursorKeys.right.isDown){
        //     this.player.body.setVelocityX(160);
        // } else {
        //     this.player.body.setVelocityX(0);
        // }

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test,
    plugins: AllPlugins,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
};

var game = new Phaser.Game(config);