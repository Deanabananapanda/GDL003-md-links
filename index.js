const fs = require('fs');
const path = require('path');
const mdLinks = {};
const file = process.argv[2];
const marked = require('marked');
const cheerio = require('cheerio');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const colors = require('colors');
const emoji = require('node-emoji');


// const request = require('request');
// request({method: 'HEAD', uri:''}, function (error, response, ) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) 
// })

mdLinks.findLinks = (etiquetasHTML) => {
  const $ = cheerio.load(etiquetasHTML) 
  let links = [];
  $('a').each(function(i, element) {
  links.push($(element).attr("href"));
  })
  // el each interactua con cada link y los guarda en el "elemento"
  console.log(links.length); 
  // links.each(function(i, element) {
    for(var s=0; s<links.length; s++){
      element = links[s];

     //element = element.replace(' ', '');
    const request = new XMLHttpRequest();
     //let request = new XMLHttpRequest (); 
    request.open('GET', element, true);
    //request.send(null);
    if (request.status == 404) {
    console.log(element, 'Link roto :(');
    } else {
      // console.log(request.status);
    console.log(element, 'Link encontrado'.rainbow, emoji.get('rainbow'));
    }
  }
};

 
mdLinks.markedHtml = (markedData) => { 
  let mdToHtml= marked(markedData);
  // console.log(mdToHtml);
mdLinks.findLinks (mdToHtml)
};

mdLinks.readFile = (file, callback) => {
  fs.readFile(file, "utf8", function (err, data) { 
       if (err) throw err;
         // console.log(data);
         callback(data);
         mdLinks.markedHtml (data)
         });
};


mdLinks.filePath = (file) => {
// path.extname(file) === ".md";
  if (path.extname(file) === ".md") { 
    mdLinks.readFile(file, (data) => {
      // console.log(data);
    });
    return true;
  } else { 
    return false, "NO es un archivo .md INTENTE DE NUEVO";
  }
 };

 console.log(mdLinks.filePath(file));


 

 module.exports = mdLinks;


