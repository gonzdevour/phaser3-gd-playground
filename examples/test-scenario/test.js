import Base from './scenes/Base.js';

import TagPlayer from '../../../phaser3-rex-notes/plugins/tagplayer.js';
import CreateActor from './scripts/Actor/CreateActor.js';
import content from './scripts/CreateContent.js';

import CsvScenario from '../../../phaser3-rex-notes/plugins/csvscenario.js';
import ScenarioDirector from './gdk/ScenarioDirector/ScenarioDirector.js';
import CreateScenarioViewport from './scripts/CreateScenarioViewport.js';

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

        //tagPlayer

        var tagPlayer = new TagPlayer(this ,{
            texts: false,  //關閉預設物件
            sprites: false,//關閉預設物件
            parser: {
                delimiters: '<>',
                comment: '//'
            },
        })
        tagPlayer
            .addGameObjectManager({
                name: 'char',
                createGameObject: CreateActor,
                fade:500,
            })
            .on('+fadeOutAllTalk', function(parser, a, b) {
                var allChars = tagPlayer.getGameObject('char');
                for (var key in allChars) {
                    var char = allChars[key];
                    char.stopTalk();
                }
            })

        //scenario

        var storyCSV = this.cache.text.get('story');
        //console.log(storyCSV);
        this.scenario = new CsvScenario(this);
        this.scenarioDirector = new ScenarioDirector(this, tagPlayer);

        var scenario = this.scenario;
        var scenarioDirector = this.scenarioDirector;
        scenario
            .on('log', function (msg) {
                console.log('sLog: ' + msg)
            }, this)
            .on('complete', function () {
                console.log('sLog: ' + 'complete')
            }, this)
            .load(storyCSV, scenarioDirector, {
                timeUnit: 'sec'
            })
            .start();

        this.input.on('pointerup', function () {
            scenario.continue('click');
        },this);

    }
    update() { }
}

export default Test;