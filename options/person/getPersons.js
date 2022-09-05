const { getLatestPerson } = require('../../services/latestPerson');
const {getPopularPersons} = require('../../services/popularPersons')
const ora = require('ora')



const getPersons = async (page, personType) => {

  if (personType == 'popular') {
    //Call to get popular people with the page
    

    const spinner = ora('Fetching Populars Persons');

    spinner.start();

    // Update
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Connecting ';
        spinner.succeed('All done 🥳')
        spinner.stop()
    }, 1000);
    setTimeout(() => {
      getPopularPersons(page)
    },1500)


  } else if (personType == 'latest') {
    //Call to get lastest person with the page
    const spinner = ora('Fetching Populars Persons');

    spinner.start();

    // Update
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Connecting ';
        spinner.succeed('All done 🥳')
        spinner.stop()
    }, 1000);
    setTimeout(() => {
      getLatestPerson(page);
    },1500)
  } else {
    //We must show the help information because some option was wrong
    console.log('something went wrong');
  }
  console.log(page, personType);

};

const formatResponse = (data) => {
  const formated = data.results.map(person => {
    return {id:person.id,name: person.name,department: person.known_for_department, movies: formatMoviesPersons(person.known_for)}
  })
  formated.page = data.page
  formated.total_pages = data.total_pages

  displayPopularPersons(formated);
}

const displayLatestPerson = (data) =>{
  // const spinner = ora('Loading unicorns').start();

  // setTimeout(() => {
  //   spinner.color = 'yellow';
  //   spinner.text = 'Loading rainbows';
  // }, 1000);
  console.log("Person: ");
    console.log("Person Id: "+data.id);
    console.log("Person Name: "+data.name);
    console.log("Person Department: "+data.known_for_department);

    console.log("--------------------------------------");
}


const formatMoviesPersons = (movies) => {
  return movies.map(movie =>{
    return {ID: movie.id,release_date: movie.release_date,title: movie.title}
  }) 
}

const displayPopularPersons = (data) => {
  data.map(person => {
    console.log("Person: ");
    console.log("Person Id: "+person.id);
    console.log("Person Name: "+person.name);
    console.log("Person Department: "+person.department);
    console.log("\n");
    console.log("Person Movies: ");
    person.movies.map(movie => {
      console.log("Movie: ");
      console.log("\tID: "+movie.ID);
      console.log("\tRelease date: "+movie.release_date);
      console.log("\tTitle: "+movie.title);
    })
    console.log("--------------------------------------");
  })

  console.log(`Page: ${data.page} of: ${data.total_pages}`);
}



module.exports = { getPersons,formatResponse, displayLatestPerson };
