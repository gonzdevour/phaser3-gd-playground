var Save = function (scene, key, newValue) {
  let savingConfig = {};
  savingConfig[key] = newValue;
  scene.model.appData.save(savingConfig);
}

export default Save;