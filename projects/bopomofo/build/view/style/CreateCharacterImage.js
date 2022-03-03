import CharacterImage from '../../../gameobjects/characterimage/CharacterImage.js';

var CreateCharacterImage = function (scene, font, character) {
    var image = new CharacterImage(scene, 0, 0, font, character);
    scene.add.existing(image);
    return image;
}

export default CreateCharacterImage;