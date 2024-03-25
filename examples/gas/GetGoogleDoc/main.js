import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

import GetGoogleDoc from 'gdkPlugins/utils/gas/GetGoogleDoc.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        GetGoogleDoc({
            id: "1ah6JWl0UF62lnTWr4gjLMabXxi8SE7iVO-R3aDz45O4",
            url: "https://script.google.com/macros/s/AKfycbxH5HrHZxKAAX0M5PjNnDCbFm0yXikH8Tw1P5ptKQ2m6CN5tYDD8cPUSD1DO2ymRgpa2Q/exec",
        }).then(data => {
            console.log('Received data:\n', data);
        }).catch(error => {
            console.error('Error during gasReq call:\n', error);
        });   
    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);