const Game = require('../models/game.model')

module.exports.search = ((req, res, next) => {
  const criteria = {};
  if (req.query.search) {
    console.log(req.query.search);
    const exp =  new RegExp(req.query.search, 'i');
    // Usando $in se puede hacer búsquedas por más de 2 campos!!! (SERÍA LA MEJORA FINAL)
    criteria.$or = [ { name: exp } ]
  }

  Game.find( criteria )
    //.skip(50)
    .limit(8)
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games, 
        search: req.query.search })
    })
    .catch(next)
});
