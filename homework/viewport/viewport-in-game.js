//request in-game-viewport

var getViewport = function (scene) {
    //get viewport in resize mode with scaleOuter
    var vw, vh;
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    var wr = wh / ww;
    var cw = scene.game.config.width;
    var ch = scene.game.config.height;
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
    var v = {};
    v.width = vw;
    v.height = vh;
    v.TLX = 0-(vw-cw)/2;
    v.TLY = 0-(vh-ch)/2;
    v.TRX = cw+(vw-cw)/2;
    v.TRY = 0-(vh-ch)/2;
    v.BLX = 0-(vw-cw)/2;
    v.BLY = ch+(vh-ch)/2;
    v.BRX = cw+(vw-cw)/2;
    v.BRY = ch+(vh-ch)/2;
  return v;
};

export { 
    getViewport 
};