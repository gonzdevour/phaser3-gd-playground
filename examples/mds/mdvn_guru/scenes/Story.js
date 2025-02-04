import Base from './Base.js';
import initMasterScene from '../gdk/scene/InitMasterScene.js';
import { DefaultAppConfig } from '../settings/DefaultData.js';
import CreateScenario from '../gdk/ScenarioDirector/CreateScenario.js';

class Story extends Base {
    constructor() {
        super({
            key: DefaultAppConfig.sceneKey.Story
        })
    }
    init(){
        initMasterScene(this);
    }
    create() {
        //建立scenario
        this.scenario = CreateScenario(this) //x,y,maxWidth,maxHeight
        this.scenario.load(this.cache.text.get('story'), this.scenario.director, {timeUnit: 'sec'});

        this.events.emit('scenarioCreated');
    }
}

export default Story;