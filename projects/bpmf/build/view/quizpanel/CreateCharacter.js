import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import { Character } from '../../../gameobjects/quizpanel.js';
import { Initials, Media, Vowel } from '../../../model/bopomofo/Bopomofo.js'

//建立字與注音的label群後，透過gameobjects/Character.js的new Character(包含new Bopomofo)進行排列
//注意這個階段並不給予text內容，而只是將組件排版
var CreateCharacter = function (scene, config) {
    var style = config.style;
    var characterUI = new Character(scene, {
        background: CreateRoundRectangleBackground(scene),
        character: scene.rexUI.add.label({
            height: style.word.characterSizerHeight,  // Min height，字佔據的高度不能小於3個疊起來的注音+輕聲符號
            background: CreateRoundRectangleBackground(scene),
            text: scene.rexUI.add.BBCodeText(0, 0, '', style.word.character),
            align: 'right',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            initials: CreatePhonologyLabel(scene, style),
            media: CreatePhonologyLabel(scene, style),
            vowel: CreatePhonologyLabel(scene, style),
            tone: CreateToneLabel(scene, style),
            tone0: CreateTone0Label(scene, style),
        }
    })
    //先layout一次，以layout結果作為MinSize，往後如果再layout就不會小於這個Size
    characterUI.layout().setMinSize(characterUI.width, characterUI.height);

    return characterUI;
}

//建立注音label
var CreatePhonologyLabel = function (scene, style, testString) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', style.word.phonology),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

//建立音調label
var CreateToneLabel = function (scene, style) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', style.word.tone),
        // Set fixedWidth, fixedHeight for all kinds of text input
        align: 'left',
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
}

//建立輕聲label(在上方置中所以獨立出來)
var CreateTone0Label = function (scene, style) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: scene.rexUI.add.BBCodeText(0, 0, '', style.word.tone0),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 4, right: 0, top: -30, bottom: 0 }
    })
}

export default CreateCharacter;