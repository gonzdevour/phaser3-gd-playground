var se = {};

se.play = function (scene, key, config) {
    if (!config) {
        config = undefined;
    };
  var s = scene.sound.add(key, config);
  s.play();
};

export { se };