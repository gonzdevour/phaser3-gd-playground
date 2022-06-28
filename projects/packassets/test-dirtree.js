/*
Execute:
node test-dirtree.js
*/

const dirTree = require("directory-tree");
var tree = dirTree('./assets', { attributes: ['type'] });
console.log(JSON.stringify(tree, null, 2));