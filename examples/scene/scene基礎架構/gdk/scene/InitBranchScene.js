import SetupLayerManager from '../layer/SetupLayerManager';
import SetupScaleOuter from '../viewport/SetupScaleOuter';
import SetupTransition from './SetupTransition';
import CreateCameraCenter from '../viewport/CreateCameraCenter';
import CreateToast from '../toast/CreateToast';

var initBranchScene = function(scene) { //在branch scene的init執行
    //scene kits
    scene.vpc = scene.plugins.get('rexViewportCoordinate');
    scene.layerManager = SetupLayerManager(scene);
    scene.viewport = SetupScaleOuter(scene);    //scene.viewport//setup時會順便做一次scale()
    scene.center = CreateCameraCenter(scene); //scene.center, camera main follows easeMove-able center label
    scene.toast = CreateToast(scene);

    //sound
    scene.audio = scene.game.audio?scene.game.audio.setup(scene):scene.game.sound; //將scene傳給this回傳audio，如果this.game.audio不存在則以內建sound為audio

    //transition
    SetupTransition(scene);

    return scene;
}

export default initBranchScene;