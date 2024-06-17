import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var config = { // simpleLabel的設定
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, },
            icon: null,
            text: { fontSize: 20, },
            action: null,
        }

        var dataList = [
            { name: 'A', text: 'AAA', score: 90 },
            { name: 'B', text: 'BBB', score: 50 },
            { name: 'C', text: 'CCC', score: 80 },
            { name: 'D', text: 'DDD', score: 100 },
        ]

        var panel = this.rexUI.add.sizer({ x: 400, y: 300, orientation: 'y', }) //leaderboard

        for (var i = 0, cnt = dataList.length; i < cnt; i++) { //產出每個人的資料面板
            var data = dataList[i];
            var gameObject = this.rexUI.add.simpleLabel(config)
                .resetDisplayContent(data.text)
                .setName(data.name)
                .setData('score', data.score)

            panel.add(gameObject); //將資料面板加入leaderboard
        }

        panel.sortChildrenByData('score', true); //sort後不會改變位置，要等下一次layout
        panel.layout();

        // // Animation
        // var children = panel.getElement('items'); //items為子物件的預設名稱
        // for (var i = 0, cnt = children.length; i < cnt; i++) {
        //     var child = children[i];
        //     child.setData('prevY', child.y); //取得layout前的位置
        // }

        // panel.layout();

        // for (var i = 0, cnt = children.length; i < cnt; i++) { //layout之後，位置已經重排。以動畫表現從上個位置tween到現在位置
        //     var child = children[i];
        //     var targetY = child.y;
        //     var prevY = child.getData('prevY')
        //     var targetX = (prevY < targetY) ? 10 : -10;
        //     child.setY(prevY);
        //     this.tweens.add({
        //         targets: child,
        //         props: {
        //             y: { value: targetY, duration: 1000, },
        //             x: { value: `+=${targetX}`, yoyo: true, duration: 500 }
        //         }
        //     })
        // }

        this.input.on("pointerdown", function(pointer){
            var children = panel.getElement('items'); //items為子物件的預設名稱
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                child.setData('score', Math.round(100*Math.random()));
            }
            panel.sortChildrenByData('score', true); //sort後不會改變位置，要等下一次layout

            // Animation
            var children = panel.getElement('items'); //items為子物件的預設名稱
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                child.setData('prevY', child.y); //取得layout前的位置
            }

            panel.layout();

            for (var i = 0, cnt = children.length; i < cnt; i++) { //layout之後，位置已經重排。以動畫表現從上個位置tween到現在位置
                var child = children[i];
                var targetY = child.y;
                var prevY = child.getData('prevY')
                var targetX = (prevY < targetY) ? 10 : -10;
                child.setY(prevY);
                this.tweens.add({
                    targets: child,
                    props: {
                        y: { value: targetY, duration: 1000, },
                        x: { value: `+=${targetX}`, yoyo: true, duration: 500 }
                    }
                })
            }

        }, this)

    }
    update ()
    {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);