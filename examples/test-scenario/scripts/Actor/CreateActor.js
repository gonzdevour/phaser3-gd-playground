import CreateChar from './CreateChar.js';
import CreateTextbox from './CreateTextbox.js';
import FadeOutDestroy from '../../../../../phaser3-rex-notes/plugins/fade-out-destroy.js';

//methods
import MethodsMove from './MethodsMove.js';

class Actor extends Phaser.GameObjects.Container {
  constructor(scene, charID, x, y) {
      var sprite = CreateChar(scene, charID, 'normal0');
      var text = CreateTextbox(scene, sprite).setPosition(sprite.x, sprite.getTopRight().y+100).setVisible(true);
      //var center = scene.rexUI.add.roundRectangle(sprite.x,sprite.y,100,1000,undefined,0xff0000);
      //super(scene, 0, 0, [sprite, center]);
      super(scene, 0, 0, [sprite]); 
      this.sprite = sprite;
      this.text = text; //addToLayer和container.add都會加入displayList，兩個都用就會render成兩個。所以text如果要保證在sprite上方就不能綁進actor
      this.scenario = scene.scenario;
      this.scenario.layer_Chars.add(this);
      this.text.addToLayer(this.scenario.layer_Chars);
      //this.scenario.layer_Chars.add(this.getLayer());//layer目前版本不支援巢狀
      //this.scenario.layer_Chars.add(text.getLayer());//layer目前版本不支援巢狀
      scene.plugins.get('rexViewportCoordinate').add(text, scene.scenario.director.viewport);
      scene.plugins.get('rexViewportCoordinate').add(this, scene.scenario.director.viewport);
      this.setVPosition(x,y);
      this.appear();
  }

  setVPosition(x, y) {
    if (x == undefined){
      x = 0.5;
    }
    if (y == undefined){
      y = 1.2;
    }
    this.vpx = x;
    this.vpy = y;

    return this;
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
    this.sprite.setExpression(expressionName);
    return this;
  }

  textPop(duration, ease) {
    this.text.setVisible(true);
    this.scenario.layer_Chars.bringToTop(this.text.getLayer());
    this.scene.tweens.add({
      targets:this.text,
      vpx: {from:this.vpx, to:this.vpx},
      vpy: {from:this.vpy-1, to:this.vpy-1.1},
      alpha:{from:0, to:1},
      duration:duration?duration:1000,
      ease: ease?ease:'linear',
    })
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

  cleanTalk() {
    debugger
    this.scenario.layer_Chars.remove(this.text)
    this.text.destroy();
    return this;
  }

  play(key, ignoreIfPlaying) {
      this.sprite.play(key, ignoreIfPlaying);
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

  talk(speed, waitTyping) {
    if (typeof (speed) === 'boolean') {
        waitTyping = speed;
        speed = undefined;
    }
    if (waitTyping === undefined) {
        waitTyping = true;
    }
    //this.scene.children.bringToTop(this.getLayer());

    this.scenario.layer_Chars.bringToTop(this);
    this.textCleanOthers(this.name);//清除其他人的對話
    this.textPop();
    var textBox = this.text;
    textBox.charNameText.setText(this.name);//顯示說話者的名字
    if (speed !== undefined) {
        textBox.setTypeSpeed(speed); //指定語氣速度
    } else {
        textBox.setTypeSpeed(50); //如不指定則使用預設速度
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

Object.assign(
  Actor.prototype,
  MethodsMove
);

var CreateActor = function (scene, charID, x, y) {
  var newActor = new Actor(scene, charID, x, y);
  newActor.tagPlayer = this;
  //scene.add.existing(newActor); //因為layer.add會將物件放進displayList中並排序，scene.add.exsiting也會，同時使用會導致順序錯亂
  //newActor.changeOrigin(200,200);
  return newActor;
}

export default CreateActor;