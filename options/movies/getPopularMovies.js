const ora = require('ora');
const chalk = require('chalk');
const { getPopularsMovies } = require('../../services/popularMovie');

const getPopularMovies = (page) => {
  getPopularsMovies(page);
};

const formatPopularMovie = (data) => {
  data.results.map((movie) => {
    console.log(`
  Movie:

  ID: ${movie.id}
  Title: ${chalk.bold(movie.title)}
  Release_date: ${movie.release_date}
  Vote Count: ${movie.vote_count}
  Overview: ${movie.overview}

  ----------------------------------------------------
  `);
  });
  console.log(`Page: ${data.page} of: ${data.total_pages}`);
};

module.exports = {
  getPopularMovies,
  formatPopularMovie,
};
