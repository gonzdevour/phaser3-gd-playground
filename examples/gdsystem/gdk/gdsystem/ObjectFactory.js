class ObjectFactory {
    constructor(system) {
        this.system = system;
        this.scene = system.scene;
        this.displayList = this.scene.sys.displayList;
        this.updateList = this.scene.sys.updateList;

        this.scene.events.once('destroy', this.destroy, this);
    }

    destroy() {
        this.system = null;
        this.scene = null;
        this.displayList = null;
        this.updateList = null;
    }

    static register(type, callback) {
        ObjectFactory.prototype[type] = callback;
    }
};
export default ObjectFactory;