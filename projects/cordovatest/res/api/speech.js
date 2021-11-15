//speech

class cdv_speechSynthesis {
  constructor(language, voiceName) {
    this.utter = new SpeechSynthesisUtterance();
    this.utter.lang = language;
    synth.addEventListener("voiceschanged", () => {
      //用箭頭函數保證this
      log("--voices on changed--");
      this.setVoice(voiceName);
    });
  }
  setVoice(voiceName) {
    var voices = synth.getVoices();
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
    synth.cancel();
    this.utter.text = words;
    synth.speak(this.utter);
  }
}

class speechSynthesis {
  constructor(language, voiceName) {
    const synth = window.speechSynthesis;
    this.utter = new SpeechSynthesisUtterance();
    this.utter.lang = language;
    synth.addEventListener("voiceschanged", () => {
      //用箭頭函數保證this
      log("--voices on changed--");
      this.setVoice(voiceName);
    });
  }
  setVoice(voiceName) {
    var voices = synth.getVoices();
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
    synth.cancel();
    this.utter.text = words;
    synth.speak(this.utter);
  }
}

export { speechSynthesis, cdv_speechSynthesis };
