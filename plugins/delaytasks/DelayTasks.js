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
        this.timer.remove();
    }

    resetFromJSON(o) {
        var data = GetValue(o, 'data', undefined);
        if (data) {
            this.dataManager.set(data);
        }
        this.setTickPeriod(GetValue(o, 'period', 1000));

        var isPaused = GetValue(o, 'isPaused', false);
        if (isPaused) {
            this.pause();
        }
    }

    toJSON() {
        return {
            data: this.dataManager.getAll(),
            period: this.tickPeriod,
            isPaused: this.isPaused
        }
    }

    setTickPeriod(period) {
        if (this.timer) {
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: period,
            callback: this.elapse,
            args: [period],
            callbackScope: this,
            loop: true
        });
        return this;
    }

    get tickPeriod() {
        return this.timer.delay;
    }

    addTask(taskName, delay, callback, scope) {
        delay += this.timer.elapsed;
        var taskData = {
            // name: taskName,
            delay: delay,
            timeScale: 1,
            isPaused: false
        }
        this.dataManager.set(taskName, taskData);
        if (callback) {
            this.once(`run - ${taskName}`, callback, scope);
        }
        return this;
    }

    hasTask(taskName) {
        return this.dataManager.has(taskName);
    }

    pauseTask(taskName) {
        if (!this.hasTask(taskName)) {
            return this;
        }
        var taskData = this.dataManager.get(taskName);
        taskData.isPaused = true;
        taskData.delay -= this.timer.elapsed;
        this.dataManager.set(taskName, taskData);
        return this;
    }

    resumeTask(taskName) {
        if (!this.hasTask(taskName)) {
            return this;
        }
        var taskData = this.dataManager.get(taskName);
        taskData.isPaused = false;
        taskData.delay += this.timer.elapsed;
        this.dataManager.set(taskName, taskData);
        return this;
    }

    setTaskTimeScale(taskName, timeScale) {
        if (!this.hasTask(taskName)) {
            return this;
        }
        var taskData = this.dataManager.get(taskName);
        taskData.timeScale = timeScale;
        // TODO: Change taskData.delay value
        this.dataManager.set(taskName, taskData);
        return this;
    }

    elapse(time) {
        var dataManager = this.dataManager;
        dataManager.each(function (parent, taskName, taskData) {
            if (taskData.isPaused || (taskData.timeScale === 0)) {
                return;
            }
            taskData.delay -= (time * taskData.timeScale);
            if (taskData.delay <= 0) { // timeout
                this.emit(`run - ${taskName}`);
                this.emit('run', taskName);
                dataManager.remove(taskName);
            } else {
                dataManager.set(taskName, taskData);
            }
        }, this);
    }

    pause() {
        this.timer.paused = true;
    }

    resume() {
        this.timer.paused = false;
    }

    get isPaused() {
        return this.timer.paused;
    }

}

export default DelayTasks;