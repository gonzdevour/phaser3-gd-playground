import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//sound

class cdv_sound {
  constructor(tb_audio) {
    this.tb = tb_audio;
  }
  play(key, config) {
    log(this.tb.get(key, "mp3"));
    var sound = new Media(
      this.tb.get(key, "mp3"),
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
    this.scene.sound.play(key, config);
  }
}

function soundInit(scene, tb_audio) {
  var sound;
  if (OS.cordova) {
    log("init media plugin");
    sound = new cdv_sound(tb_audio);
  } else {
    log("use p3 audio");
    sound = new p3_sound(scene);
  }
  return sound;
}

export { p3_sound, cdv_sound, soundInit };
