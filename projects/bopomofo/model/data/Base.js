import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data.js';

class Base {
    constructor(model, dataManager, defaultData) {
        // Ability to access other data object
        this.model = model;

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
        var dataManager = this.data;
        var result;
        if (typeof (key) === 'string') {
            // Can't get key which is not belong this data object
            if (key in this.defaultData) {
                result = dataManager.get(key);
            }

        } else {
            result = {};
            for (var key in this.defaultData) {
                result[key] = dataManager.get(key);
            }
        }

        return result;
    }

    set(key, value) {
        var dataManager = this.data;
        if (typeof (key) === 'string') {
            // Can't set key which is not belong this data object
            if (key in this.defaultData) {
                dataManager.set(key, value);
            }

        } else {
            var data = key;
            for (var key in this.defaultData) {
                dataManager.set(key, data[key]);
            }
        }
        return this;
    }

    getDefaultValue(key) {
        var result;
        if (typeof (key) === 'string') {
            // Can't get key which is not belong this data object
            result = this.defaultData[key]

        } else {
            result = { ...this.defaultData };
        }

        return result;
    }
}

export default Base;