const fs = require('node:fs')


const readFromFile = (path) =>{
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);
    return data
}

module.exports = {
  readFromFile
}