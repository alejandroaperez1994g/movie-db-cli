const chalk = require('chalk');
const https = require('node:https');
const ora = require('ora');

const getLatestPerson = async () => {
  const spinner = ora('Fetching Populars Persons');
  const { displayLatestPerson } = require('../options/person/getPersons');
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/latest?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`,
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
      displayLatestPerson(body);
      spinner.succeed('All done 🥳');
      spinner.stop();
    });
  });
  req.end();
};

module.exports = {
  getLatestPerson,
};
