class Logger {
    constructor(parent, config) {
        if (parent === undefined) {
            parent = document;
        }
        if (config === undefined) {
            config = {};
        }

        if (typeof (parent) === 'string') {
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

var CreateDiv = function (config) {
    var div = document.createElement('div');

    if (config.hasOwnProperty('width')) {
        div.style.width = config.width;
    }
    if (config.hasOwnProperty('height')) {
        div.style.height = config.height;
    }
    if (config.hasOwnProperty('x')) {
        div.style.left = config.x;
    } else {
        div.style.left = '0px';
    }
    if (config.hasOwnProperty('y')) {
        div.style.top = config.y;
    } else {
        div.style.top = '0px';
    }
    if (config.hasOwnProperty('backgroundColor')) {
        div.style.backgroundColor = config.backgroundColor;
    }

    div.style.zIndex = '0';
    div.style.display = 'inline';
    div.style.position = 'absolute';

    div.style.overflow = 'auto';
    return div;
}

export default Logger;