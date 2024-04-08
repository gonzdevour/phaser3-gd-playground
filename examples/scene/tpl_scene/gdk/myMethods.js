import GetValue from 'gdkPlugins/utils/object/GetValue.js';
import RegisterBehavior from './behaviors/RegisterBehaviors';
import RegisterClickEmitter from './behaviors/RegisterClickEmitter';

export default {
  _Locate(config) {
    var scene = this.scene;
    var instID = GetValue(config, 'instID', undefined);
    if (this.instID == undefined){
      this.instID = instID;
    }
  
    var layerName = GetValue(config, 'layerName', 'main');
    var viewport = GetValue(config, 'viewport', scene.viewport);
    var vpx = GetValue(config, 'vpx', 0.5);
    var vpy = GetValue(config, 'vpy', 0.5);
    var vpxOffset = GetValue(config, 'vpxOffset', 0);
    var vpyOffset = GetValue(config, 'vpyOffset', 0);
  
    scene.layerManager.addToLayer(layerName, this);
    scene.vpc.add(this, viewport, vpx, vpy);
    this.vpxOffset = vpxOffset;
    this.vpyOffset = vpyOffset;

    return this;
  },
  _LocateVPC(vpx,vpy,vpxOffset,vpyOffset) {
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
  _addBehavior(bhv) {
    RegisterBehavior(this, bhv)
    return this;
  },
  _setEE(eventName, eventEmitter, bhvs) {
    RegisterClickEmitter(this, eventName, eventEmitter, bhvs)
    return this;
  },
}