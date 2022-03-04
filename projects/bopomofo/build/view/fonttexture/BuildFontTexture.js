import CanvasFrameManager from '../../../../../../phaser3-rex-notes/plugins/canvasframemanager.js';

var BuildFontTexture = function (scene, key, config) {
    /*
    config: 
    [
        {characters: '...', style: textStyle },        
        ...
    ]
    */

    // Font texture already created
    if (scene.textures.exists(key)) {
        return key;
    }

    var characterCount = 1;  // Reserve for an empty frame
    var cellWidth = 0;  // Max of fixedWidth
    var cellHeight = 0; // Max of fixedHeight
    for (var i = 0, cnt = config.length; i < cnt; i++) {
        var characterConfig = config[i];
        characterCount += characterConfig.characters.length;

        var style = characterConfig.style;
        cellWidth = Math.max(cellWidth, style.fixedWidth);
        cellHeight = Math.max(cellHeight, style.fixedHeight);
    }
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

    // Add an empty frame
    canvasFrames.addEmptyFrame('');

    var textObject = scene.rexUI.add.BBCodeText(0, 0, '');

    for (var i = 0, icnt = config.length; i < icnt; i++) {
        var characterConfig = config[i];
        var characters = characterConfig.characters;
        var style = characterConfig.style;
        textObject.setStyle(style);

        for (var j = 0, jcnt = characters.length; j < jcnt; j++) {
            var char = characters.charAt(j);
            textObject.style.setTestString(char);
            textObject.setText(char);
            // Add frame
            canvasFrames.paste(char, textObject);
        }
    }

    canvasFrames.updateTexture();

    // Remove temporary objects
    textObject.destroy();
    canvasFrames.destroy();

    return key;
}

export default BuildFontTexture;