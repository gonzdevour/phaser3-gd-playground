import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Character } from '../../../gameobjects/quizpanel.js';
import { Initials, Media, Vowel } from '../../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';

//建立字與注音的label群後，透過gameobjects/Character.js的new Character(包含new Bopomofo)進行排列
//注意這個階段並不給予text內容，而只是將組件排版
var CreateCharacter = function (scene,) {
    var characterUI = new Character(scene, {
        background: CreateRoundRectangleBackground(scene),
        character: scene.rexUI.add.label({
            height: (55 * 3) + 2,  // Min height
            background: CreateRoundRectangleBackground(scene),
            text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.character),
            align: 'right',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            initials: CreatePhonologyLabel(scene, Initials),
            media: CreatePhonologyLabel(scene, Media),
            vowel: CreatePhonologyLabel(scene, Vowel),
            tone: CreateToneLabel(scene),
            tone0: CreateTone0Label(scene),
        }
    })
    characterUI.layout().setMinSize(characterUI.width, characterUI.height);

    return characterUI;
}

//建立注音label
var CreatePhonologyLabel = function (scene, testString) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.phonology),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

//建立音調label
var CreateToneLabel = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'left',
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
}

//建立輕聲label(在上方置中所以獨立出來)
var CreateTone0Label = function (scene) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', Style.quizPanel.word.tone0),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: 0 }
    })
}

export default CreateCharacter;