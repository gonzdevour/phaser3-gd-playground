import { Character } from '../gameobjects';

var CreateCharacter = function (scene) {
    return new Character(scene, {
        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0).setStrokeStyle(2, 0xffffff),
        character: scene.rexUI.add.label({
            height: (60 * 3) + 2,  // Min height
            background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0).setStrokeStyle(2, 0xffffff),
            text: scene.rexUI.add.BBCodeText(0, 0, '',
                { fontSize: 96, fixedWidth: 100, fixedHeight: 100, halign: 'center', valign: 'center' }
            ),
            align: 'right',
            space: { left: 5, right: 5, top: 5, bottom: 5 }
        }),

        bopomofo: {
            initials: CreateLabel(scene,'right'),
            media: CreateLabel(scene,'right'),
            vowel: CreateLabel(scene,'right'),
            tone: CreateLabel(scene,'left'),
        }
    })
}

var CreateLabel = function (scene,textalign) {
    return scene.rexUI.add.label({
        // background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.add.BBCodeText(0, 0, '',
            { fontSize: 32, fixedWidth: 60, fixedHeight: 40, halign: textalign, valign: 'center' }
        ),
        // Set fixedWidth, fixedHeight for all kinds of text input

        align: 'center',
        space: { left: 2, right: 2, top: 2, bottom: 2 }
    })
}

export default CreateCharacter;