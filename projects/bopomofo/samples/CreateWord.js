import * as GO from '../gameobjects';
import CreateCharacter from './CreateCharacter';

const Word = GO.Word;

var CreateWord = function (scene) {
    return new Word(scene, {
        // x: 400, y: 300,           // Position
        anchor: { left: 'left+10', top: 'top+10' }, // Anchor
        width: 150,               // Minimun size
        orientation: 'y',         // Vertical

        background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10).setStrokeStyle(2, 0xffffff),

        characters: [
            CreateCharacter(scene),
            CreateCharacter(scene),
            CreateCharacter(scene),
            CreateCharacter(scene)
        ]
    })
}

export default CreateWord;