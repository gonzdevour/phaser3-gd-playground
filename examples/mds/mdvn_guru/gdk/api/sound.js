import { getOS } from "gdkPlugins/utils/os.js";
//utils
import GetObjByKeyValue from "gdkPlugins/utils/array/GetObjByKeyValue.js";
import ArrAdd from "gdkPlugins/utils/array/ArrAdd.js";
import ArrRemove from "gdkPlugins/utils/array/ArrRemove.js";
//get OS status
var OS = getOS();

//sound

class cdv_sound {
  constructor(audioUrls) {
    this.ArrBGM = [];
    this.ArrSE = [];
    this.urls = audioUrls;
    log("this.urls: " + this.urls.toJSON())
  }
  get volumeSE() {
    return this.lsData?this.lsData.get('volumeSE'):1; //如果沒有lsData則為1
  }
  get volumeBGM() {
    return this.lsData?this.lsData.get('volumeBGM'):1; //如果沒有lsData則為1
  }
  setup(scene) {
    this.scene = scene;
    this.lsData = scene.game.lsData;
    var audio = this;
    var ArrSE = this.ArrSE;
    var ArrBGM = this.ArrBGM;
    this.lsData.events
      .on('changedata-volumeSE', function(parent, key, value, previousValue){
        ArrSE.forEach(function(se, idx, arr){
          se.setVolume(audio.volumeSE);
        })
      })
      .on('changedata-volumeBGM', function(parent, key, value, previousValue){
        ArrBGM.forEach(function(bgm, idx, arr){
          bgm.setVolume(audio.volumeBGM);
        })
      })
    return this;
  }
  stop(se) {
    ArrRemove(this.ArrSE, se);
    ArrRemove(this.ArrBGM, se);
    se.stop();
    se.release();
  }
  play(key, config) {
    config = !config?{}:config;
    var ArrSE = this.ArrSE;
    var se = new Media(
      this.getSrc(key),
      function playSuccess() { //se.stop也會觸發playSuccess
        log("media play success");
        ArrRemove(ArrSE, se);
        se.release();
      },
      function playError(err) {
        log("media err: " + err.code);
      }
    );
    se.soundKey = key;
    ArrAdd(this.ArrSE, se)
    var vol = config.volume?config.volume:this.volumeSE; //如果呼叫時沒給volume則取用lsData中的volume
    se.setVolume(vol);
    se.play(config); //這裡的config不是p3的。ios有{ numberOfLoops: 2, playAudioWhenScreenIsLocked : true }之類的config參數可填，見media的doc
    return se;
  }
  loop(key, config) {
    config = !config?{}:config;
    var se = new Media(
      this.getSrc(key),
      function playSuccess() { //se.stop也會觸發playSuccess
        log("media loop success");
        se.seek(0);
        se.play(config);
      },
      function playError(err) {
        log("media err: " + err.code);
      }
    );
    se.soundKey = key;
    ArrAdd(this.ArrBGM, se)
    var vol = config.volume?config.volume:this.volumeBGM; //如果呼叫時沒給volume則取用lsData中的volume
    se.setVolume(vol);
    se.play(config);  //這裡的config不是p3的。ios有{ numberOfLoops: 2, playAudioWhenScreenIsLocked : true }之類的config參數可填，見media的doc
    return se;
  }
  getSrc(key) {
    if (this.urls[key]) {
      var fileSrc = '';
      var url = this.urls[key]["mp3"];
      if (OS.android){
        var root = window.location.pathname;
        //var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + this.urls.get(key, "mp3");
        //var fileSrc = cordova.file.applicationDirectory + 'www/' + this.urls[key]['mp3']; //路徑如上但有files:///開頭
        fileSrc = root.substring(0, root.lastIndexOf('/')+1) + url;
      } 
      else if (OS.iOS){
        fileSrc = url;
      }
    } else {
      var fileSrc = 'src ' + key + ' not found';
    }
    log(fileSrc);
    return fileSrc;
  }
}

