const https = require('node:https');

const getPersonById = async (id) => {
  const { formatPerson } = require('../options/person/getPerson');

  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`,
    method: 'GET',
  };

  const req = await https.request(options, (res) => {
    try {
      let data = '';
      res.on('data', (d) => {
        data = data + d;
      });

      res.on('end', () => {
        const body = JSON.parse(data);
        formatPerson(body);
      });
    } catch (err) {
      console.log(err);
    }
  });

  req.end();
};

module.exports = {
  getPersonById,
};
