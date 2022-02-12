var CreateSysPanel = function (scene, config) {

  var btnHome = CreateLabel(scene, '返回', 'arrowL');
  btnHome
    .onClick( function (button, index, pointer, event) {
      btnHome.emit('reqBack', scene);
  })
  
  var sysPanel = scene.rexUI.add.overlapSizer({
  })
      .add(
          btnHome,
          { align: 'left-top', expand: false, key:'btnHome' }
      )

    return sysPanel;
}

var CreateLabel = function (scene, text, img ) {
    return scene.rexUI.add.label({
        //background: CreateRoundRectangleBackground(scene, 10, undefined, 0xffffff, 2),
        icon: scene.add.image(0, 0, img).setDisplaySize(90, 90),
        //text: scene.rexUI.add.BBCodeText(0, 0, text, Style.quizPanel.action.submit),
        //space: { left: 0, right: 0, top: 10, bottom: 10, icon: 0 }
    });
}

export default CreateSysPanel;