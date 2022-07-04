import phaser from 'phaser/src/phaser.js';
import CreateMainPanel from './CreateMainPanel';

var CreateChar = function(scene, mocName){
    var character = scene.add.rexLive2d(scene.viewport.centerX, scene.viewport.centerY, mocName)
        .setScale(0.5)
        .setExpression('F01')
        .startMotion('Idle', undefined, 'idle')
        .on('expression.start', function (name) {
            console.log(`expression.start: ${name}`)
        })
        .on('motion.complete', function (group, no) {
            console.log(`motion.complete: ${group}_${no}`)
        })
    console.log(character.getExpressionNames());
    console.log(character.getMotionNames());

    var mainPanel = CreateMainPanel(scene, {
        character: character,
    })

    return character;
}



export default CreateChar;