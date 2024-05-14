import 'phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';
import { DateTime, Duration, Interval } from "luxon";

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var dt = DateTime.local(2017, 5, 15, 8, 30);
        console.log(dt.toString())
        console.log('year: ' + dt.year)
        console.log('month: ' + dt.month)
        console.log('day: ' + dt.day)
        console.log('weekday: ' + dt.weekday)
        console.log('--dt的所有函數都回傳一個新的dt，不會改變dt本身的時間 --')
        console.log('startOf[month]: ' + dt.startOf('month').toFormat("yyyyMMdd '時間→' a hhmm"))
        console.log('endOf[month]: ' + dt.endOf('month').toFormat("yyyyMMdd '時間→' a hhmm"))
        console.log('yyyyMMdd: ' + dt.toFormat("yyyyMMdd")) //注意大小寫，MM跟mm意思不同
        console.log('+3小時2分鐘: ' + dt.plus({ hours: 3, minutes: 2 }).toFormat("yyyyMMdd '時間→' a hhmm"))
        console.log('-7天: ' + dt.minus({ days: 7 }).toFormat("yyyyMMdd '時間→' a hhmm"))
        dt = dt.minus({ days: 7 });
        console.log('-- var dt = dt-7天 --')
        console.log(dt.toFormat("yyyyMMdd '時間→' a hhmm"))

        var dur = Duration.fromObject({ hours: 2, minutes: 7 });
        console.log('+5小時7分鐘(duration版本): ' + dt.plus(dur).toFormat("yyyyMMdd '時間→' a hhmm"))

        var now = DateTime.now();
        var i = Interval.fromDateTimes(dt, now); //注意參數必須為(較舊的時間, 較新的時間)，否則會回傳NaN
        console.log('與現在相隔(幾年)：' + i.length('years'))



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