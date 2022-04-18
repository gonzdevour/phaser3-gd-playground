import ModalDialogPromise from '../modeldialog/ModalDialogPromise.js';
import Character from '../../../gameobjects/character/Character.js'
import { Initials, Media, Vowel } from '../../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';

/*
從build\control\quiz\QuizPromise.js取得作答結果並呼叫：

result: 
    var verifyResult = {
        result: isPass, //是否通過
        input: result, //答案內容
        word: question.word,//題目詞
        character: (isPass && polyphonyCharacter) ? polyphonyCharacter : question.character //題目字
    }
*/
var QuizResultModalPromise = function (scene, result, onCloseCallback) {
    if (result.result) {  //答對回傳content:打勾圖片
        scene.model.sound.play(scene, 'right');
        return  ModalDialogPromise(scene, {
            content: scene.add.image(0, 0, 'right').setDisplaySize(540, 540),
            background: null,
            buttonMode: 0,
        })

    } else {  // 答錯回傳content:正確答案Character
        // TODO: Style Character
        var characterUI = new Character(scene, { //character label和BopomofoSizer組成CharacterSizer
            // background: CreateRoundRectangleBackground(scene),
            character: scene.rexUI.add.label({
                height: (55 * 3) + 2,  // Min height
                // background: CreateRoundRectangleBackground(scene),
                text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.character),
                align: 'right',
                space: { left: 50, right: 5, top: 5, bottom: 5 } //left給50是為了讓整個Character在dialog中往右移
            }),

            bopomofo: { //這些label之後會以config傳入new Bopomofo排好後回傳BopomofoSizer
                initials: CreatePhonologyLabel(scene, Initials), //param1是testString
                media: CreatePhonologyLabel(scene, Media),
                vowel: CreatePhonologyLabel(scene, Vowel),
                tone: CreateToneLabel(scene),
                tone0: CreateTone0Label(scene),
            }
        })
            .setCharacter(result.character) //設定character label的bbcodeText

        return ModalDialogPromise(scene, {
            content: characterUI, //在Modal Dialog的content處放CharacterSizer
            buttonMode: 1,
        })
    }
}

var CreatePhonologyLabel = function (scene, testString) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.phonology),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateToneLabel = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'left',
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
}

var CreateTone0Label = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone0),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: 0 }
    })
}

export default QuizResultModalPromise;