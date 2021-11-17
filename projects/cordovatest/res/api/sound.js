import { getOS } from "./os.js";
//get OS status
var OS = getOS();

//sound

class cdv_sound {
  constructor() {}
  play(key, config) {
      var sound = new Media(
        tb_audio.get(key, "mp3"),
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
  constructor() {}
  play(key, config) {
      scene.sound.play(key, config);
  }
}


function soundInit(){
  var sound;
  if (OS.cordova) {
      log("init media plugin");
      sound = new cdv_sound();
  } else {
    log("use p3 audio")
    sound = new p3_sound();
  }
  return sound;
}

export { p3_sound, cdv_sound, soundInit };
