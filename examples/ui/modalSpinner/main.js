import "phaser";
import AllPlugins from "gdkPlugins/AllPlugins.js";

class Test extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "assets/pack.json");
  }

  create() {
    var scene = this;

    this.rexUI.add.roundRectangle(100, 80, 100, 100, 0, 0x008888);

    var throbber = CreateModalThrobber(scene);
    
    setTimeout(() => {
      console.log("已经等待了3秒钟。");
      throbber.emit("close");
    }, 3000); // 3000毫秒 = 3秒
  }
  update() {}
}

import GetValue from "gdkPlugins/utils/object/GetValue.js";

var CreateSpinner = function (scene, spinnerName) {
  return scene.rexSpinner.add[spinnerName]({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
};

var CreateText = function (scene, text) {
  return scene.rexUI.add.BBCodeText(0, 0, text, {
    // fontFamily: 'Courier',
    fontSize: "32px",
    // fontStyle: '',
    // backgroundColor: null,  // null, css string, or number
    // backgroundColor2: null,  // null, css string, or number
    // backgroundHorizontalGradient: true,
    // backgroundStrokeColor: null,  // null, css string, or number
    // backgroundStrokeLineWidth: 2,

    // backgroundCornerRadius: 0,
    // 0   : no round corner,
    // > 0 : convex round corner
    // < 0 : concave round corner

    //backgroundCornerIteration: null,
    color: "#ffffff", // null, css string, or number
    // stroke: '#fff',  // null, css string, or number
    // strokeThickness: 0,
    // shadow: {
    //     offsetX: 0,
    //     offsetY: 0,
    //     color: '#000',  // css string, or number
    //     blur: 0,
    //     stroke: false,
    //     fill: false
    // },
    // underline: {
    //     color: '#000',  // css string, or number
    //     thickness: 0,
    //     offset: 0
    // },
    // strikethrough: {
    //     color: '#000',  // css string, or number
    //     thickness: 0,
    //     offset: 0
    // },
    // align: 'left',  // Equal to halign
    halign: "center", // 'left'|'center'|'right'
    valign: "center", // 'top'|'center'|'bottom'
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    // maxLines: 0,
    // lineSpacing: 0,
    fixedWidth: 500,
    //fixedHeight: 500,
    testString: "|MÉqgy回",

    wrap: {
      mode: "character", // 0|'none'|1|'word'|2|'char'|'character'|3|'mix'
      width: 500,
    },
    // wordWrap: { width: 0 },   // Compatible with Text game object

    // rtl: false,
    metrics: false,
    // metrics: {
    //     ascent: 0,
    //     descent: 0,
    //     fontSize: 0
    // },

    // images: {
    //     imgKey: {y: -8}
    // },

    // delimiters: '[]',

    // sharedPool: true,

    // urlTagCursorStyle: 'pointer',
    // interactive: false
  });
};

var CreateThrobber = function(scene, x, y){
    return scene.rexUI.add
    .sizer({
      x: x,
      y: y,
      orientation: "y",
      space: { item: 30 }, // space: { left: 0, right:0, top:0, bottom:0, item:0 },
      // rtl: false,
      // startChildIndex: 0,
      // anchor: undefined,
      // width: undefined,
      // height: undefined,
      // name: '',
      // draggable: false,
      // sizerEvents: false,
      // enableLayer: false,
    })
}

var CreateModalThrobber = function (scene, config) {
  var spinner = CreateSpinner(scene, "los");
  var text = CreateText(scene, "資料傳輸中");
  var throbber = CreateThrobber(scene, 512, 400)
    .add(spinner, {
      //proportion: 0,
      //align: 'center',
      //padding: {left: 0, right: 0, top: 0, bottom: 0},
      //expand: false,
      //key: undefined,
      //index: undefined,
      //minWidth: undefined,
      //minHeight: undefined,
      //fitRatio: 0,  // true
    })
    .add(text, {
      //proportion: 0,
      //align: 'center',
      //padding: {left: 0, right: 0, top: 0, bottom: 0},
      //expand: false,
      //key: undefined,
      //index: undefined,
      //minWidth: undefined,
      //minHeight: undefined,
      //fitRatio: 0,  // true
    })
    .layout()
    .on("close", function () {
      throbber.emit("modal.requestClose", `closeEventData`);
    });

  var modalthrobber = scene.rexUI.modalPromise(throbber, {
    // cover: {
    //     color: 0x0,
    //     alpha: 0.8,
    //     transitIn: function(gameObject, duration) { },
    //     transitOut: function(gameObject, duration) { },
    // },
    // cover: false,

    // When to close modal dialog?
    // touchOutsideClose: false,
    // anyTouchClose: false,
    // timeOutClose: false,
    manualClose: true,

    duration: {
      in: 0,
      hold: 0,
      out: 0,
    },

    // transitIn: 0,
    // transitOut: 0,

    // destroy: true,
    // openOnStart: true
  });

  return throbber;
};

var config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1024,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: AllPlugins,
  scene: Test,
};

const game = new Phaser.Game(config);
