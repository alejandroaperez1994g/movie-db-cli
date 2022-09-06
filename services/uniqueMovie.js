const https = require('node:https');
const chalk = require('chalk');
const ora = require('ora');

const getMovieById = async (id) => {
  const { displayMovieDetails } = require('../options/movies/getMovieDetails');
  const spinner = ora('Fetching Movie Details');

  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`,
    method: 'GET',
  };

  const req = await https.request(options, (res) => {
    spinner.start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Connecting ';
    }, 1000);

    spinner.color = 'green';
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
      displayMovieDetails(body);
      spinner.succeed('All done 🥳');
      spinner.stop();
    });
  });

  req.end();
};

module.exports = {
  getMovieById,
};
