const https = require('node:https');
const ora = require('ora');
const chalk = require('chalk');

const getPopularPersons = async (page, save) => {
  const spinner = ora('Fetching Populars Persons');
  const { saveInfo } = require('../utils/save')
  const { formatResponse } = require('../options/person/getPersons');
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${page}`,
    method: 'GET',
  };

  const req = await https.request(options, (res) => {
    spinner.start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Connecting ';
    }, 1000);
    spinner.color = 'green';
    spinner.text = 'Fetching Data';
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
        saveInfo('./persons/popular-persons.json', body);
      formatResponse(body);
      setTimeout(() => {
        spinner.succeed('All done 🥳');
        spinner.stop();
      }, 1500);
    });
  });

  req.end();
};

module.exports = {
  getPopularPersons,
};
