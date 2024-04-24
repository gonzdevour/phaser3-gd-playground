import InitLog from "gdkPlugins/logger/InitLog";

var CreateLogger = function(IfActive){
    var loggerStyle = {
        width: "80%",
        height: "30%",
        fontSize: Math.round(window.innerWidth / 20) + "px",
        backgroundColor: "Navy",
        opacity: 0.7,
        active: IfActive,
    }
    InitLog(loggerStyle);
    log("logger start");
}

export default CreateLogger;