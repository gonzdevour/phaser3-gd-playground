import { getOS } from "./os.js";
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
        voices.forEach(function (voice) {
          for (var key in voice) {
            log(key + " : " + voice[key]);
          }
        });
      },
      function (reason) {
        log(reason);
      }
    );
  }
}

class speechSynthesis {
  constructor(language, voiceName) {
    this.synth = window.speechSynthesis;
    this.utter = new SpeechSynthesisUtterance();
    this.utter.lang = language;
    this.synth.addEventListener("voiceschanged", () => {
      //用箭頭函數保證this
      log("--voices on changed--");
      this.setVoice(voiceName);
    });
  }
  setVoice(voiceName) {
    var voices = this.synth.getVoices();
    log("show available voices");
    log(voices);
    var foundVoices = voices.filter(function (voice) {
      return voice.name == voiceName;
    });
    if (foundVoices.length === 1) {
      this.utter.voice = foundVoices[0];
      log(this.utter.voice.name);
    }
  }
  say(words) {
    this.synth.cancel();
    this.utter.text = words;
    this.synth.speak(this.utter);
  }
}

function speechInit() {
  var speech;
  if (OS.cordova) {
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
