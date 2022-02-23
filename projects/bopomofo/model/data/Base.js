class Base {
    constructor(model, dataManager, defaultData) {
        // Ability to access another data object
        this.model = model;

        // Storage of these data, shared with other data object
        this.data = dataManager;  // LS data

        // Define keys belong this data object, and default value of these keys
        this.defaultData = defaultData;
    }

    get(key) {
        var result;
        if (typeof (key) === 'string') {
            // Can't get key which is not belong this data scope
            if (key in this.defaultData) {
                result = this.data.get(key);
            }

        } else {
            result = {};
            for (var key in this.defaultData) {
                result[key] = this.data.get(key);
            }
        }

        return result;
    }

    set(key, value) {
        if (typeof (key) === 'string') {
            // Can't set key which is not belong this data scope
            if (key in this.defaultData) {
                this.data.set(key, value);
            }

        } else {
            var data = key;
            for (var key in this.defaultData) {
                this.data.set(key, data[key]);
            }
        }
        return this;
    }
}

export default Base;