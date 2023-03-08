import AddUpdateEvent from '../../../phaser3-rex-notes/plugins/utils/gameobject/addevent/AddUpdateEvent';

class TickBehavior {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.resetFromConfig(config);
        AddUpdateEvent(gameObject, this.update, this);
    }

    // Override it
    resetFromConfig(config) {

    }

    // Override it
    update(time, delta) {

    }
}

export default TickBehavior;