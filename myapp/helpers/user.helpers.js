const hbs = require('hbs');

hbs.registerHelper('exchangeNumber', function (arr) {
  let num = 0
    arr.forEach(element => {
      if(element.games.toChange === true){
        num++
      }      
    });
  return num;
})

hbs.registerHelper('ownerNumber', function (arr) {
  let num = 0
    arr.forEach(element => {
      if(element.games.owned === true){
        num++
      }      
    });
  return num;
})

hbs.registerHelper('wishNumber', function (arr) {
  let num = 0
    arr.forEach(element => {
      if(element.games.wished === true){
        num++
      }      
    });
  return num;
})

hbs.registerHelper('followNumber', function (arr) {
  let num = 0
    arr.forEach(element => {
      if(element.network.follow === true){
        num++
      }      
    });
  return num;
})