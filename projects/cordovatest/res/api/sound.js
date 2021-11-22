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
    var se = new Media(
      this.getSrc(key),
      function playSuccess() {
        log("media play success");
        se.release();
      },
      function playError(err) {
        log("media err: " + err.code);
      }
    );
    se.play(config);
  }
  loop(key, config) {
    var se = new Media(
      this.getSrc(key),
      function playSuccess() {
        log("media loop success");
        se.seek(0);
        se.play(config);
      },
      function playError(err) {
        log("media err: " + err.code);
      }
    );
    se.play(config);
    return se;
  }
  getSrc(key) {
    var root = window.location.pathname;
    var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.tb.get(key, "mp3");
    log(fileSrc);
    return fileSrc;
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
  loop(key, config) {
    log("p3audio loop " + key );
    config.loop = true;
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

export { soundInit };
