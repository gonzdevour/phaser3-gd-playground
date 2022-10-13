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

        var scenario = this.scenario;
        var director = this.scenario.director;
        this.input.on('pointerup', function () {
            console.log('vp clicked')
            if (scenario.isPlayingText){
                console.log('request finish typing');
                director.finishTyping();
            } else {
                if (director.tagPlayer.isPlaying){ //如果tagPlayer正在播放且不處於wait的狀態
                    director.tagPlayer.setTimeScale(10);
                } else {
                    director.tagPlayer.setTimeScale(1);
                    scenario.continue('click');
                }
            }
        },this);

    }
    update() { }
}

export default Test;