import 'phaser';
import DelayTasks from '../../plugins/delaytasks/DelayTasks.js';
import AwayTime from '../../../phaser3-rex-notes/plugins/awaytime.js';


class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }


    preload() {
    }

    create() {
        var awayTime = new AwayTime().awayTime;
        console.log(`AwayTime = ${awayTime}`)

        var delayTasks = new DelayTasks(this, {       
            period: 500
        });

        delayTasks
            .on('run', function (taskName) {
                console.log(`- Run task ${taskName} -`)
            })
            .addTask('task0', 20000, function () {
                console.log('On task0')
            })
            .addTask('task1', 10000, function () {
                console.log('On task1')
            })
            .addTask('task2', 15000, function () {
                console.log('On task2')
            })
            .pauseTask('task2')
            .elapse(awayTime)

    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Test
};

var game = new Phaser.Game(config);