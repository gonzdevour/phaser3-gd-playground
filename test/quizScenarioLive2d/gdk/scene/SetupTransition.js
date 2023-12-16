var SetupTransition = function(fromScene) {
  fromScene.events.on('transitionout', function (toScene, duration) {
      fromScene.tweens.add({
          targets: fromScene.cameras.main,
          alpha: { start: 1, to: 0 },
          delay: 0,
          duration: (duration / 2),
          repeat: 0,
      });

      toScene.tweens.add({
          targets: toScene.cameras.main,
          alpha: { start: 0, to: 1 },
          delay: (duration / 2),
          duration: (duration / 2),
          repeat: 0,
      });
  }, fromScene);

  fromScene.events.on('transitioncomplete', function () {
      var sceneKey = fromScene.sys.config.key;
      fromScene.log(`${sceneKey} transition complete`);
  }, fromScene);
}

export default SetupTransition;