const ora = require('ora');
const chalk = require('chalk');
const { getMovieById } = require('../../services/uniqueMovie');

const getMovie = (id) => {
  //   nowPlaying(id);
  getMovieById(id);
};

const displayMovieDetails = (data) => {
  console.log(`
  Movie:

  ID: ${data.id}
  Title: ${data.title}
  Release Date: ${data.release_date}
  Runtime: ${data.runtime} min
  Vote Count: ${data.vote_count}
  Overview: ${data.overview}

  Generes:
  `);
  data.genres.map((genre) => {
    console.log(`-${genre.name}`);
  });
  console.log(`\n Languages:`);
  data.spoken_languages.map((language) => {
    console.log(`-${language.english_name}`);
  });
};

module.exports = {
  getMovie,
  displayMovieDetails,
};
