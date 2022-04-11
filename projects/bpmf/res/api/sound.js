import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//sound

class cdv_sound {
  constructor(audioUrls) {
    this.urls = audioUrls;
    this.volume = 1;
    log("this.urls: " + this.urls)
  }
  setVolume(value) {
    this.volume = Math.min(1, Math.max(0,value));
    console.log('cdv.setVolume:' + this.volume);
  }
  play(scene, key, config) {
    config = !config?{}:config;
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
    se.setVolume(this.volume);
    se.play(config);
  }
  loop(scene, key, config) {
    config = !config?{}:config;
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
    se.setVolume(this.volume);
    se.play(config);
    return se;
  }
  getSrc(key) {
    var fileSrc = '';
    if (OS.android){
      var root = window.location.pathname;
      //var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.urls.get(key, "mp3");
      //var fileSrc = cordova.file.applicationDirectory + 'www/' + this.urls[key]['mp3']; //路徑如上但有files:///開頭
      fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.urls[key]['mp3'];
    } 
    else if (OS.iOS){
      fileSrc = this.urls[key]['mp3'];
    }
    log(fileSrc);
    return fileSrc;
  }
}

class p3_sound {
  constructor(audioUrls) {
    this.urls = audioUrls;
    this.volume = 1;
    log("this.urls: " + this.urls)
  }
  setVolume(value) {
    this.volume = Math.min(1, Math.max(0,value));
    console.log('p3.setVolume:' + this.volume);
  }
  play(scene, key, config) {
    log(this.getSrc(key));
    log("p3audio play " + key + ' vol' + this.volume);
    config = !config?{}:config;
    config.volume = this.volume;
    scene.sound.play(key, config);
  }
  loop(scene, key, config) {
    log("p3audio loop " + key );
    config = !config?{}:config;
    config.volume = this.volume;
    config.loop = true;
    scene.sound.play(key, config);
  }
  getSrc(key) {
    log(key+'url:' + JSON.stringify(this.urls[key]));
    var root = window.location.pathname;
    //var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.urls.get(key, "mp3");
    var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.urls[key]['mp3'];
    log(fileSrc);
    return fileSrc;
  }
}

function soundInit(audioUrls) {
  log("audioUrls: " + JSON.stringify(audioUrls));
  var sound;
  if (OS.cordova && (OS.iOS || OS.android)) {
    log("use media plugin");
    sound = new cdv_sound(audioUrls);
  } else {
    log("use p3 audio");
    sound = new p3_sound(audioUrls);
  }
  return sound;
}

export { soundInit };
