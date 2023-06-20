import CreateRoundRectangleBackground from "../../templates/CreateRoundRectangleBackground";
import Style from "../../settings/Style";
import RegisterBehaviors from "../../behaviors/RegisterBehaviors";
import GetValue from "../../../../../plugins/utils/object/GetValue";


var CreateOptionLabel = function (scene, config) {
  var btn = scene.rexUI.add.label({
    background: CreateRoundRectangleBackground(scene, 20, undefined, 0xffffff, 2),
    // icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
    text: scene.rexUI.add.BBCodeText(0, 0, GetValue(config, 'text', ''), { fontFamily: Style.fontFamilyName, fontSize: 24 }),
    space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },

    name: GetValue(config, 'text', '')   // !! button.name會被用在buttons.value的指定
  }).onClick(GetValue(config, 'fn', undefined), scene) //以scene作為fn裡的this

  RegisterBehaviors(btn, ['ninja']);

  return btn;
}

var close = function(){
  this.scenario.director.close(); //這裡的this是line15裡onClick時的this，也就是scene
}

var CreateCloseButton = function(scene){
  return CreateOptionLabel(scene, {text:'CLOSE', fn:close})
}

export default CreateCloseButton;