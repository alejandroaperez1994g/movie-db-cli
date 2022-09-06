require('dotenv').config();
const { program } = require('commander');
const ora = require('ora');
const chalk = require('chalk');

const { getPersons } = require('./options/person/getPersons');
const { getPerson } = require('./options/person/getPerson');

program
  .name('moviedb-cli')
  .description('CLI to make requests to themoviedb.org')
  .version('0.1.0');

program
  .command('getPersons')
  .option('getPersons --page')
  .option('--type')
  .description(`Get persons data`);
program
  .command('getPerson')
  .option('getPerson ')
  .option('--id')
  .description(`Get data of specific person`);
program
  .command(`getMovies`)
  .option('getMovies --page')
  .option('--type')
  .description(`Get data of differents types of movies`);
program
  .command(`getMovie`)
  .option('getMovie')
  .option('--id')
  .description(`Get data of specific movie`);
// program.option('--help');

program.parse();

function start() {
  const input = program.args;
  switch (input[0]) {
    case 'getPersons':
      if (
        Number(input[1]) > 0 &&
        (input[2] === 'latest' || input[2] === 'popular')
      ) {
        getPersons(input[1], input[2]);
      } else {
        console.log(
          `${chalk.bold(
            `Something unexpected happened, check the parameters of the entered command.`
          )}`
        );
      }
      break;
    case 'getPerson':
      if (!isNaN(Number(input[1]))) {
        getPerson(input[1]);
      } else {
        console.log(
          `${chalk.bold(
            `Something unexpected happened, check the id parameter of the command.`
          )}`
        );
      }
      break;
    case 'getMovies':
      console.log(`tu quieres ver movies`);
      break;
    case 'getMovie':
      console.log(`tu quieres ver una pelicula`);
      break;
    case 'help':
      console.log('tu quieres ayuda');
      break;
    default:
      console.log('ayuda');
  }
}

start();
