import CreateDiv from './CreateDiv.js';

class Logger {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        var parent = config.parent;
        if (parent === undefined) {
            parent = document.body;
        } else if (typeof (parent) === 'string') {
            parent = document.getElementById(parent);
        }

        var print = CreateDiv(config);
        parent.appendChild(print);
        this.print = print;
    }

    log(text) {
        this.print.innerHTML += `${text}<br>`;
        return this;
    }
}

export default Logger;