const dirTree = require("directory-tree");

const tree = dirTree("assets", {attributes:['type']});

console.log(JSON.stringify(tree, undefined, 4))