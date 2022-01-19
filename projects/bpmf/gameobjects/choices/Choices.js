import UI from '../../../../plugins/ui-components.js';
import { TypeNames } from '../../model/bopomofo/Bopomofo.js';

//utils
import GetValue from '../../../../plugins/utils/object/GetValue.js';

const Sizer = UI.Sizer;
const Buttons = UI.Buttons;

/* 
    由quizPanel/CreateChoices.js呼叫new Choices：
    var config = {
        background: CreateRoundRectangleBackground(scene, 0, undefined, 0xffffff, 2),
        initials: [],
        media: [],
        vowel: [],
        tone: [],
        space: {
            left: 10, right: 10, top: 10, bottom: 10, row: 10, column: 10
        }
    }
    傳進這裡時，initials, media, vowel, tone都已經是以常數指定個數的label array
*/

class Choices extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('space')) {
            config.space = {};
        }


        config.space.item = GetValue(config, 'space.row', config.space.item); //以列間距為item左右間距
        config.orientation = 'y';
        super(scene, config);
        //用new的物件需要add.existing才會顯示在scene上(this.add.xxx不用是因為裡面包含了new+add.existing)
        scene.add.existing(this);

        var background = GetValue(config, 'background');
        if (background) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        var buttonsSpace = {
            item: GetValue(config, 'space.column', 0),
        }
        //對initials, media, vowel, tone各給一組橫排buttons，並將每組buttons豎排進sizer裡
        for (let i = 0, icnt = TypeNames.length; i < icnt; i++) {
            let groupName = TypeNames[i];
            let buttons = GetValue(config, groupName);//取得label array
            let buttonsSizer = new Buttons(scene, {
                orientation: 'x',
                buttons: buttons,
                space: buttonsSpace,
                expand: true,
                eventEmitter: this,
                groupName: groupName,
            })

            this
                .add(
                    buttonsSizer,
                    { proportion: 1, expand: true }
                )
                .addChildrenMap(groupName, buttons)
                .addChildrenMap(`${groupName}Sizer`, buttonsSizer)

            //這邊的按鈕行為不用buttons的radio屬性處理，就是因為「第二次按下為取消」的需求
            this
                .on(`changedata-${groupName}`, function (gameObject, value, previousValue) {
                    if (value === previousValue) { //前值與後值相同，不處理
                        return;
                    }

                    //unselect和select會在quizpanel/CreateChoices時被掛上去
                    if (previousValue >= 0) { //前值有選取，取消該選取
                        this.emit('unselect', this.getButton(groupName, previousValue), groupName);
                    }

                    if (value >= 0) { //後值有選取，執行該選取
                        this.emit('select', this.getButton(groupName, value), groupName);
                    }

                    //change會掛在quizpanel/CreateQuizPanel
                    this.emit('change', this.getChoiceResult()); //傳遞此次選取的結果
                }, this)
                .setData(groupName, -1);
        }

        this.on('button.click', function (button, groupName, index, pointer, event) {
            var prevButtonIndex = this.getData(groupName);

            //gameObject內建data，setData(key,value)觸發gameObject.on('changedata-key')
            if (prevButtonIndex === index) {
                this.setData(groupName, -1); //按了同一個按鈕時為取消此按鈕
            } else {
                this.setData(groupName, index);
            }
        }, this);

        this.clearChoices();
    }

    //取得某一組的第某個按鈕
    getButton(groupName, index) {
        return this.getElement(groupName)[index];
    }

    //設定選項文字
    setChoicesText(data) {
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            var groupName = TypeNames[i];
            var textArray = data[groupName];
            if (!textArray) {
                continue;
            }

            var buttons = this.getElement(groupName);
            var textArrayLength = textArray.length;
            for (var j = 0, jcnt = buttons.length; j < jcnt; j++) {
                if (j < textArrayLength) {
                    buttons[j].show().setText(textArray[j]);
                } else {
                    buttons[j].hide()
                }
            }
        }

        return this;
    }

    //清除選項
    clearChoices() {
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            this.setData(TypeNames[i], -1);
        }

        // Set tone to ' ' as default value
        this.setData('tone', 1);

        return this;
    }

    //取得目前選項選取狀態JSON
    getChoiceResult(out) {
        if (out === undefined) {
            out = {};
        }
        for (var i = 0, icnt = TypeNames.length; i < icnt; i++) {
            var value = '';
            var groupName = TypeNames[i];
            var buttonIndex = this.getData(groupName);
            if (buttonIndex >= 0) {
                value = this.getButton(groupName, buttonIndex).text;
            }
            out[groupName] = value;
        }
        return out;
    }
}

export default Choices;