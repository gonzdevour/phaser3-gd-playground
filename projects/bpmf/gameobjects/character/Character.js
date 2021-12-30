import UI from '../../../../plugins/ui-components.js';
import Bopomofo from '../bopomofo/Bopomofo.js';

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

const Sizer = UI.Sizer;

//雖然叫作Character，其實包含字label與排好的注音sizer
class Character extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 'x';
        super(scene, config);
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);//如果有背景就在sizer加入背景
        }

        var character = GetValue(config, 'character'); //取出character label
        /* 
        config.bopomofo: {
                initials: CreatePhonologyLabel(scene, Initials), //param1是testString
                media: CreatePhonologyLabel(scene, Media),
                vowel: CreatePhonologyLabel(scene, Vowel),
                tone: CreateToneLabel(scene),
                tone0: CreateTone0Label(scene),
            }
        */
        var bopomofoConfig = GetValue(config, 'bopomofo'); //取出bopomofo label JSON
        var bopomofo = new Bopomofo(scene, bopomofoConfig); //排版後回傳BopomofoSizer
        this //基於config.orientation = 'x'，橫排
            .add(character,
                { proportion: 0, expand: true } //把character bbcodeText加入排版
            )
            .add(
                bopomofo,
                { proportion: 0, expand: true }
            )

        this //建立索引給getElement用
            .addChildrenMap('background', background)
            .addChildrenMap('character', character)
            .addChildrenMap('bopomofo', bopomofo)
    }

    setCharacter(text) { //設定字，可以傳入字串或帶有character屬性的config
        if (typeof (text) === 'string') {
            this.getElement('character').setText(text);
        } else {
            var config = text;
            this
                .setCharacter(GetValue(config, 'character', ''))
                .setBopomofo(config)
        }
        return this;
    }

    setBopomofo(config) { //設定注音
        var tone = GetValue(config, 'tone', ''),
            tone0 = '';
        if (tone === '˙') {
            tone0 = tone;
            tone = ''
        }
        this
            .setInitials(GetValue(config, 'initials', ''))
            .setMedia(GetValue(config, 'media', ''))
            .setVowel(GetValue(config, 'vowel', ''))
            .setTone(tone)
            .setTone0(tone0)

        return this;
    }

    setBopomofoVisible(visible) { //設定注音是否隱藏(出注音題)
        if (visible === undefined) {
            visible = true;
        }
        this.setChildVisible(this.getElement('bopomofo'), visible);
        return this;
    }

    setCharacterVisible(visible) { //設定字是否隱藏(出字題)
        if (visible === undefined) {
            visible = true;
        }
        this.setChildVisible(this.getElement('character'), visible);
        return this;
    }

    clearBopomofo() { //清除注音
        this.setBopomofo();
        return this;
    }

    setInitials(text) { //設定符號
        this.getElement('bopomofo').setInitials(text);
        return this;
    }

    setMedia(text) { //設定符號
        this.getElement('bopomofo').setMedia(text);
        return this;
    }

    setVowel(text) { //設定符號
        this.getElement('bopomofo').setVowel(text);
        return this;
    }

    setTone(text) { //設定符號
        this.getElement('bopomofo').setTone(text);
        return this;
    }

    setTone0(text) { //設定輕聲符號
        this.getElement('bopomofo').setTone0(text);
        return this;
    }

    setCharacterColor(color) { //設定文字顏色(可加特效)
        this.getElement('character.text').setColor(color);
        this.getElement('bopomofo').setBopomofoColor(color);
        return this;
    }
}

export default Character;