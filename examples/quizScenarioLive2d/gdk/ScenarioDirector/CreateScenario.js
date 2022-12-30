import CSVScenario from "../../../../../phaser3-rex-notes/plugins/csvscenario.js";
import TagPlayer from "../../../../../phaser3-rex-notes/plugins/tagplayer.js";
import ScenarioDirector from "./ScenarioDirector.js";

import CreateScenarioViewport from './viewport/CreateScenarioViewport.js';
import CreateControllPanel from "./controllPanel/CreateControllPanel.js";
import CreateActor from "./actor/CreateActor.js";
import CreateStoryBox from "./storybox/CreateStoryBox.js";
import CreateBackground from "./background/CreateBackground.js";

var CreateScenario = function(scene, x, y, width, height){
  //scenario
  scene.scenario = new CSVScenario(scene)
  scene.scenario.isPlayingText = false;
  scene.scenario.director = new ScenarioDirector(scene, {
      scenario: scene.scenario,
      viewport: CreateScenarioViewport(scene, x, y, width, height),
      tagPlayer: new TagPlayer(scene ,{
          texts: false,  //關閉預設物件
          sprites: false,//關閉預設物件
          parser: {
              delimiters: '<>',
              comment: '//'
          },
      })
      .addGameObjectManager({
        name: 'char',
        createGameObject: CreateActor,
        fade:300,
      })
      .addGameObjectManager({
          name: 'text',
          createGameObject: CreateStoryBox,
          fade:0,
      })
      .addGameObjectManager({
        name: 'bg',
        createGameObject: CreateBackground,
        fade:0,
    })
  });

  var scenario = scene.scenario;
  var director = scene.scenario.director;
  var viewport = scene.scenario.director.viewport;
  var tagPlayer = scene.scenario.director.tagPlayer;
  
  tagPlayer      
    .on('+fadeOutAllTalk', function(parser, a, b) {
        var allChars = tagPlayer.getGameObject('char');
        for (var key in allChars) {
            var char = allChars[key];
            char.stopTalk();
        }
    })
    .on('complete', function(){
      director.onTagPlayerComplete();
    })

  scenario
    .on('log', function (msg) {
      scenario.scope.onScenarioLog(msg);
    })
    .on('wait.click', function (scenario) {
      scenario.scope.onWaitClick('scenario', scenario.lastCustomCommandName);
    })
    .on('wait.choose', function (scenario) {
      scenario.scope.choicePop();
    })
    .on('complete', function () {
      scenario.scope.onScenarioComplete();
    })
  
  var controllPanel = CreateControllPanel(scene, director, viewport);
  director.controllPanel = controllPanel;

  return scenario;
}

export default CreateScenario;