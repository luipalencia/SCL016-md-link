const mdLinks = require('./index.js');

const path = process.argv[2];

mdLinks(path).then(file => console.log(file));


