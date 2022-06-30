const dirTree = require('directory-tree');

var GetDirTree = function(root){
  var result = dirTree(root, { attributes: ['type'] });
  debugger
  return result;
}

module.exports = GetDirTree;