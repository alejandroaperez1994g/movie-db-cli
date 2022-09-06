const https = require('node:https');
const ora = require('ora');
const chalk = require('chalk');

const nowPlaying = async(page, save) => {
  const spinner = ora('Fetch the movies that are playing now');
  const {displayNowPlaying} = require('../options/movies/getNowPlaying')
  const { saveInfo } = require('../utils/save')
  
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${page}`,
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
        saveInfo('./movies/now-playing-movies.json', body);
      displayNowPlaying(body);
      spinner.succeed('All done 🥳');
      spinner.stop();
    });
  });
  req.end();
}

module.exports = {
  nowPlaying
}