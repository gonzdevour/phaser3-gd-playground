var DrawToTexture = function(scene, x, y, width, height, imgArr, newImgKey, ifDestroySource){
    var rt = scene.add.renderTexture(x, y, width, height)//.setOrigin(0.5).fill(0xff0000, 0.3);
    //var testShape = scene.rexUI.add.roundRectangle(x, y, width, height, 0, 0x0, 0).setStrokeStyle(3, 0xff0000);
    imgArr = Array.isArray(imgArr)?imgArr:[imgArr];
    rt.draw(imgArr, 0.5*width, 0.5*height);//entries, x, y, alpha, tint
    if (ifDestroySource){
        for (let idx = 0; idx < imgArr.length; idx++) { 
            imgArr[idx].destroy();
        }
    }
    rt.saveTexture(newImgKey);
    rt.destroy();
}

export default DrawToTexture;