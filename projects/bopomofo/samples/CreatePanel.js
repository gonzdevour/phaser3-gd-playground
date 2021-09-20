import CreateWord from "./CreateWord";
import CreateChoices from "./CreateChoices";

var CreatePanel = function (scene) {
    return scene.rexUI.add.sizer({
        width: 400,
        orientation: 'y',
    })
        .add(
            CreateWord(scene),
            { key: 'word', expand: false, align:'center' }
        )
        .add(
            CreateChoices(scene),
            { key: 'choices', expand: true }
        )
}

export default CreatePanel;