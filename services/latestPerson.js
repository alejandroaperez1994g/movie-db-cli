
const https = require('node:https');

const getLatestPerson = async() => {
  const {displayLatestPerson} = require('../options/person/getPersons')
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/latest?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`,
    method: 'GET'
  };

  const req = await https.request(options, (res) => {
    try{
    
      let data = '';
      res.on('data', (d) => {
        data = data + d.toString();
      });

      res.on('end', () => {
        const body = JSON.parse(data);

        displayLatestPerson(body)
    });
    }catch(err){
      console.log(err)
    }

  });

  req.end();
}



module.exports = {
  getLatestPerson
}