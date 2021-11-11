//speech
const synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance();

var init = function (language, voiceName) { //voiceName: "Google 國語（臺灣）"|"Microsoft Hanhan - Chinese (Traditional, Taiwan)"
  utter.lang = language;
  setTimeout(function () {
    this.setVoice(voiceName);
  }.bind(this), 1000);
};

var setVoice = function(voiceName) {
  var voices = synth.getVoices();
  //console.log(voices);
  var foundVoices = voices.filter(function (voice) {
    return voice.name == voiceName;
  });
  if (foundVoices.length === 1) {
    utter.voice = foundVoices[0];
    console.log(utter.voice.name);
  }
}

var say = function (words) {
  utter.text = words;
  synth.speak(utter);
};

export {init, setVoice, say};

/* class speech {
  constructor() {
  }
  init(language, voiceName) {
    utter.lang = language;
    setTimeout(function () {
      this.setVoice(voiceName);
    }.bind(this), 1000);
  }
  setVoice(voiceName) {
    var voices = synth.getVoices();
    console.log("show available voices");
    console.log(voices);
    var foundVoices = voices.filter(function (voice) {
      return voice.name == voiceName;
    });
    if (foundVoices.length === 1) {
      utter.voice = foundVoices[0];
      console.log(utter.voice.name);
    }
  }
  say(words) {
    utter.text = words;
    synth.speak(utter);
  }
} */

//export default speech;
