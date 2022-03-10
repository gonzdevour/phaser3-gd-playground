import ModalKnobPromise from "./build/view/modalKnob/ModalKnobPromise";

//loading bar promise
var LoadingBarPromise = function (scene) {
  return new Promise(function (resolve, reject) {
    //讀取條
    var out = {};
    ModalKnobPromise(scene,out);
    var knob = out.returnKnob;
    scene.load.on('progress', function (value) {
        knob.easeValueTo(value);
    })
    knob.on('valuechange', function(newValue, oldValue, knob){
      if(newValue == 1){
          scene.rexUI.modalClose(knob, {});
          resolve();
      }
    });
  })
}

export default LoadingBarPromise;
