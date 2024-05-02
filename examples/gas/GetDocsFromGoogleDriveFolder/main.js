import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

import GetDocsFromGoogleDriveFolder from 'gdkPlugins/utils/gas/GetDocsFromGoogleDriveFolder.js';

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        GetDocsFromGoogleDriveFolder({
            folderId: "1Lnj1LAug-aZCGiOvjhwZ-JABuqa-XYgg",
            url: "https://script.google.com/macros/s/AKfycbzWebO96vZCKbVUL0dMemnZm852WgyzYtT8zzlMKFzik5IT7rsFKBA8_sUf51NiMoyoHA/exec",
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