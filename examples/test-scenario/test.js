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
        this.scenario.load(this.cache.text.get('story'), this.scenario.director, {timeUnit: 'sec'});
        this.scenario.director.next('範例');

        var topMostLayer = this.add.layer();
        var testObj = this.rexUI.add.roundRectangle(200,200,100,100,10,0xff0000);
        this.layerManager.add('system', testObj);
        
        this.input.on('wheel', function(){
            this.children.bringToTop(toast);
            this.toast.showMessage('歡迎光臨！')
        },this)

    }
    update() { }
}

export default Test;