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
        this._visible = true;
    }

    log(text) {
        this.print.innerHTML += `${text}<br>`;
        this.print.scrollTop = this.print.scrollHeight - this.print.clientHeight;
        return this;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
        this.print.style.display = (value) ? 'inline' : 'none';
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    toggleVisible() {
        this.setVisible(!this.visible);
        return this;
    }

    destroy() {
        this.print.remove();
        return this;
    }
}

export default Logger;