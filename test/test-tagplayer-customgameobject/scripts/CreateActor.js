import CreateChar from './CreateChar.js';
import CreateTextbox from './CreateTextbox.js';
import ContainerLite from '../../../../phaser3-rex-notes/plugins/containerlite.js';
import TwoPointersTracer from '../../../../phaser3-rex-notes/plugins/input/gestures/twopointerstracer/TwoPointersTracer.js';

class Actor extends ContainerLite {
  constructor(scene, charID, x, y) {
      var sprite = CreateChar(scene, charID, 'normal', 0);
      var text = CreateTextbox(scene, sprite).setPosition(sprite.x, sprite.getTopRight().y+100).setVisible(true);
      //var center = scene.rexUI.add.roundRectangle(sprite.x,sprite.y,100,1000,undefined,0xff0000);
      //super(scene, 0, 0, [sprite, center]);
      super(scene, 0, 0, [sprite]);
      super.setPosition(x,y);
      sprite.stageCenter = 512;
      this.sprite = sprite;
      this.text = text;
      this.appear();
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

  appear() {
    this.sprite.frontImage.setTint(0x0);
    this.scene.tweens.addCounter({
      from: 0,
      to: 255,
      duration: 1000,
      onUpdateScope: this,
      onUpdate: function (tween)
      {
          const value = Math.floor(tween.getValue());
          if(this.sprite.frontImage){
            this.sprite.frontImage.setTint(Phaser.Display.Color.GetColor(value, value, value));
          }
      }
    });
    return this;
  }

  leave() {
    this.stopTalk();
    this.scene.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 1000,
      onUpdateScope: this,
      onUpdate: function (tween)
      {
          const value = Math.floor(tween.getValue());
          if(this.sprite.frontImage){
            this.sprite.frontImage.setTint(Phaser.Display.Color.GetColor(value, value, value));
          }
      }
    });
    return this;
  }

  setflip(x, y) {
      this.flipX = x;
      this.flipY = y;
      return this;
  }

  setExpression(expressionName, expressionIndex) {
    this.sprite.setExpression(expressionName, expressionIndex);
    return this;
  }

  jumpTo(x, y, jumpHeight) {
    this.scene.tweens.timeline({
      targets: this,
      ease: 'Cubic',
      tweens:[
          {
              props:{
                  x:{value: x, duration: 4000},
                  y:{value: y-jumpHeight, duration: 300, yoyo: true, repeat: 3},
              }, 
          },
      ],
    })
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

  textCleanOthers(myName) {
    var allChars = this.tagPlayer.getGameObject('char');
    for (var key in allChars) {
      if(key !== myName){
        var char = allChars[key];
        char.stopTalk();
      }
    }
    return this;
  }

  stopTalk(duration, ease) {
    this.scene.tweens.add({
      targets:this.text,
      y: -100,
      alpha:{from:1, to:0},
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
    this.textCleanOthers(this.name);//清除其他人的對話
    this.textPop();
    var textBox = this.text;
    if (speed !== undefined) {
        textBox.setTypeSpeed(speed); //指定語氣速度
    } else {
        textBox.setTypeSpeed(20); //如不指定則使用預設速度
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