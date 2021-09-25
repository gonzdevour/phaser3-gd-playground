import { Character, EditableCharacter } from '../gameobjects';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCharacter = function (scene, config) {
    var editable = GetValue(config, 'editable', false);
    var CharacterClass = (editable)? EditableCharacter : Character
    return new CharacterClass(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            height: (60 * 3) + 2,  // Min height
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontFamily:'DFKai-SB', fontSize: 96, fixedWidth: 100, fixedHeight: 100, halign: 'center', valign: 'center', testString:'回' }
            ),
            align: 'right',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            initials: CreateLabel(scene,'right',32),
            media: CreateLabel(scene,'right',32),
            vowel: CreateLabel(scene,'right',32),
            tone: CreateLabel(scene,'left',72),
        }
    })
}

var CreateLabel = function (scene,textalign, textsize) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: textsize, fixedWidth: 60, fixedHeight: 40, halign: textalign, valign: 'center', testString:'回' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

export default CreateCharacter;