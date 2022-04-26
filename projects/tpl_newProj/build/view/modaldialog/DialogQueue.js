import ModalDialogPromise from './ModalDialogPromise.js';

class DialogQueue {
    constructor(lsData) {
        this.lsData = lsData;
        this.isRunning = false;
    }

    get configs() {
        return this.lsData.get('dialogCofigQueue');
    }

    add(scene, config) {
        var configs = this.lsData.get('dialogCofigQueue');
        configs.push(config);
        this.lsData.set('dialogCofigQueue', configs)
        if(this.isRunning == false){
            this.start(scene);
        }
        return this;
    }

    shiftConfig() {
        var configs = this.lsData.get('dialogCofigQueue');
        configs.shift();
        this.lsData.set('dialogCofigQueue', configs)
        return this;
    }

    start(scene) {
        DialogQueuePromise(scene, this);
        return this;
    }
}

var DialogQueuePromise = async function (scene, dialogQueue) {
    while (dialogQueue.configs.length) { //如果dialogQueue還有值
        dialogQueue.isRunning = true;
        var config = dialogQueue.configs.shift(); //這個應該動不到dialogQueue.configs的本體
        await ModalDialogPromise(scene, config);
        dialogQueue.shiftConfig();
    }
    //dialogQueue為空，回傳結束
    dialogQueue.isRunning = false;
}

export default DialogQueue;