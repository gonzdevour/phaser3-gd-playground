var SetupScaleOuter = function(scene, widthRatio){
  if (typeof(widthRatio) != 'number'){
    widthRatio = 1.6 //如果無值或非數值則給予預設值
  }
  scene.rexScaleOuter.scale(); //scaleOuter在進入scene時不會自動執行
  console.log('scaleOuter on ' + scene.sys.settings.key)
  scene.viewport = scene.rexScaleOuter.outerViewport; //on resize時scene.viewport不隨之變動
  scene.viewport.originalZoom = scene.cameras.main.zoom; //用來控制scaleOuter zoom
  var v = scene.viewport;
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

export default SetupScaleOuter;