import Mustache from 'mustache';

var view = {
    title: "Joe",
    calc: function () {
        return 2 + 4;
    }
};

var output = Mustache.render("{{title}} spends {{calc}}", view);

console.log(output)