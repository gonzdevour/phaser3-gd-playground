import Style from "../../settings/Style";

var CreateTitleLabel = function (scene, title, text) {
  //var tLabel_background = scene.rexUI.add.roundRectangle(0, 0, 100, 100, 10, 0x1565c0);
  var tLabel_title = scene.rexUI.add.BBCodeText(0, 0, title, {fontFamily: Style.fontFamilyName, fontSize:48, testString:'|MÉqgy回', padding: 10});
  var tLabel_separator = scene.rexUI.add.roundRectangle(0, 0, 50, 4, 0, 0xffffff).setOrigin(0,0.5);
  var tLabel_text = scene.rexUI.add.BBCodeText(0, 0, text, {fontFamily: Style.fontFamilyName, fontSize:32, testString:'|MÉqgy回', padding: 10});
  //var tLabel_icon = scene.add.rectangle(0, 0, 40, 40, 0xff00ff);
  var tLabel = scene.rexUI.add.titleLabel({
    //background: tLabel_background,
    title: tLabel_title,
    separator: tLabel_separator,
    text: tLabel_text,
    //icon: tLabel_icon,
    align: { title: 'left', text: 'right'},
    space: {
        left: 0, right: 0, top: 0, bottom: -20, icon: 10, separator: 2, 
        //separatorLeft: -60, separatorRight: -10,
    }
  });
  return tLabel;
}

export default CreateTitleLabel;