require('dotenv').config();
const { program } = require('commander');
const ora = require('ora');
const chalk = require('chalk');

const { getPersons } = require('./options/person/getPersons');
const { getPerson } = require('./options/person/getPerson');
const { getNowPlaying } = require('./options/movies/getNowPlaying');
const { getPopularMovies } = require('./options/movies/getPopularMovies');
const { getMovie } = require('./options/movies/getMovieDetails');

program
  .name('moviedb-cli')
  .description('CLI to make requests to themoviedb.org')
  .version('0.1.0');

program
  .command('getPersons')
  .option('getPersons --page <number>')
  .option('--type <string>')
  .option('--save')
  .description(`Get persons data`)
  .action((options) => {
    const save = (options.save ? options.save : false);
    getPersons(Number(options.page), options.type, save);
    return;
  });
program
  .command('getPerson')
  .option('getPerson ')
  .option('--id <number>')
  .description(`Get data of specific person`)
  .action((options) => {
    getPerson(Number(options.id));
  });

program
  .command(`getMovies`)
  .option('--page <number>')
  .option('--type <string>')
  .option('--save')
  .description(`Get data of differents types of movies`)
  .action((options) => {
    const save = (options.save ? options.save : false);
    const page = isNaN(Number(options.page)) ? 1 : Number(options.page);
    if (options.type === 'popular') {
      getPopularMovies(page, save);
      return;
    }
    getNowPlaying(page, save);
  });
program
  .command(`getMovie`)
  .option('getMovie')
  .requiredOption('--id <number>')
  .option('--reviews')
  .description(`Get data of specific movie`)
  .action((options) => {
    console.log(options);
    getMovie(Number(options.id));
  });

program.parse();
