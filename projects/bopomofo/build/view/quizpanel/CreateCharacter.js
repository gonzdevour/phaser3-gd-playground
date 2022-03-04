import CreateRoundRectangleBackground from '../style/CreateRoundRectangleBackground.js';
import CreateCharacterImage from '../style/CreateCharacterImage.js';
import { Character } from '../../../gameobjects/quizpanel.js';
import { Initials, Media, Vowel, Tone } from '../../../model/bopomofo/Bopomofo.js'
import { Style } from '../style/style.js';
import BuildFontTexture from '../fonttexture/BuildFontTexture.js';

var CreateCharacter = function (scene,) {
    var font = BuildTexture(scene);

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
            initials: CreatePhonologyLabel(scene, font),
            media: CreatePhonologyLabel(scene, font),
            vowel: CreatePhonologyLabel(scene, font),
            tone: CreateToneLabel(scene, font),
            tone0: CreateTone0Label(scene, font),
        }
    })
    characterUI.layout().setMinSize(characterUI.width, characterUI.height);

    return characterUI;
}

var BuildTexture = function (scene) {
    var styles = Style.quizPanel.word;
    var key = BuildFontTexture(scene, 'characterfont',
        [
            { characters: Initials, style: styles.phonology },
            { characters: Media, style: styles.phonology },
            { characters: Vowel, style: styles.phonology },
            { characters: Tone, style: styles.tone },
        ]
    );
    return key;
}

var CreatePhonologyLabel = function (scene, font) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: CreateCharacterImage(scene, font),

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateToneLabel = function (scene, font) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: CreateCharacterImage(scene, font),

        align: 'left',
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
}

var CreateTone0Label = function (scene, font) {
    return scene.rexUI.add.label({
        // background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        text: CreateCharacterImage(scene, font),

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: 0 }
    })
}

export default CreateCharacter;