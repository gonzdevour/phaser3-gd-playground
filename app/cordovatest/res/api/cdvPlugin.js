//cdvPlugin: dialog

var cdvPlugin = {};

cdvPlugin.dialog_confirm = function () {
  console.log("on dialog_confirm");
};

cdvPlugin.dialog_show = function () {
  console.log("on dialog_show");
  navigator.notification.confirm(
    "You are the winner!", // message
    dialog_confirm, // callback to invoke with index of button pressed
    "Game Over", // title
    ["Restart", "Exit"] // buttonLabels
  );
};

cdvPlugin.dialog_onPrompt = function (results) {
  console.log("on dialog_onPrompt");
  alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
};

cdvPlugin.dialog_prompt = function () {
  console.log("on dialog_prompt");
  navigator.notification.prompt(
    "Please enter your name", // message
    dialog_onPrompt, // callback to invoke
    "Registration", // title
    ["Ok", "Exit"], // buttonLabels
    "Jane Doe" // defaultText
  );
};

export { cdvPlugin };

/* class cdvPlugin {
    constructor() {
    }
    dialog_confirm() {
        console.log("on dialog_confirm");
    }
    dialog_show() {
        console.log("on dialog_show");
        navigator.notification.confirm(
          "You are the winner!", // message
          this.dialog_confirm, // callback to invoke with index of button pressed
          "Game Over", // title
          ["Restart", "Exit"] // buttonLabels
        ).bind(this);
    }
    dialog_onPrompt(results) {
        console.log("on dialog_onPrompt");
        alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    }
    dialog_prompt() {
        console.log("on dialog_prompt");
        navigator.notification.prompt(
          "Please enter your name", // message
          this.dialog_onPrompt, // callback to invoke
          "Registration", // title
          ["Ok", "Exit"], // buttonLabels
          "Jane Doe" // defaultText
        ).bind(this);
    }
  }

export default cdvPlugin; */