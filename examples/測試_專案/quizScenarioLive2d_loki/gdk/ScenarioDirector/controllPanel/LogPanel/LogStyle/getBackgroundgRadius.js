var getBackgroundgRadius = function(item){
  var tl,tr,bl,br
  if (item.logIsHeader){
    tl = 20;
    tr = 20;
  }
  if (item.logIsFooter){
    bl = 20;
    br = 20;
  }
  if (!item.logIsHeader){
    tl = 10;
    tr = 10;
  }
  if (!item.logIsFooter){
    bl = 10;
    br = 10;
  }
  return { tl: tl, tr: tr, bl: bl, br: br };
}

export default getBackgroundgRadius;