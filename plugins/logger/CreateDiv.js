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
    if (config.hasOwnProperty('fontSize')) {
        div.style.fontSize = config.fontSize;
    } else {
        div.style.fontSize = '12px';
    }
    if (config.hasOwnProperty('opacity')) {
        div.style.opacity = config.opacity;
    } else {
        div.style.opacity = 1;
    }
    if (config.hasOwnProperty('backgroundColor')) {
        div.style.backgroundColor = config.backgroundColor;
    }

    div.style.zIndex = '0';
    div.style.display = 'inline';
    div.style.position = 'absolute';
    div.style.overflow = 'auto';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '2px';
    div.style.margin = '5px';
    div.style.padding = '5px';

    return div;
}

export default CreateDiv;