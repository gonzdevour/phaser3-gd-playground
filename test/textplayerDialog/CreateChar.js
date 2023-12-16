var CreateChar = function(scene, mocName){
    var modelSizeRatio = 0.85*scene.viewport.height/2688;
    var xAdd = scene.viewport.portrait?300:0;
    var character = scene.add.rexLive2d(scene.viewport.displayLeft+xAdd, scene.viewport.displayBottom-250, mocName)
        .setScale(modelSizeRatio)
        .setExpression('F01')
        .startMotion('Idle', 0, 'idle')
        .on('expression.start', function (name) {
            console.log(`expression.start: ${name}`)
        })
        .on('motion.complete', function (group, no) {
            console.log(`motion.complete: ${group}_${no}`)
        })
    //console.log(character.getExpressionNames());
    //console.log(character.getMotionNames());

    return character;
}

export default CreateChar;