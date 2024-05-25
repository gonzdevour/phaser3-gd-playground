import ObjectFactory from './ObjectFactory.js';
import DefaultLayers from './layer/DefaultLayers.js';
import SetupViewport from './viewport/SetupViewport.js';
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

    destroy() {
        this.add.destroy();
        super.destroy();
    }

    bootViewport() {
        SetupViewport(this.scene, true)
    }

    bootLayerManager() {
        this.scene.layerManager;

        var eventEmitter = this.scene.events;
        eventEmitter
            .on('start', function () {
                this.scene.layerManager = this.scene.rexUI.add.layerManager(DefaultLayers)
                this.bootViewport();//viewport的測試框與clickArea依於layer，所以要先做完BootLayerManager
            }, this)
            .on('shutdown', function () {
                this.scene.layerManager.destroy();
                this.scene.layerManager = undefined;
            }, this)
    }
}
export default GDSystemPlugin;