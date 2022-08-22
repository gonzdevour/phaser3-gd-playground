import CreateChar from './CreateChar.js';
import CreateTextbox from './CreateTextbox.js';
import ContainerLite from '../../../../phaser3-rex-notes/plugins/containerlite.js';

class Actor extends ContainerLite {
  constructor(scene, charID, expression, expressionIndex) {
      var sprite = CreateChar(scene, charID, expression, expressionIndex);
      var text = CreateTextbox(scene, sprite).setPosition(sprite.x, sprite.getTopRight().y+100).setVisible(true);
      //var center = scene.rexUI.add.roundRectangle(sprite.x,sprite.y,100,1000,undefined,0xff0000);
      //super(scene, 0, 0, [sprite, center]);
      super(scene, 0, 0, [sprite]);
      sprite.stageCenter = 512;
      this.sprite = sprite;
      this.text = text;
  }

  get flipX() {
      return this.sprite.flipX;
  }
  set flipX(value) {
      this.sprite.flipX = value;
  }
  get flipY() {
      return this.sprite.flipY;
  }
  get x() {
    return super.x;
  }
  set x(value) {
    super.x = value;
    console.log(this);
    debugger
    if (value > 512) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }

  setflip(x, y) {
      this.flipX = x;
      this.flipY = y;
      return this;
  }

  textPop(duration, ease) {
    this.text.setVisible(true);
    this.scene.tweens.add({
      targets:this.text,
      x: {from:this.sprite.x, to:this.sprite.x},
      y: {from:this.sprite.getTopRight().y+200, to:this.sprite.getTopRight().y+100},
      alpha:{from:0, to:1},
      duration:duration?duration:1000,
      ease: ease?ease:'linear',
    })
    return this;
  }

  play(key, ignoreIfPlaying) {
      this.sprite.play(key, ignoreIfPlaying);
      return this;
  }

  talk(speed, waitTyping) {
    if (typeof (speed) === 'boolean') {
        waitTyping = speed;
        speed = undefined;
    }
    if (waitTyping === undefined) {
        waitTyping = true;
    }

    this.textPop();
    var textBox = this.text;
    if (speed !== undefined) {
        textBox.setTypeSpeed(speed);
    } else {
        textBox.setTypeSpeed(20);
    }
    this.waitTyping = waitTyping;
    this.tagPlayer.setContentCallback(this.typing, this);
    return this;
  }

  typing(content) {
      if (this.waitTyping) {
          this.tagPlayer.pauseUntilEvent(this.text, 'complete');
      }
      this.text.start(content);
      return this;
  }
}

var CreateActor = function (scene, charID, expression, expressionIndex) {
  var newActor = new Actor(scene, charID, expression, expressionIndex);
  newActor.tagPlayer = this;
  scene.add.existing(newActor);
  //newActor.changeOrigin(200,200);
  return newActor;
}

export default CreateActor;