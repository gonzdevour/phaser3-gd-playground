import dialogYoyoScale from '../behaviors/dialogYoyoScale';
import ninja from "./ninja";

var bhvMethods = {
  dialogYoyoScale: dialogYoyoScale,
  ninja: ninja,
}

var addBehaviorsToGameObject = function(gameObject, bhvs){

  if (Array.isArray(bhvs)){ //如果是array

    bhvs.forEach(function(bhv, idx, arr){
      if ( typeof(bhv) === 'string' ){ //如果是字串就透過RegisterBehaviors執行function
          if (bhvMethods[bhv]){
              bhvMethods[bhv](gameObject);
          }
      } else if ( typeof(bhv) === 'function' ){ //如果已經給function了就不透過RegisterBehaviors
          bhv(gameObject);
      }
    })

  } else { //如果不是array

    if ( typeof(bhvs) === 'string' ){ //如果是字串就透過RegisterBehaviors執行function
      if (bhvMethods[bhvs]){
          bhvMethods[bhvs](gameObject);
      }
  }
  }
}

var RegisterBehaviors = function(target, bhvs){
  if (Array.isArray(target)){ //如果targets是array(要註冊複數目標)

    target.forEach(function(gameObject, idx, arr){
      addBehaviorsToGameObject(gameObject, bhvs);
    })

  } else { //如果不是array
    addBehaviorsToGameObject(target, bhvs);
  }
}

export default RegisterBehaviors;