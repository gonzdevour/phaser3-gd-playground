import CanvasFrameManager from '../../../../../../phaser3-rex-notes/plugins/canvasframemanager.js';
import { Initials, Media, Vowel, Tone } from '../../../model/bopomofo/Bopomofo.js';
import { Style } from './style.js';

var BuildFontTexture = function (scene, key) {
    if (key === undefined) {
        key = 'phonology';
    }

    // Font texture already created
    if (scene.textures.exists(key)) {
        return key;
    }

    var phonologyStyle = Style.quizPanel.choice.phonology;
    var toneStyle = Style.quizPanel.choice.tone;
    var cellWidth = phonologyStyle.fixedWidth;
    var cellHeight = phonologyStyle.fixedHeight;

    var characterCount = Initials.length + Media.length + Vowel.length + Tone.length;
    var characterCountSqrt = Math.ceil(Math.sqrt(characterCount));
    var canvasFrames = new CanvasFrameManager(
        scene,
        {
            key: key,
            width: cellWidth * characterCountSqrt,
            height: cellHeight * characterCountSqrt,
            cellWidth: cellWidth,
            cellHeight: cellHeight
        }
    )

    var textObject = scene.rexUI.add.BBCodeText(0, 0, '');

    // Add phonology frames
    var phonology = Initials + Media + Vowel;
    textObject.setStyle(phonologyStyle);
    for (var i = 0, cnt = phonology.length; i < cnt; i++) {        
        var char = phonology.charAt(i);
        textObject.style.setTestString(char);
        textObject.setText(char);
        // Add frame
        canvasFrames.paste(char, textObject);
    }

    // Add tone frames
    textObject.setStyle(toneStyle);
    for (var i = 0, cnt = Tone.length; i < cnt; i++) {
        var char = Tone.charAt(i);
        textObject.style.setTestString(char);
        textObject.setText(char);
        // Add frame
        canvasFrames.paste(char, textObject);
    }
    canvasFrames.updateTexture();

    // Remove temporary objects
    textObject.destroy();
    canvasFrames.destroy();

    return key;
}

export default BuildFontTexture;