const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');

module.exports = (route) => {
  if (fs.existsSync(route)) {
    const status = fs.lstatSync(route);
    if (!status.isFile()) return;
  }
  else {
    return;
  }
  if (process.argv[3] == "--validate") {
    return readMyFile(route).then(() => {
      getLinks(validatedLinks);
});
}  
  else {
  return readMyFile(route);
}
};

let array = [];
const readMyFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) reject(err);
      const links = markdownLinkExtractor(data, true);
      let arrayLinks = links.map(link => {
        if (link.href.includes('http')) {
          return {
            href: link.href,
            text: link.text,
            file: process.cwd(link),
          }
        } 
      })
      arrayLink = arrayLinks.filter(element => element !== undefined);
      array = [...arrayLink];
      resolve(array);
      })
})
}

let validatedLinks = [];
const getLinks = (links) => {
  if (!links) reject('There isn´t any link to validate');
  const linksArray = array.map((e) =>
  axios.get(e.href, {
    keepAlive: true,
    timeout: 0,
  })
    .then(response => {
      if (response.status === 200) {
      console.table({ status : response.status, statusText: 'OK', href : e.href, title: e.text,});
      validatedLinks = [...linksArray];
      }
      else {
        console.table({ status : response.status, statusText: 'FAIL', href : e.href, title: e.text,});
        validatedLinks = [...linksArray];
        }
    })
    .catch(error => {
      console.table({ statusText: 'ERROR', href : e.href, typeOfError: error.message,});
      validatedLinks = [...linksArray];
    }))
      return validatedLinks;
}

