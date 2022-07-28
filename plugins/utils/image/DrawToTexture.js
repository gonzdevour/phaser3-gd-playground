var DrawToTexture = function(scene, x, y, width, height, imgArr, newImgKey, ifDestroySource){
    var rt = scene.add.renderTexture(x, y, width, height);
    imgArr = Array.isArray(imgArr)?imgArr:[imgArr];
    rt.draw(imgArr);//entries, x, y, alpha, tint
    if (ifDestroySource){
        for (let idx = 0; idx < imgArr.length; idx++) { 
            imgArr[idx].destroy();
        }
    }
    rt.saveTexture(newImgKey);
    rt.destroy();
}

export default DrawToTexture;