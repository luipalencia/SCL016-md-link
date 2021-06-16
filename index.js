const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

module.exports = (route) => {
  if (fs.existsSync(route)) {
    const status = fs.lstatSync(route);
    if (!status.isFile()) return;
  }
  else {
    return;
  }
  return readMyFile(route);
};

const readMyFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) reject(err);
      const links = markdownLinkExtractor(data, true);
      let arrayLinks = links.map(link => {
        if (link.href.includes('https')) {
          return  { 
          href : link.href,
          text : link.text,
          file: process.cwd(link),
        }
      }
    })
    let arrayLinksFiltered = arrayLinks.filter(element => element !== undefined);
    resolve(arrayLinksFiltered); 
  })
  })
}
