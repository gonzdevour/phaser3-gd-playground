import dialogYoyoScale from "../../dialog/behavior/dialogYoyoScale";
import ninja from "./ninja";

var RegisterBehaviors = function(gameObject, bhvs){
  var bhvMethods = {
      dialogYoyoScale: dialogYoyoScale,
      ninja: ninja,
  }
  bhvs.forEach(function(bhv, idx, arr){
      if ( typeof(bhv) === 'string' ){ //如果是字串就透過RegisterBehaviors執行function
          if (bhvMethods[bhv]){
              bhvMethods[bhv](gameObject);
          }
      } else if ( typeof(bhv) === 'function' ){ //如果已經給function了就不透過RegisterBehaviors
          bhv(gameObject);
      }
  })
}

export default RegisterBehaviors;