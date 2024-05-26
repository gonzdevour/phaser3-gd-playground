import ObjectFactory from './ObjectFactory.js';
import { OnSceneStart, OnSceneStop } from './OnSceneStartStop.js';
import TextLabelFactory from './textlabel/Factory.js';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory.js';

class GDSystemPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        // Private objects of this GD system
        this.viewport; // Phaser.Geom.Rectangle;
        this.layerManager;  // scene.rexUI.add.layerManager
        this.vpRect; // scene.rexUI.add.roundRectangle

        this.add = new ObjectFactory(this);
    }

    boot() {
        var eventEmitter = this.scene.events;
        eventEmitter
            .on('destroy', this.destroy, this)
            .on('start', OnSceneStart, this)
            .on('shutdown', OnSceneStop, this)
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }
}
export default GDSystemPlugin;