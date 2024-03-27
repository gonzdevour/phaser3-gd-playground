import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import CreateCommandExecutor from './commandexecutor/CreateCommandExecutor.js';
import GetGoogleDocAll from 'gdkPlugins/utils/gas/GetGoogleDocAll.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var scene = this;
        scene.rexScaleOuter.scale();

        var mds = initMds(scene); //建立mds

        GetGoogleDocAll([
            {
            id: "1ah6JWl0UF62lnTWr4gjLMabXxi8SE7iVO-R3aDz45O4",
            url: "https://script.google.com/macros/s/AKfycbxH5HrHZxKAAX0M5PjNnDCbFm0yXikH8Tw1P5ptKQ2m6CN5tYDD8cPUSD1DO2ymRgpa2Q/exec",
            },
        ]).then(results => {
            results.forEach((result, index) => {
                console.log(`Result ${index + 1}:\n`, result);
                mds.addEventSheet(result); //導入劇本
            });
            scene.input.once('pointerdown', function () {
                print.text = '';
                mds.start(); //點擊播放劇本
            })
        }).catch(error => {
            console.error('Error during gasReq call:\n', error);
        });
    }
    update ()
    {
    }
}

var initMds = function(scene){

    var eventSheetManager = scene.plugins.get('rexMarkedEventSheets').add({
        commandExecutor: CreateCommandExecutor(scene)
    })

    var print = scene.add.text(0, 570, '', { fontSize: 20, backgroundColor: 'grey' }).setDepth(100);
    print.text = 'Any click to start';

    eventSheetManager
        .on('pause.input', function () {
            print.text = 'Wait any click to continue';
        })
        .on('resume.input', function () {
            print.text = '';
        })
        .on('complete', function () {
            print.text = 'Complete';
            console.log(eventSheetManager.memory)
        })
    
    return eventSheetManager;
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);