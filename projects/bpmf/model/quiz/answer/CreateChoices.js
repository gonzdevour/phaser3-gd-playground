import {
    Bopomofo,
    Media as ConstMedia, //傳入字串，直接指定選項群
    Tone as ConstTone,  //傳入字串，直接指定選項群
} from '../../bopomofo/Bopomofo.js';

//utils
import GetValue from '../../../../../plugins/utils/object/GetValue.js';
import Shuffle from '../../../../../plugins/utils/array/Shuffle.js';

//各複製一份array list
//物件, 陣列的import是匯入同一個物件，所以如果不用slice複製一份的話會改到原本的內容。
const initialsList = Bopomofo.initials.slice();
const mediaList = Bopomofo.media.slice();
const vowelList = Bopomofo.vowel.slice();
const toneList = Bopomofo.tone.slice();

var CreateChoices = function (config) {
    var answer = GetValue(config, 'answer'); //在Answer class呼叫時給的answer屬性
    var initials = GetValue(config, 'initials', 5);//沒有initial數值則回傳5(個選項)
    var media = GetValue(config, 'media', ConstMedia);//傳入字串一ㄨㄩ，直接指定選項群
    var vowel = GetValue(config, 'vowel', 5);//沒有vowel數值則回傳5(個選項)
    var tone = GetValue(config, 'tone', ConstTone);//傳入字串輕一二三四聲，直接指定選項群
    var shuffleInitials = GetValue(config, 'shuffleInitials', true);//聲母選項群是否要洗牌
    var shuffleMedia = GetValue(config, 'shuffleMedia', false);//一ㄨㄩ選項群是否要洗牌
    var shuffleVowel = GetValue(config, 'shuffleVowel', true);//韻母選項群是否要洗牌
    var shuffleTone = GetValue(config, 'shuffleTone', false);//音調選項群是否要洗牌

    //如果initials,media,vowel,tone是數字，則從該list取出該數目的item
    //function getItems(保留項, list, 取幾個)
    var choices = {
        initials: GetItems(answer.initials, initialsList, initials), //任取5個
        media: GetItems(answer.media, mediaList, media), //[...media]
        vowel: GetItems(answer.vowel, vowelList, vowel), //任取5個
        tone: GetItems(answer.tone, toneList, tone), //[...tone]
    }
    //取完選項群之後，如果選項群需要洗牌:
    if (shuffleInitials) { //如果聲母選項群要洗牌
        Shuffle(choices.initials);
    }
    if (shuffleMedia) { //如果一ㄨㄩ選項群要洗牌
        Shuffle(choices.media);
    }
    if (shuffleVowel) { //如果韻母選項群要洗牌
        Shuffle(choices.vowel);
    }
    if (shuffleTone) { //如果音調選項群要洗牌
        Shuffle(choices.tone);
    }

    return choices;
}

//getItems(保留項, list, 取幾個)
var GetItems = function (preserveItem, items, count) {
    var out = [];
    //count有可能是number(未指定選項群)也可能是字串(指定選項群)
    if (typeof (count) === 'number') { //未指定選項群
        if (preserveItem !== '') { //有保留項
            out.push(preserveItem); //先存入保留項
        }
        items = Shuffle(items); //對list洗牌
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            var item = items[i]; //依序取出
            if (item === preserveItem) { //如果是保留項就跳過
                continue;
            }
            out.push(item); //不是保留項就存入選項群
            if (out.length === count) { //選項群數目等於count時結束loop
                break;
            }
        }
    } else { //有指定選項群(count為字串)
        out = [...count]; //將count展開為逗點分隔參數，構成array
    }

    return out;
}

export default CreateChoices;