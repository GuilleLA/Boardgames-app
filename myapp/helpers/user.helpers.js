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
  if (b >= 10 ) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('if_silver', function(a, opts) {
  let b = a.reduce((num, game) => game.owned ? ++num : num, 0)
  if (b >= 5) {
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