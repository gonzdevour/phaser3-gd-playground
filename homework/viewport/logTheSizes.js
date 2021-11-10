var bw = this.game.scale.baseSize.width;
var bh = this.game.scale.baseSize.height;
var dw = this.game.scale.displaySize.width;
var dh = this.game.scale.displaySize.height;
var gw = this.game.scale.gameSize.width;
var gh = this.game.scale.gameSize.height;
var pw = this.game.scale.parentSize.width;
var ph = this.game.scale.parentSize.height;

console.log("bw: " + bw);
console.log("bh: " + bh);
console.log("dw: " + dw);
console.log("dh: " + dh);
console.log("gw: " + gw);
console.log("gh: " + gh);
console.log("pw: " + pw);
console.log("ph: " + ph);

var vw, vh;
var ww = window.innerWidth;
var wh = window.innerHeight;
var wr = wh / ww;
var cw = this.game.config.width;
var ch = this.game.config.height;
var cr = ch / cw;
if (wr != cr) {
  //若螢幕比例與畫面比例不同
  if (wr > cr) {
    //螢幕比例比畫面比例長，改變vh
    vw = cw;
    vh = ch * ((wh * cw) / (ch * ww));
  } else {
    //螢幕比例比畫面比例寬，改變vw
    vw = cw * ((ch * ww) / (wh * cw));
    vh = ch;
  }
}
console.log("cw: " + cw);
console.log("ch: " + ch);
console.log("ww: " + ww);
console.log("wh: " + wh);
console.log("wr: " + wr);
console.log("cr: " + cr);
console.log("vw: " + vw);
console.log("vh: " + vh);