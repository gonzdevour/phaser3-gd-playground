import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";

var SetupViewport = function(scene, widthRatio){
  if (typeof(widthRatio) != 'number'){
    widthRatio = 1.6 //如果無值或非數值則給予預設值
  }
  scene.viewport = scene.scale.getViewPort();
  scene.viewport.originalZoom = scene.cameras.main.zoom; //用來控制scaleOuter zoom

  var v = scene.viewport;
  var rect = scene.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(10, 0xff0000);

  //rwd
  var response = function(gameSize, baseSize, displaySize, previousWidth, previousHeight){

    console.log(`window has resized -
gameSize:${gameSize}
baseSize:${baseSize}
displaySize:${displaySize}
previousWidth:${previousWidth}
previousHeight:${previousHeight}
`)

    var parentSize = scene.scale.parentSize;
    var isParentSizeLandscape = parentSize.width > parentSize.height;
    var isGameSizeLandscape = gameSize.width > gameSize.height;
    if (isParentSizeLandscape != isGameSizeLandscape) { //如果domSize跟gameSize的直橫不一樣
      scene.scale.setGameSize(gameSize.height, gameSize.width); //轉換portrait/landscape
      scene.scale.refresh();
        return;
    }
    scene.viewport = scene.scale.getViewPort(); //更新viewport
    v = scene.viewport;
    rect
        .setPosition(v.x, v.y)
        .setSize(v.width, v.height)
    
    console.log("rect.width = " + rect.width)

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
  }
  OnWindowResize(scene, response, this);
  scene.scale.refresh();

  return v; 
}

export default SetupViewport;