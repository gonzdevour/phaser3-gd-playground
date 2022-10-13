import Base from './scenes/Base.js';
import CreateScenario from './gdk/ScenarioDirector/CreateScenario.js';

class Test extends Base { //'#000000'
    constructor() {
        super({
            key: 'test'
        })
    }
    preload() {
        this.load.text('story', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVH0ovFueknTvQVLeui-v7BzWilg__WAHtaCJpnojaTUnGLj_fCPJuJn5RlvAAk6nE4SftO0Ju_f_W/pub?gid=1513197210&single=true&output=csv')
    }
    create() {

        this.scenario = CreateScenario(this, 600, 300, 800, 600)
        this.scenario.load(this.cache.text.get('story'), this.scenario.director, {timeUnit: 'sec'}).start();

    }
    update() { }
}

export default Test;