import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data.js';

class Base {
    constructor(dataManager, defaultData) {
        // Storage of data
        if (typeof (dataManager) === 'string') {
            var name = dataManager;
            dataManager = new LocalStorageData({
                name: name,
                default: defaultData
            });
        }
        this.data = dataManager;

        // Define keys belong this data object
        this.defaultData = defaultData;
    }

    get(key) {
        var result;
        if (typeof (key) === 'string') {
            result = this.data.get(key);
        } else {
            result = this.data.getAll();
        }

        return result;
    }

    set(key, value) {
        this.data.set(key, value);
        return this;
    }

    getDefaultValue(key) {
        var result;
        if (typeof (key) === 'string') {
            result = this.defaultData[key]

        } else {
            result = { ...this.defaultData };
        }

        return result;
    }
}

export default Base;