require('dotenv').config();
const { program } = require('commander');

const { getPersons } = require('./options/person/getPersons');

program.option('getPersons --page').option('--type');
program.option('getPerson ').option('--id');
program.option('getMovies --page').option('--type');
program.option('getMovies').option('--id');
program.option('--help');

program.parse();

const options = program.opts();

// console.log(program.args);

function start() {
  const input = program.args;
  console.log(input);
  switch (input[0]) {
    case 'getPersons':
      getPersons(input[1], input[2]);
      break;
    case 'getPerson':
      console.log(`tu quieres ver a una persona con`);
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

// function start() {
//   console.log('Welcome, type your command');
//   console.log('--list : List all commands');
//   const stdin = process.openStdin();

//   stdin.addListener('data', (data) => {
//     console.log('Tu nombre es: ' + data.toString());
//     //validation
//     const optionToSee = data.toString().split(' ');
//     optionToSee.map((op) => {});
//     //error

//     //process.exit();
//   });
// }

// start();
