import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

const COLOR_MAIN = 0x4e342e; //#4e342e
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var style_bar = {
            background: { $type: 'bar', barColor: COLOR_MAIN, },
            icon: { key: 'ico_user', iconSize: 64, },
            text: { $type: 'text', fontSize: 24, },
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10, },
        }

        var style_txa = {
            background: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, radius: 10, },
            icon: { key: 'ico_user', },
            iconSize: 64,
            text: {
                $type: 'textarea',
                space: { left: 5, right: 5, top: 5, bottom: 5, text: 10 },
                text: {
                    $type: 'bbcodetext'
                },
                slider: {
                    track: { color: COLOR_DARK, radius: 8, width: 16 },
                    thumb: { color: COLOR_LIGHT, radius: 11, width: 22, },
                }
            },
            expandTextWidth: true,
            expandTextHeight: true,
            height: 80,
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 },
        }

        var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

        var buttons = this.rexUI.add.buttons({
            //x: 400, y: 300,
            origin:0,
            width: 400,
            orientation: 'y',

            buttons: [
                createButton(this, style_bar, 'style_bar'),
                createButton(this, style_txa, content),
                createButton(this, style_bar, 'CCC'),
                createButton(this, style_bar, 'DDD'),
            ],

            space: { item: 8 },
            buttonsType: 'radio'
        })
            ._locate({layerName:"main", vpx:0, vpy:0, vpxOffset:50, vpyOffset:50})
            .layout()
            .on('button.statechange', function (button, index, value, previousValue) {
                button.setActiveState(value);
            })
            .on('button.over', function (button, index, pointer, event) {
                button.setHoverState(true);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.setHoverState(false);
            })

    
        this.rexUI.add.BBCodeText(0,0,'Hover on any button',{fontSize:24})
            .setOrigin(0,1)._locate({layerName:"main", vpx:0, vpy:1, vpxOffset:50, vpyOffset:-50})

        //this.gd.add.textLabel(400,400,"main","gdSystem Test")
    }
    update ()
    {
    }
}

var createButton = function (scene, style, text) {
    return scene.rexUI.add.simpleLabel(style)
        .resetDisplayContent({
            text: text,
            icon: true,
        })
        .setName(text);
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);