const fs = require('node:fs');
const path = require("path");
const notifier = require('node-notifier');

const saveInfo = (path, body) => {
  // const FILE_PATH = __dirname.split("utils")[0]+`movies\\popular-movies.txt`;
  console.log(path);
  const info = body;

  try{
    fs.writeFile(path, JSON.stringify(info),'utf-8', err => {
      if(err) console.log(err);
      notifier.notify({
        title: 'MOVIE-DB-CLI',
        message: 'Save succesfully!'
      });
    })
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  saveInfo
}