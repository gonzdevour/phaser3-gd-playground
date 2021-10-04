import { CharacterTable, Character } from '../gameobjects';

var CreateCharacterTable = function (scene) {
    return new CharacterTable(scene, {
        createCharacterCell: GetCharacterCellSizerConfig(),
    })
}

var GetCharacterCellSizerConfig = function () {
    return {
        background: function (scene) {
            return scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0);
        },

        character: CreateCharacter,

        word: function (scene) {
            return scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 5).setStrokeStyle(2, 0xffffff),
                text: scene.rexUI.add.BBCodeText(0, 0, '',
                    { fontSize: 40, halign: 'center', valign: 'center', testString: '回' }
                ),

                space: { left: 5, right: 5, top: 5, bottom: 5 }
            })
        }
    }
}

var CreateCharacter = function (scene,) {
    var characterUI = new Character(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            height: (60 * 3) + 2,  // Min height
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0),//.setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontFamily: 'DFKai-SB', fontSize: 96, fixedWidth: 100, fixedHeight: 100, halign: 'center', valign: 'center', testString: '回' }
            ),
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

var CreatePhonologyLabel = function (scene, testString) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 32, fixedWidth: 36, fixedHeight: 40, halign: 'right', valign: 'center', testString: testString }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateToneLabel = function (scene) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 72, fixedWidth: 36, fixedHeight: 20, halign: 'left', valign: 'center', testString: 'ˊˇˋ' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        //space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

var CreateTone0Label = function (scene) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 20, fixedWidth: 36, fixedHeight: 20, halign: 'center', valign: 'bottom', testString: '˙' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 0, right: 0, top: -8, bottom: -4 }
    })
}


export default CreateCharacterTable;