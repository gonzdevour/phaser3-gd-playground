import CreateChar from './CreateChar.js';
import CreateTextbubble from './CreateTextbubble.js';
import FadeOutDestroy from 'rexnotePlugins/fade-out-destroy.js';
import ContainerLite from 'rexnotePlugins/containerlite.js';

//methods
import MethodsMove from './MethodsMove.js'; //移動相關的指令，如jumpTo

import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import Locate from '../../layer/Locate.js';

class Actor extends ContainerLite {
  constructor(scene, actorID, vpx, vpy) {
      var viewport = scene.scenario.director.viewport;
      var sprite = CreateChar(scene, actorID, 'normal0');
      var bubble = CreateTextbubble(scene, sprite).setPosition(sprite.x, sprite.getTopRight().y+100).setVisible(true)
      //var center = scene.rexUI.add.roundRectangle(sprite.x,sprite.y,100,1000,undefined,0xff0000);
      //super(scene, 0, 0, [sprite, center]);
      super(scene, 0, 0, [sprite,bubble]); 
      this.defaultVPX = 0.5;
      this.defaultVPY = 1.2;
      vpx = vpx?vpx:this.defaultVPX;
      vpy = vpy?vpy:this.defaultVPY;
      this.sprite = sprite;
      this.bubble = bubble; //addToLayer和container.add都會加入displayList，兩個都用就會render成兩個。所以bubble如果要保證在sprite上方就不能綁進actor
      this.scenario = scene.scenario;
      this.director = scene.scenario.director;
      this.storyBox = scene.scenario.director.storyBox

      this.displayName = '';
      this.expression = '';

      bubble.on('complete', function(){
        this.scenario.isPlayingText = false;
      },this);

      var storyBox = this.storyBox;
      storyBox
        .on('complete', function(){
          this.scenario.isPlayingText = false;
        },this);

      Locate(scene, this, {instID: actorID, layerName: 'scenario_stage', viewport: viewport, vpx: vpx, vpy: vpy})

      this.assignPrivateData(this.director.tb_Char.table[actorID]);
      this.appear();
  }

  assignPrivateData(data) {
    this.privateData = data;
    return this;
  }

  setVPosition(x, y) {
    if (x == undefined){
      x = this.defaultVPX;
    }
    if (y == undefined){
      y = this.defaultVPY;
    }
    this.vpx = x;
    this.vpy = y;

    return this;
  }

  setDisplayName(displayName){
    this.displayName = displayName;
  }

  appear() {
    var actor = this;
    actor.sprite.frontImage.setTint(0x0);
    actor.scene.tweens.addCounter({
      from: 0,
      to: 255,
      duration: 1000,
      onUpdateScope: this,
      onUpdate: function (tween)
      {
          const value = Math.floor(tween.getValue());
          if(actor.sprite.frontImage){
            actor.sprite.frontImage.setTint(Phaser.Display.Color.GetColor(value, value, value));
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
      },
      onComplete: function(){
        FadeOutDestroy(this, 1000);
      }
    });
    return this;
  }

  get x() {
    return super.x;
  }

  set x(value) {
    super.x = value;
    if (this.vpx !== undefined){
      if (this.vpx > 0.5){
        this.sprite.flipX = true;
      } else {
        this.sprite.flipX = false;
      }
    }
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

  setflip(x, y) {
      this.flipX = x;
      this.flipY = y;
      return this;
  }

  setExpression(expressionName) {
    this.expression = expressionName;
    this.sprite.setExpression(expressionName);
    return this;
  }

  bubblePop(duration, ease) {
    this.bubble.setAlpha(0);
    this.bubble.setVisible(true);
    this.bubble.bringToTop();
    this.scene.tweens.add({
      targets:this.bubble,
      vpx: {from:this.vpx, to:this.vpx},
      vpy: {from:this.vpy-1, to:this.vpy-1.1},
      alpha:{from:0, to:1},
      duration:duration?duration:1000,
      ease: ease?ease:'linear',
    })
    return this;
  }

  stopTalk(duration, ease) {
    var target;
    if (this.scenario.director.mode_speechBubble){ //bubble模式
      target = this.bubble
    } else {

    }
    this.scene.tweens.add({
      targets:target,
      y: -100,
      alpha:{from:1, to:0},
      duration:duration?duration:1000,
      ease: ease?ease:'linear',
    })
    return this;
  }

  cleanTalk() {
    if (this.scenario.director.mode_speechBubble){ //bubble模式
      this.bubble.destroy();
    } else {
      this.storyBox.textPlayer.play('');
      this.storyBox.close();

    }
    return this;
  }

  play(key, ignoreIfPlaying) {
      this.sprite.play(key, ignoreIfPlaying);
      return this;
  }

  textCleanOthers(myName) {
    this.storyBox.close();
    var allChars = this.tagPlayer.getGameObject('char');
    for (var key in allChars) {
      if(key !== myName){
        var char = allChars[key];
        char.stopTalk();
      }
    }
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
    this.waitTyping = waitTyping;

    if (this.scenario.director.mode_speechBubble){ //bubble模式

      this.bubblePop();

      var text = this.bubble;
      var style = '#' + GetValue(this.privateData, 'nameColor', 0) //設定名字底板的顏色
      text.nameLabel.getElement('background').setFillStyle(style) //bubble nameLabel的底板是customShapes，會吃'0x'字串
      text.nameLabel.setText(this.displayName).layout();//顯示說話者的名字
      text.setTypingSpeed(this.director.getTypingSpeed(speed))
      this.tagPlayer.setContentCallback(this.bubbleTyping, this);

    }

    return this;
  }

  bubbleTyping(content) {
      if (this.waitTyping) {
          this.scenario.isPlayingText = true;
          this.tagPlayer.pauseUntilEvent(this.bubble, 'complete');
      }
      this.bubble.start(content);
      return this;
  }

}

Object.assign(
  Actor.prototype,
  MethodsMove
);

var CreateActor = function (scene, actorID, x, y) {
  var director = scene.scenario.director;
  var newActor = new Actor(scene, actorID, x, y);
  newActor.tagPlayer = this;
  //scene.add.existing(newActor); //因為layer.add會將物件放進displayList中並排序，scene.add.exsiting也會，同時使用會導致順序錯亂
  //newActor.changeOrigin(200,200);
  if (director.defaultActorScale != undefined){
    newActor.setScale(director.defaultActorScale);
  }
  return newActor;
}

export default CreateActor;