//cdvPlugin: dialog

class dialog {
    constructor() {
    }
    confirm() {
        log("on dialog_confirm");
    }
    show() {
        log("on dialog_show");
        navigator.notification.confirm(
          "You are the winner!", // message
          this.confirm, // callback to invoke with index of button pressed
          "Game Over", // title
          ["Restart", "Exit"] // buttonLabels
        ).bind(this);
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
        ).bind(this);
    }
  }

export { dialog };