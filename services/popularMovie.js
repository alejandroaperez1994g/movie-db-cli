const chalk = require('chalk');
const https = require('node:https');
const ora = require('ora');

const getPopularsMovies = async (page, save,local) => {
  const path = '../movies/popular-movies.json';
  const { formatPopularMovie } = require('../options/movies/getPopularMovies');
  const { saveInfo } = require('../utils/save')
  const { readFromFile } = require('../utils/read')
  const spinner = ora('Fetching Populars Persons');


  if(local){
    const data = readFromFile('./movies/popular-movies.json')
    formatPopularMovie(data);
    return;
  }


  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${page}`,
    method: 'GET',
  };

  const req = await https.request(options, (res) => {
    spinner.start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Connecting ';
    }, 1000);
    let data = '';
    res.on('data', (d) => {
      data = data + d;
    });

    res.on('end', () => {
      const body = JSON.parse(data);
      if (body.status_code) {
        console.log('\n' + chalk.red(body.status_message));
        spinner.fail(`Something went wrong 😰`);
        return;
      }

      if(save)
        saveInfo('./movies/popular-movies.json', body);
      formatPopularMovie(body);
      spinner.succeed('All done 🥳');
      spinner.stop();
    });
  });
  req.end();
};

module.exports = {
  getPopularsMovies,
};
