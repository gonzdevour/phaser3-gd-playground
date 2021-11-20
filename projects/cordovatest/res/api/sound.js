import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//sound

class cdv_sound {
  constructor(tb_audio) {
    this.tb = tb_audio;
    log("this.tb: " + this.tb)
  }
  play(key, config) {
    var root = window.location.pathname;
    var fileSrc = root.substring(0, root.lastIndexOf('/')) + this.tb.get(key, "mp3");
    log(fileSrc);
    var sound = new Media(
      fileSrc,
      //"assets/sound/right.wav",
      function playSuccess() {
        log("media success");
        sound.release();
      },
      function playError(err) {
        log("media err: " + err.code);
      }
    );
    sound.play(config);
  }
}

class p3_sound {
  constructor(scene) {
    this.scene = scene;
  }
  play(key, config) {
    log("p3audio play " + key );
    this.scene.sound.play(key, config);
  }
}

function soundInit(scene, tb_audio) {
  var sound;
  if (OS.cordova) {
    log("init media plugin");
    log("init: " + tb_audio);
    sound = new cdv_sound(tb_audio);
  } else {
    log("use p3 audio");
    sound = new p3_sound(scene);
  }
  return sound;
}

export { p3_sound, cdv_sound, soundInit };
