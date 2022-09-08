import CreateScenarioViewport from "../../scripts/CreateScenarioViewport";

class ScenarioDirector extends Phaser.Events.EventEmitter {
  constructor(scene, manager) {
      super();
      this.scene = scene;
      this.background = scene.add.rexTransitionImage(512, 400, 'park', 0, {})
      this.camera = scene.cameras.main;
      this.sound = scene.sound;
      this.manager = manager;
      this.viewport = CreateScenarioViewport(this);

      this.coin = 50;
  }
  背景(filename, duration){
    console.log('背景: ' + filename + ' - ' +duration)
    if (duration === undefined){
      duration = 1000;
    }
    this.background.transit({
      key: filename, 
      frame: 0,
      duration: duration,
    });
  }
  淡入(duration) {
    duration = duration?duration:1000;
    console.log('淡入: ' + duration)
    this.camera.fadeIn(duration);
  }
  音效(filename) {
    console.log('音效: ' + filename)
    this.sound.play(filename);
  }
  說話(actorID, expressionAlias, easeAlias, x, y, xFrom, yFrom, duration, serif) {
    var actor = GetActor(this.manager, actorID);
    var ease = AliasToEase(easeAlias);
    var expression = AliasToExpression(expressionAlias);
    duration = duration?duration*1000:0;
    // y = y+1000;
    // yFrom = yFrom+1000;

    var content = ``
    if (!actor) {
      content = content + `<char.${actorID}=${actorID},${x},${y}>`
    }
    if (expression) {
      content = content + `<char.${actorID}.setExpression=${expression},0>`
    }
    if (x && !xFrom){
      content = content + `<char.${actorID}.vpx.to=${x},${duration},${ease}>`
    }
    if (y && !yFrom){
      content = content + `<char.${actorID}.vpy.to=${y},${duration},${ease}>`
    }
    if (xFrom){
      if (x && x != this.vpx){
        content = content + `<char.${actorID}.vpx=${x}>`
      }
      content = content + `<char.${actorID}.vpx.from=${xFrom},${duration},${ease}>`
    }
    if (yFrom){
      if (y && y != this.vpy){
        content = content + `<char.${actorID}.vpy=${y}>`
      }
      content = content + `<char.${actorID}.vpy.from=${yFrom},${duration},${ease}>`
    }
    if (duration){
      content = content + `<wait=${duration}>`
    }
    if (serif){
      content = content + `<char.${actorID}.talk>${serif}`
    }
    console.log(content);
    this.manager
      .playPromise(content)
      .then(function () {
          console.log('Complete')
      })
  }
  // callbacks
  print(msg) {
      this.scene.appendText(msg)
  }
}

var GetActor = function(manager, actorID){
  return manager.getGameObject('char', actorID);
}

var AliasToExpression = function(expressionAlias){
  var list = {
    無表情:'normal',
  }
  var result = list[expressionAlias];
  if (result){
    return result;
  } else {
    return 'normal';
  }
}

var AliasToEase = function(easeAlias){
  var list = {
    平滑:'Linear',
    伸縮:'Elastic',
    加速:'Cubic',
    彈跳:'Bounce',
  }
  var result = list[easeAlias];
  if (result){
    return result;
  } else {
    return 'Linear';
  }
}

export default ScenarioDirector;