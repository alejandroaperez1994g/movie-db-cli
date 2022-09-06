const ora = require('ora');
const chalk = require('chalk');
const { nowPlaying } = require('../../services/nowPlaying');

const getNowPlaying = (page, save) => {
  nowPlaying(page, save);
};

const displayNowPlaying = (data) => {
  data.results.map((movie) => {
    console.log(`\n`);
    console.log(`Movie: `);
    console.log(`Movie Id: ${chalk.white(movie.id)}`);
    console.log(`Movie Title: ${chalk.bold(movie.title)}`);
    console.log(`Movie Release Date: ${chalk.white(movie.release_date)} `);

    console.log('--------------------------------------');
  });
  console.log(`Page: ${data.page} from ${data.total_pages} pages`);
};

module.exports = {
  getNowPlaying,
  displayNowPlaying,
};
