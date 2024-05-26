import 'phaser/src/phaser';
import AllPlugins from "gdkPlugins/AllPlugins.js";

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
        var scene = this;
        var viewport = scene.viewport;
        scene.vpRect.setStrokeStyle(10, 0x0000ff, 1)
        scene.vpc = scene.plugins.get('rexViewportCoordinate');

        var bg = scene.add.image(0, 0, 'classroom')
            .setAlpha(0.2)
            ._locate({layerName:"bg", vpxOffset: viewport.centerX, vpyOffset: viewport.centerY,})

        var txtAngle = scene.rexUI.add.BBCodeText(0,0,"touchAngle", {fontSize:32})
            .setOrigin(0,0)
            ._locate({layerName:"ui", vpx:0, vpy:0, vpxOffset: 50, vpyOffset: 50})

        var inputCircleBg = scene.add.circle(0, 0, 100, 0xaaaaaa).setStrokeStyle(5, 0xffffff, 1).setAlpha(0.5)
            ._locate({layerName:"ui", vpx:0, vpy:1, vpxOffset: 150, vpyOffset: -150})
        
        var inputCircleThumb = scene.add.circle(0, 0, 30, 0xaaaaaa).setStrokeStyle(5, 0xffffff, 1).setAlpha(1)
            ._locate({layerName:"ui", vpx:0, vpy:1, vpxOffset: 150, vpyOffset: -150})

        var inputArea = scene.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888).setOrigin(0,0)
            .setInteractive()
            ._locate({layerName:"clickArea", vpx:0, vpy:0})
            .on('pointerdown', function(pointer, localX, localY, event){
                inputArea.controlCenterX = pointer.x;
                inputArea.controlCenterY = pointer.y;
            })
            .on('pointermove', function(pointer, localX, localY, event){ //pc上不用按住就會觸發
                let p1 = {x: inputArea.controlCenterX, y: inputArea.controlCenterY};
                let p2 = {x: pointer.x, y: pointer.y};
                let rad = Phaser.Math.Angle.BetweenPoints(p1, p2);

                let deg = Phaser.Math.RadToDeg(rad);
                txtAngle.setText(deg.toFixed());

                let toX = inputCircleBg.x + 70 * Math.cos(rad);
                let toY = inputCircleBg.y + 70 * Math.sin(rad);
                inputCircleThumb.setPosition(toX, toY)

                let dur = pointer.getDuration() //取得累積拖曳時間
                //console.log(`dragDuration=${dur}`)
            })
        scene.input.on('pointerup', function(pointer, localX, localY, event){
            inputCircleThumb.setPosition(inputCircleBg.x, inputCircleBg.y)
        })
        scene.plugins.get('rexAnchor').add(inputArea, {
            //left: 'left+10',
            //top: 'top+10',
            width: '50%',
            height: '100%',
        });
    }

    update() { }
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
};

var game = new Phaser.Game(config);