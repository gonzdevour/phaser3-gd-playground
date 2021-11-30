import { getOS } from "../../../../plugins/os.js";
//get OS status
var OS = getOS();

//dialog

class cdv_dialog {
  constructor() {}
  onConfirm(btnIdx) {
    log("finally confirmed!");
    log("btnIdx:" + btnIdx);
  }
  show() {
    log("on dialog_show");
    navigator.notification.confirm(
      "You are the winner!", // message
      this.onConfirm,
      "Game Over", // title
      ["Restart", "Exit"] // buttonLabels
    );
  }
  onPrompt(results) {
    log("on dialog_onPrompt");
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
  }
  prompt() {
    log("on dialog_prompt");
    navigator.notification.prompt(
        "Please enter your name", // message
        this.onPrompt, // callback to invoke
        "Registration", // title
        ["Ok", "Exit"], // buttonLabels
        "Jane Doe" // defaultText
        );
  }
  alert() {
    log("on dialog_alert");
    navigator.notification.alert(
      "You are the winner!", // message
      function () { log("alertDismissed"); }, // callback
      "Game Over", // title
      "Done" // buttonName
    );
  }
}

class p3_dialog {
  constructor() {}
  onConfirm(btnIdx) {
    log("finally confirmed!");
    log("btnIdx:" + btnIdx);
  }
  show() {
    log("on dialog_show");
  }
  onPrompt(results) {
    log("on dialog_onPrompt");
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
  }
  prompt() {
    log("on dialog_prompt");
  }
  alert() {
  }
}

function dialogInit(){
  var dialog;
  if (OS.cordova) {
      log("init cdv dialog plugin");
      dialog = new cdv_dialog();
  } else {
    log("use rex dialog")
    dialog = new p3_dialog();
  }
  return dialog;
}

export { dialogInit };
