import ObjectFactory from './ObjectFactory.js';
import TextLabelFactory from './textlabel/Factory.js';

class GDSystemPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(this);
    }

    boot() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('shutdown', this.destroy, this);

        this.layers = this.scene.rexUI.add.layerManager({
            layers: [
                { name: 'ui', cameraName: 'ui' }
            ]
        })
    }
}
export default GDSystemPlugin;