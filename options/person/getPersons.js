const getPersons = (page, personType) => {
  if (personType == 'popular') {
    //Call to get popular people with the page
  } else if (personType == 'latest') {
    //Call to get lastest person with the page
  } else {
    //We must show the help information because some option was wrong
    console.log('something went wrong');
  }
  console.log(page, personType);
};

module.exports = { getPersons };
