//cdvPlugin: dialog

class dialog {
  constructor() {}
  onConfirm(btnIdx) {
    log("finally confirmed!");
    log("btnIdx:" + btnIdx);
  }
  show() {
    var _dialog = this;
    log("on dialog_show");
    navigator.notification.confirm(
      "You are the winner!", // message
      //this.onConfirm.bind(this),
      function (btnIdx) { 
          log("confirmed");
          _dialog.onConfirm(btnIdx);
      },
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

export { dialog };
