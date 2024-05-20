import ObjectFactory from './ObjectFactory.js';
import TextLabelFactory from './textlabel/Factory.js';

class GDSystemPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(this);
    }

    boot() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.bootLayerManager();
    }

    bootLayerManager() {
        this.layers;

        var eventEmitter = this.scene.events;
        eventEmitter
            .on('start', function () {
                this.layers = this.scene.rexUI.add.layerManager({
                    layers: [
                        { name: 'ui', cameraName: 'ui' }
                    ]
                })
            }, this)
            .on('shutdown', function () {
                this.layers.destroy();
                this.layers = undefined;
            }, this)
    }
}
export default GDSystemPlugin;