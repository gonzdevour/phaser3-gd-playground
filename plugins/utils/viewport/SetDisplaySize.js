var SetViewportDisplaySize = function(scaleOuterViewport, widthRatio){
  if (typeof(widthRatio) != 'number'){
    widthRatio = 1.6 //如果無值或非數值則給予預設值
  }
  var v = scaleOuterViewport;
  var vw = v.width;
  var vh = v.height; 
  v.portrait = vh>vw?true:false;
  v.landscape = vh>vw?false:true;      
  v.displayWidth = vw>vh?(vh/widthRatio):vw;
  v.displayHeight = vh;
  v.displayLeft = v.centerX - 0.5*v.displayWidth;
  v.displayRight = v.centerX + 0.5*v.displayWidth;
  v.displayTop = v.centerY - 0.5*v.displayHeight;
  v.displayBottom = v.centerY + 0.5*v.displayHeight;
  return v; 
}

export default SetViewportDisplaySize;