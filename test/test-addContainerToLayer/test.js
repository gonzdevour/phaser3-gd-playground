import 'phaser';
import AllPlugins from '../../plugins/AllPlugins.js';
import ContainerLite from '../../../phaser3-rex-notes/plugins/containerlite.js';

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
        var img0 = this.add.image(0,0,'woman0');
        var ctnr0 = this.add.container(300, 400, img0);
        //var ctnr0 = new ContainerLite(this, 400, 400, undefined, undefined, img0);

        var img1 = this.add.image(200,200,'woman1');
        var ctnr1 = this.add.container(200, 200, img1);
        //var ctnr1 = new ContainerLite(this, 400, 400, undefined, undefined, img1);
        
        var layer0 = this.add.layer();

        layer0.add(ctnr0);
        layer0.add(ctnr1);

        //ctnr0.addToLayer(layer0);
        //ctnr1.addToLayer(layer0);


        this.idx = 0;
        this.input.on('pointerup', function(){
            this.idx ++;
            //console.log('pointerup')
            //console.log(this.idx % 2)
            //layer0.bringToTop(img0);
            if (this.idx % 2 == 1){
                console.log('bring 0 to top')
                layer0.bringToTop(ctnr0);
                //this.children.bringToTop(ctnr0.getLayer())
            } else {
                console.log('bring 1 to top')
                layer0.bringToTop(ctnr1);
                //this.children.bringToTop(ctnr1.getLayer())
            }
            
            //this.children.bringToTop(ctnr1.getLayer());
        },this)

        this.tweens.add({
            targets: [ctnr0,ctnr1],
            x: '+=100',
            duration: 1000,
            yoyo: true,
            repeat: -1,
        })

    }
    update() { }
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

var game = new Phaser.Game(config);