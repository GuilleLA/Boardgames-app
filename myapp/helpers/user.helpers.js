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