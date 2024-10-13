import CreateRoundRectangleBackground from "../templates/CreateRoundRectangleBackground";
import AutoRemoveTween from "rexnotePlugins/utils/tween/AutoRemoveTween";
import Style from "../../settings/Style";
import TopToast from "gdkPlugins/toast/topToast";

var CreateToast = function(scene){
  var config = {
    //x: scene.viewport.x, y: 100, //width: undefined, height: undefined,
    orientation: 'x',

    background: CreateRoundRectangleBackground(scene, 20, 0x555555, 0x333333, 3),
    text: scene.rexUI.add.BBCodeText(0, 0, 'test-toast-message', {fontFamily: Style.fontFamilyName, fontSize:32, testString:'|MÉqgy回', padding: 20}),

    //icon: iconGameObject,
    //iconMask: false,
    //action: actionGameObject,
    //actionMask: false,

    space: { left: 0, right: 0, top: 0, bottom: 0, icon: 0, text: 0, },
    duration: { in: 200, hold: 1200, out: 200, },

    transitIn: function(toast, duration){
      AutoRemoveTween(toast, {ease: 'Cubic', vpy: { from: toast.vpy-0.1, to: toast.vpy }, alpha: { from: 0, to: 1 }, duration: duration,})
    },
    // transitOut: 0,

    // name: '',
    // anchor: undefined,
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
  };

  var toast = new TopToast(scene, config);
  scene.add.existing(toast);
  scene.vpc.add(toast, scene.viewport, 0.5, 0.05);

  return toast;
}

export default CreateToast;