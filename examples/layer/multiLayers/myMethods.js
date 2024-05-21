import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import OnWindowResize from 'gdkPlugins/utils/rwd/OnWindowResize.js';

export default {
  _locate(config) {
    var scene = this.scene;
    var instID = GetValue(config, 'instID', undefined);
    if (this.instID == undefined){
      this.instID = instID;
    }
  
    var layerName = GetValue(config, 'layerName', 'main');
    var viewport = GetValue(config, 'viewport', scene.viewport);
    var vpx = GetValue(config, 'vpx', undefined);
    var vpy = GetValue(config, 'vpy', undefined);
    var vpxOffset = GetValue(config, 'vpxOffset', 0);
    var vpyOffset = GetValue(config, 'vpyOffset', 0);
  
    scene.layerManager.addToLayer(layerName, this);

    if (vpx == undefined){
      this.setPosition(vpxOffset, vpyOffset);
    } else {
      scene.vpc.add(this, viewport, vpx, vpy);
      this.vpxOffset = vpxOffset;
      this.vpyOffset = vpyOffset;
    }

    return this;
  },
  _locateVPC(vpx,vpy,vpxOffset,vpyOffset) {
    var scene = this.scene;
    var viewport = scene.viewport;
    scene.vpc.add(this, viewport, vpx, vpy);
    this.vpxOffset = vpxOffset;
    this.vpyOffset = vpyOffset;

    return this;
  },
  _resizeByWidth(newWidth) {
    var newScale = (newWidth/this.width);
    this.setScale(newScale,newScale)
    return this;
  },
  _resizeByHeight(newHeight) {
    var newScale = (newHeight/this.height);
    this.setScale(newScale,newScale)
    return this;
  },
  _setRWD(callback){
    var scene = this.scene;
    OnWindowResize(scene, callback, this);
  },
}