const hbs = require('hbs');

hbs.registerHelper('exchangeNumber', function (games) {
  return games.reduce((num, game) => game.toChange ? ++num : num, 0);
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