import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
//utils
import { Delay } from '../../../../phaser3-rex-notes/plugins/eventpromise.js';

class Home extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Home
        })
    }
    init(){
        initMasterScene(this);
    }
    create() {
        var scene = this;

        this.input.on('wheel', function(){
            this.toast.bake('歡迎光臨！')
            //console.log(this.children.list)
            //this.scenario.director.presetSave();
        },this)

        //建立scenario
        var director;
        launchStoryScene(scene)
            .then(function(storyScene){
                console.log('story init')
                director = storyScene.scenario.director;
                return director.init()
            })
            .then(function(){
                console.log('story start')
                return director.start('範例')
            })
    }
}

var launchStoryScene = async function(mainScene){
    await Delay(2000);
    mainScene.scene.launch(DefaultAppConfig.sceneKey.Story, 'data2Pass');
    var storyScene = mainScene.scene.get(DefaultAppConfig.sceneKey.Story)
    return new Promise(function(resolve, reject){
        storyScene.events.once('scenarioCreated', function(){
            console.log('story scene is launched')
            resolve(storyScene);
        });
    })
}

export default Home;