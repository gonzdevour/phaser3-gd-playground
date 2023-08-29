import 'phaser';
import jss_parse_do from './parsejs';

class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'test'
        })
    }
    preload() {
        this.load.pack('pack', 'assets/pack.json');
    }
    create() {

        jss_parse_do({
            method: "init",
            appid:"kgpw78Sz81ZkhH97nZqY0e6TnQxlmKR43dHZST7p",
            jskey:"2grdsnqFBWk88Jh83qTIUkZc3IdPyKAKGD6qO0yF",
            url:"https://parseapi.back4app.com",
        }, function(result, method){
            console.log(method + " success")
        }, function(result, method){
            console.log(method + " error")
        })

        jss_parse_do({
            method: "getobjbyid",
            typename:"UserInfo",
            id:"gVvkcO8RhI",
        }, function(result, method){
            console.log(method + " success")
        }, function(result, method){
            console.log(method + " error")
        })

        console.log('say something')

    }
    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: Test
};

var game = new Phaser.Game(config);