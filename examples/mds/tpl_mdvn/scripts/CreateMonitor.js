import CreateMonitorPanel from '../gdk/templates/monitor/CreateMonitorPanel.js';

var CreateMonitor = function(scene, x, y, memory, properties){
    var style = {
        width: 600,
        fontSize: 48,
        colors: {
            main: 0x424242,
            light: 0x6d6d6d,
            dark: 0x1b1b1b
        }
    }
    return CreateMonitorPanel(scene, style, memory, properties).setPosition(x, y).layout()
}

export default CreateMonitor;