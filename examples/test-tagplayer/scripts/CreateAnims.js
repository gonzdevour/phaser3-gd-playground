var CreateAnims = function(scene){
    scene.anims.create({
        key: 'guardStart',
        frames: scene.anims.generateFrameNames('knight', { prefix: 'guard_start/frame', start: 0, end: 3, zeroPad: 4 }),
        frameRate: 8
    });

    scene.anims.create({
        key: 'guard',
        frames: scene.anims.generateFrameNames('knight', { prefix: 'guard/frame', start: 0, end: 5, zeroPad: 4 }),
        frameRate: 8,
        repeat: 2
    });

    scene.anims.create({
        key: 'guardEnd',
        frames: scene.anims.generateFrameNames('knight', { prefix: 'guard_end/frame', start: 0, end: 3, zeroPad: 4 }),
        frameRate: 8
    });

    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
        frameRate: 8,
        repeat: -1
    });
}

export default CreateAnims;