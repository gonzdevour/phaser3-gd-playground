import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//speech

class cdv_speechSynthesis {
  constructor(language, identifier) {
    this.language = language;
    this.identifier = identifier;
  }
  say(words) {
    TTS.speak({
      text: words,
      identifier: "com.apple.ttsbundle.siri_female_zh-CN_compact",
      locale: "zh-TW",
      rate: 0,
      pitch: 0,
      cancel: true,
    }).then(
      function () {
        log("speak success");
      },
      function (reason) {
        log(reason);
      }
    );
  }
  getVoice() {
    TTS.getVoices().then(
      // Array of voices [{name:'', identifier: '', language: ''},..] see TS-declarations
      function (voices) {
        /* 
        voices.forEach(function (voice) {
          for (var key in voice) {
            log(key + " : " + voice[key]);
          }
        });
        */
        log('Voices fetched')
      },
      function (reason) {
        log(reason);
      }
    );
  }
}

class speechSynthesis {
  constructor(language, voiceName) {
    this.language = language;
    this.synth = window.speechSynthesis;
    this.utter = new SpeechSynthesisUtterance();
    this.setVoice(voiceName);
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = function(){
        this.setVoice(voiceName);
      }.bind(this);
    }
  }
  setVoice(voiceName) {
    var voices = this.synth.getVoices();
    var language = this.language;
    //log("show available voices");
    //log(voices);
    var foundVoicesByName = voices.filter(function (voice) {
      return voice.name == voiceName;
    });
    var foundVoicesByLanguage = voices.filter(function (voice) {
      return voice.lang == language;
    });
    if (foundVoicesByName.length >= 1) { //用voiceName有取得voiceObj
      this.voiceObj = foundVoicesByName[0];
      log(this.voiceObj.name);
    } else if (foundVoicesByLanguage.length >= 1){ //用voiceName找不到voiceObj，改用lang尋找
      this.voiceObj = foundVoicesByLanguage[0];
      log(this.voiceObj.name);
    } else { //找不到符合需求的語音
      log('no voice found');
    }
  }
  say(words) {
    if(this.voiceObj){
      this.synth.cancel();
      this.utter.text = words;
      this.utter.voice = this.voiceObj;
      this.synth.speak(this.utter);
    } else {
      log('no voice found');
    }
  }
}

function speechInit() {
  var speech;
  if (OS.cordova && (OS.iOS || OS.android)) {
    //speech
    if (OS.iOS) {
      log("init ios speech");
      speech = new cdv_speechSynthesis("zh-TW", "com.apple.ttsbundle.siri_female_zh-CN_compact");
    } else if (OS.android) {
      log("init android speech");
      speech = new cdv_speechSynthesis("zh-TW", "");
    } else {
      log("speech not support");
    }
    speech.getVoice();
  } else {
    //speech
    log("init web speech");
    speech = new speechSynthesis("zh-TW", "Google 國語（臺灣）");
  }
  return speech;
}

export { speechInit };
