import EventEmitter from 'eventemitter3';
import LocalStorageData from '../../../phaser3-rex-notes/plugins/localstorage-data.js';

const DataManager = Phaser.Data.DataManager;
const GetValue = Phaser.Utils.Objects.GetValue;

class DelayTasks extends EventEmitter {
    constructor(scene, config) {
        super();

        this.scene = scene;

        var dataManager;
        var lsName = GetValue(config, 'lsName', undefined);
        if (lsName) {
            dataManager = new LocalStorageData({
                name: lsName
            });
        } else {
            dataManager = GetValue(config, 'dataManager', undefined);
            if (dataManager === undefined) {
                dataManager = new DataManager(this, this)
            }
        }
        this.dataManager = dataManager;

        scene.events.once('destroy', this.destroy, this);

        this.resetFromJSON(config);
    }

    destroy() {
        if (this.timer) {
            this.timer.remove();
        }
    }

    resetFromJSON(o) {
        var data = GetValue(o, 'data', undefined);
        if (data) {
            this.dataManager.set(data);
        }
        this.setTickPeriod(GetValue(o, 'period', 1000));
    }

    toJSON() {
        return {
            data: this.dataManager.getAll(),
            period: this.timer.delay
        }
    }

    setTickPeriod(period) {
        if (this.timer) {
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: period,
            callback: this.seek,
            args: [period],
            callbackScope: this,
            loop: true
        });
        return this;
    }

    addTask(taskName, delay) {
        this.dataManager.set(taskName, delay);
        return this;
    }

    seek(time) {        
        var dataManager = this.dataManager;
        dataManager.each(function (parent, taskName, delay) {
            delay -= time;
            if (delay <= 0) { // timeout
                this.emit(`run - ${taskName}`);
                this.emit('run', taskName);
                dataManager.remove(taskName);
            } else {
                dataManager.set(taskName, delay);
            }
        }, this);
    }

}

export default DelayTasks;