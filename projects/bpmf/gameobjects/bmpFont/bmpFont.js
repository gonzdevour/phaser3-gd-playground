import { ColorNameToInteger } from '../../../../../phaser3-rex-notes/plugins/utils/color/ColorNameToInteger.js';

class bmpFont extends Phaser.GameObjects.BitmapText {
  constructor(scene,x,y,key,text){
    super(scene,x,y,key,text,32); //size:32
    scene.add.existing(this);
  }
  setColor(color) {
      //this.setCharacterTint(0, -1, true, ColorNameToInteger(color));
      this.setTint(ColorNameToInteger(color));
  }
}

export default bmpFont;