import TickBehavior from './TickBehavior.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Rotate extends TickBehavior {
    resetFromConfig(config) {
        this.setSpeed(GetValue(config, 'speed', 0));
    }

    update(time, delta) {
        this.gameObject.angle += this.speed * (delta / 1000);
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }
}

export default Rotate;