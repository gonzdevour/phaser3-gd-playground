import CSVScenario from "../../../../../phaser3-rex-notes/plugins/csvscenario.js";
import TagPlayer from "../../../../../phaser3-rex-notes/plugins/tagplayer.js";
import ScenarioDirector from "./ScenarioDirector.js";

import CreateScenarioViewport from './viewport/CreateScenarioViewport.js';
import CreateActor from "./actor/CreateActor.js";
import CreateStoryBox from "./storybox/CreateStoryBox.js";

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
          fade:300,
      })
      .on('+fadeOutAllTalk', function(parser, a, b) {
          var allChars = this.getGameObject('char');
          for (var key in allChars) {
              var char = allChars[key];
              char.stopTalk();
          }
      })
  });

  var scenario = scene.scenario;
  var director = scene.scenario.director;

  scenario
    .on('log', function (msg) {
      //console.log('sLog: ' + msg)
    })
    .on('wait.click', function (scenario) {
      //console.log('scenario wait click - ' + scenario.lastCustomCommandName)
    })
    .on('wait.choose', function (scenario) {
      scenario.scope.choicePop();
    })
    .on('complete', function () {
        console.log('sLog: ' + 'complete')
    })
  
  return scenario;
}

export default CreateScenario;