class p3_sound {
  constructor(audioUrls) {
    this.ArrBGM = [];
    this.ArrSE = [];
    this.urls = audioUrls;
    log("this.urls: " + JSON.stringify(this.urls))
  }
  get volumeSE() {
    return this.lsData?this.lsData.get('volumeSE'):1; //如果沒有lsData則為1
  }
  get volumeBGM() {
    return this.lsData?this.lsData.get('volumeBGM'):1; //如果沒有lsData則為1
  }
  setup(scene) {
    this.scene = scene;
    this.lsData = scene.game.lsData;
    var audio = this;
    var ArrSE = this.ArrSE;
    var ArrBGM = this.ArrBGM;
    this.lsData.events
      .on('changedata-volumeSE', function(parent, key, value, previousValue){
        ArrSE.forEach(function(se, idx, arr){
          se.volume = audio.volumeSE;
        })
      })
      .on('changedata-volumeBGM', function(parent, key, value, previousValue){
        ArrBGM.forEach(function(bgm, idx, arr){
          bgm.volume = audio.volumeBGM;
        })
      })
    return this;
  }
  stop(se) {
    ArrRemove(this.ArrSE, se);
    ArrRemove(this.ArrBGM, se);
    se.stop();
    se.destroy();
  }
  play(key, config) {
    //判斷音源是否存在
    var scene = this.scene;
    var audioExist = ifAudioExist(scene, key);

    if (audioExist){
      log("p3audio play " + key + ' vol' + this.volume);
      config = !config?{}:config; //如果沒有config就建一個config
      config.volume = config.volume?config.volume:this.volumeSE; //如果呼叫時沒給volume則取用lsData中的volume
      var se = this.scene.sound.add(key, config);
      se.soundKey = key;
      ArrAdd(this.ArrSE, se)
      se.play(); //on complete時p3會自動destroy se，所以不用特別處理刪除
      return se;
    } else {
      log(`[sound]${key} is not exist`)
    }

  }
  loop(key, config) {
    //判斷音源是否存在
    var scene = this.scene;
    var audioExist = ifAudioExist(scene, key);

    if (audioExist){
      log("p3audio loop " + key );
      config = !config?{}:config; //如果沒有config就建一個config
      config.volume = config.volume?config.volume:this.volumeBGM; //如果呼叫時沒給volume則取用lsData中的volume
      config.loop = true;
      var se = this.scene.sound.add(key, config);
      se.soundKey = key;
      ArrAdd(this.ArrBGM, se)
      se.play();
      return se;
    } else {
      log(`[sound]${key} is not exist`)
    }
  }
  getSrc(key) { //web audio不需要先getSrc，但是要保持method共通
    if (this.urls[key]){
      var url = this.urls[key]["mp3"];
      var root = window.location.pathname;
      var fileSrc = root.substring(0, root.lastIndexOf('/')+1) + url;
    } else {
      var fileSrc = 'src ' + key + ' not found';
    }
    log(fileSrc);
    return fileSrc;
  }
}

function soundInit(pack) {
  var audioUrls = pack2audioSrc(pack)
  var sound;
  if (OS.cordova && (OS.iOS || OS.android)) {
    log("use media plugin");
    sound = new cdv_sound(audioUrls);
  } else {
    log("use p3 audio");
    sound = new p3_sound(audioUrls);
    //sound.getSrc('right')//for test only
  }
  return sound;
}

var pack2audioSrc = function(pack){
  var result = {};
  var audioFiles = GetObjByKeyValue(pack.packKey.files, 'type', 'audio'); //取得所有音檔物件
  audioFiles.forEach(function(file, fileIdx, fileArr){
      result[file.key] = {};
      file.url.forEach(function(url, urlIdx, urlArr){
          var data = url.split('.');
          var type = data[1];
          result[file.key][type] = url;
      })
  })
  return result;
}

var ifAudioExist = function(scene, key){
  return scene.cache.audio.exists(key);
}

export { soundInit };
