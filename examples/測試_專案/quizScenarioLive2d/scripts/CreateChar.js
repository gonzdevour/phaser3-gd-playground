var CreateChar = function(scene, mocName){

    var character = scene.add.rexLive2d(0, 0, mocName)
        .setExpression('F01')
        .startMotion('Idle', 0, 'idle')
        .on('expression.start', function (name) {
            //console.log(`expression.start: ${name}`)
        })
        .on('motion.complete', function (group, no) {
            //console.log(`motion.complete: ${group}_${no}`)
        })
    //console.log(character.getExpressionNames());
    //console.log(character.getMotionNames());

    return character;
}

export default CreateChar;