import { Character } from '../gameobjects';

var CreateCharacter = function (scene) {
    return new Character(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontSize: 40, fixedWidth: 48, fixedHeight: 48, halign: 'center', valign: 'center' }
            ),
            align: 'center',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            initials: CreateLabel(scene),
            media: CreateLabel(scene),
            vowel: CreateLabel(scene),
            tone: CreateLabel(scene),
        }
    })
}

var CreateLabel = function (scene) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 16, fixedWidth: 20, fixedHeight: 20, halign: 'center', valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 5, right: 5, top: 5, bottom: 5 }
    })
}

export default CreateCharacter;