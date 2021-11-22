//create btn

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

function createBtn(scene, key) {
  var btn = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 500, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
    text: scene.add.text(0, 0, key.txt, {
      fontSize: 28,
    }),
    align: "center",
  });
  btn.fn = key.fn; //callback
  return btn;
}

function createButtons(scene, keys) {
  var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);
  var btns = {},
    key,
    btnsRow = [],
    btnsBundle = [];

  for (var i = 0, cnt = keys.length; i < cnt; i++) {
    key = keys[i];
    btns[key] = createBtn(scene, key);
    if (i > 0 && i % 2 == 0) {
      //log("換列");//換列
      btnsBundle.push(btnsRow);
      btnsRow = [];
      btnsRow.push(btns[key]);
      //log(JSON.stringify(btnsBundle));
      if (i == cnt - 1) {
        //log("剛好loop結束");//如果剛好loop結束
        btnsBundle.push(btnsRow);
        //log(JSON.stringify(btnsBundle));
      }
    } else if (i == cnt - 1) {
      //log("沒換列但loop結束");//沒換列但loop結束
      btnsRow.push(btns[key]);
      btnsBundle.push(btnsRow);
      //log(JSON.stringify(btnsBundle));
    } else {
      //log("沒換列");//沒換列
      btnsRow.push(btns[key]);
      //log(JSON.stringify(btnsBundle));
    }
  }
  //log(JSON.stringify(btnsBundle));
  var vpt = scene.rexScaleOuter.outerViewport;

  scene.rexUI.add
    .gridButtons({
      x: 0.5 * scene.game.config.width,
      y: 0.5 * scene.game.config.height,
      width: vpt.width,
      height: vpt.height,
      background: background,
      buttons: btnsBundle,
      space: { left: 10, right: 10, top: 20, bottom: 20, row: 20, column: 20 },
      expand: true,
    })
    .layout()
    //.drawBounds(scene.add.graphics(), 0xff0000)
    .on(
      "button.click",
      function (button, index, pointer, event) {
        log("clicked");
        var fn = button.fn;
        fn();
      },
      scene
    );
}

export { createButtons };
