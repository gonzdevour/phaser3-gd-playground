import { Bopomofo } from '../../bopomofo/Bopomofo.js';

var ParseChoiceConfig = function (config) {
    if (typeof (config) === 'string') {
        var bopomofoList = config;
        config = { initials: '', media: '', vowel: '', tone: '', };
        for (var i = 0, cnt = bopomofoList.length; i < cnt; i++) {
            var char = bopomofoList.charAt(i);
            for (var typeName in Bopomofo) {
                if (Bopomofo[typeName].indexOf(char) !== -1) {
                    config[typeName] += char;
                }
            }
        }

        for (var typeName in config) {
            if (config[typeName] === '') {
                delete config[typeName]
            }
        }
    }
    return config;
}

export default ParseChoiceConfig;