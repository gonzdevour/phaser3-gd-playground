import Base from './scenes/Base.js';
import CreateScenario from './gdk/ScenarioDirector/CreateScenario.js';

class Test extends Base { //'#000000'
    constructor() {
        super({
            key: 'test'
        })
    }
    preload() {
        //this.load.text('story', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVH0ovFueknTvQVLeui-v7BzWilg__WAHtaCJpnojaTUnGLj_fCPJuJn5RlvAAk6nE4SftO0Ju_f_W/pub?gid=1513197210&single=true&output=csv')
    }
    create() {

        var vx = this.viewport.centerX;
        var vy = this.viewport.centerY;
        var vw = this.viewport.width;
        var vh = this.viewport.height;
        this.scenario = CreateScenario(this) //x,y,maxWidth,maxHeight
        this.scenario.load(this.cache.text.get('story'), this.scenario.director, {timeUnit: 'sec'});

        var scene = this;
        var director = this.scenario.director;
        director.start('範例')
            .then(function(){
                console.log('scenario promise complete')
                scene.transitionTo('Home', 2);
            })


        //var testObj = this.rexUI.add.roundRectangle(200,200,100,100,10,0xff0000);
        //this.layerManager.addToLayer('system', testObj);
        
        this.input.on('wheel', function(){
            this.toast.bake('歡迎光臨！')
            //console.log(this.children.list)
            //this.scenario.director.presetSave();
        },this)

    }
    update() { }
}

export default Test;