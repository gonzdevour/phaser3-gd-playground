import 'phaser';

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
        var pic = this.add.image(400, 300, 'right')
        //pic.setScale(0.5);
        pic.setDisplaySize(50,50);

// 给定的字符串
const str = `
[SCRIPTEVENT]102
 Name=濟南慘案
Condition
 AA
 BB
Script
 CC
 DD
[/SCRIPTEVENT]`;

// 使用正则表达式匹配每个属性的值
const regex = /(\w+)\s*\n((?:.*?\n)+)/g;
let match, data = {};
while ((match = regex.exec(str)) !== null) {
  const [, key, value] = match;
  data[key] = value.trim().split('\n').filter(line => line !== '');
}
console.log(data)
debugger
// 将 Condition 和 Script 的值合并成多行文本字符串
const json = {
  SCRIPTEVENT: data.SCRIPTEVENT[0],
  Name: data.Name[0],
  Condition: data.Condition.slice(1).join('\n'), // 跳过第一个元素
  Script: data.Script.slice(1).join('\n') // 跳过第一个元素
};

// 打印解析后的 JSON 对象
console.log(json);

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