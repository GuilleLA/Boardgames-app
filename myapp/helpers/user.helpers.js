const hbs = require('hbs');

hbs.registerHelper('exchangeNumber', function (games) {
  return games.reduce((num, game) => game.toChange ? ++num : num, 0);
})

hbs.registerHelper('ownerNumber', function (games) {
  return games.reduce((num, game) => game.owned ? ++num : num, 0);
})

hbs.registerHelper('wishNumber', function (games) {
  return games.reduce((num, game) => game.wished ? ++num : num, 0);
})

hbs.registerHelper('followNumber', function (network) {
  return network.reduce((num, user) => user.follow ? ++num : num, 0);
})

hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('if_gold', function(a, opts) {
  let b = a.reduce((num, game) => game.owned ? ++num : num, 0)
  if (b >= 20 ) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('if_silver', function(a, opts) {
  let b = a.reduce((num, game) => game.owned ? ++num : num, 0)
  if (b >= 10) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('if_bronze', function(a, opts) {
  if (a >= 0) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('if_loop', function(a, b, opts) {
  let counter = "a"
  for(i = 0; i<a.length; i++){
    if (a[i].game == b && a[i].owned == true) {
      counter = i
      break
    }
  }
  if (counter >= 0 && a[counter].game == b && a[counter].owned == true) {return opts.fn(this)}
  else {return opts.inverse(this)}
});

hbs.registerHelper('if_loopwish', function(a, b, opts) {
  let counter = "a"
  for(i = 0; i<a.length; i++){
    if (a[i].game == b) {
      counter = i
      break
    }
  }
  if ((counter >= 0 && a[counter].game == b && a[counter].wished == true)|| ((counter >= 0 && a[counter].game == b && a[counter].owned == true))) {
    return opts.inverse(this)}
  else {return opts.fn(this)}
});