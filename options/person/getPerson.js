const ora = require('ora');
const chalk = require('chalk');
const { getPersonById } = require('../../services/uniquePerson');

const getPerson = (id) => {
  const spinner = ora('Fetching Populars Persons');

  spinner.start();
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Connecting ';
  }, 1000);
  setTimeout(() => {
    getPersonById(id);
    spinner.succeed('All done 🥳');
    spinner.stop();
  }, 1500);
};

const formatPerson = (data) => {
  console.log(`Person:

    ID: ${data.id}
    Name: ${chalk.blue(data.name)}
    Birthday: ${data.birthday} | ${data.place_of_birth}
    Department: ${chalk.magenta(data.known_for_department)}
    Biography: ${chalk.bold(data.biography)}


    Also known as: 
    ${data.also_known_as[0]}

    `);
};

module.exports = {
  getPerson,
  formatPerson,
};
