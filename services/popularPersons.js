const https = require('node:https');

const getPopularPersons = async (page) => {
  const { formatResponse } = require('../options/person/getPersons');
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${page}`,
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

        formatResponse(body);
      });
    } catch (err) {
      console.log(err);
    }
  });

  req.end();
};

module.exports = {
  getPopularPersons,
};
