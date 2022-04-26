import { Bopomofo } from '../../bopomofo/Bopomofo.js';

/* 
const EnhanceOptions = [
    'ㄓㄗ',
    'ㄔㄘ',
    'ㄕㄙ',
    'ㄛㄡ',
    'ㄝㄟ',
    'ㄢㄣ',
    'ㄣㄥ',
    '結合韻',
    '無',
]
*/
//將選項模式透過bopomofo查表轉換為
//config = { initials: '', media: '', vowel: '', tone: '', }的模式
//例如強化練習模式'ㄓㄗ'會轉換為config = { initials: 'ㄓㄗ' }
//然後這個config再傳給Question.answer.createChoices用來建立選項群

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