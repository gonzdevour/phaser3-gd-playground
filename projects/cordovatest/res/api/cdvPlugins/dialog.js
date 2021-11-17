//cdvPlugin: dialog

class dialog {
  constructor() {}
  confirm() {
    log("on dialog_confirm");
  }
  show() {
    log("on dialog_show");
    navigator.notification.confirm(
      "You are the winner!", // message
      confirm.bind(this), // callback to invoke with index of button pressed
      //function () { log("confirmed"); },
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
