//speech

const synth = window.speechSynthesis;

class speech {
  constructor(language, voiceName) {
    this.utter = new SpeechSynthesisUtterance();
    this.utter.lang = language;
    synth.addEventListener('voiceschanged', () => { //用箭頭函數保證this
      console.log('--voices on changed--')
      this.setVoice(voiceName);
    })
  }
  setVoice(voiceName) {
    var voices = synth.getVoices();
    console.log("show available voices");
    console.log(voices);
    var foundVoices = voices.filter(function (voice) {
      return voice.name == voiceName;
    });
    if (foundVoices.length === 1) {
      this.utter.voice = foundVoices[0];
      console.log(this.utter.voice.name);
    }
  }
  say(words) {
    synth.cancel();
    this.utter.text = words;
    synth.speak(this.utter);
  }
}

export { speech };