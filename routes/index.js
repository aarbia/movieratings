var express = require('express');
var router = express.Router();
var path = require('path'); 

const con = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/movies', function(req, res, next) {
  const query = `
    SELECT m.movie_id, m.title, m.release_year, m.director_name, p.company_name
    FROM movie m
    LEFT JOIN production_company p USING (production_company_id)
  `;
  con.query(query, function(err, result) {
    if (err) {
      console.log("Error retreiving movies");
      return next(err);
    }
    console.log(result);
    res.json(result);
  });
});

router.get('/movie/:id', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','movie.html'));
});

router.get('/movieDetails/:id', function(req, res, next) {

  const movieId = req.params.id;

  const queryMovie = `
    SELECT m.movie_id, m.title, m.release_year, m.director_name, p.company_name
    FROM movie m
    LEFT JOIN production_company p USING (production_company_id)
    WHERE m.movie_id = ?
  `;
  
  const queryCast = `
    SELECT c.actor_name, c.character_name
    FROM cast c
    WHERE c.movie_id = ?
  `;
  
  const queryRatings = `
    SELECT r.source, r.rating, r.top_25_rank
    FROM ratings r
    WHERE r.movie_id = ?
  `;
  
  const queryWebsite = `
    SELECT w.imdb_url, w.metacritic_url, w.rotten_tomatoes_url, w.wikipedia_url
    FROM website w
    WHERE w.movie_id = ?
  `;
  
  // Fetch the movie information
  con.query(queryMovie, [movieId], function(err, movieResults) {
    if (err) {
      console.log("Error retrieving movie.");
      next(err);
    }

    if (movieResults.length === 0) {
      res.status(404).send('Movie not found');
      return;
    }

    const movieData = movieResults[0];

    // Fetch the cast information
    con.query(queryCast, [movieId], (err, castResults) => {
      if (err) {
        console.log("Error retrieving cast.");
        next(err);
      }

      // Fetch the ratings information
      con.query(queryRatings, [movieId], (err, ratingsResults) => {
        if (err) {
          console.log("Error retrieving ratings.");
          next(err);
        }

        // Fetch the website URLs
        con.query(queryWebsite, [movieId], (err, websiteResults) => {
          if (err) {
            console.log("Error retrieving website links.");
            next(err);
          }

          const websiteData = websiteResults[0] || {};

          // Combine all the results and send them as the response
          const responseData = {
            title: movieData.title,
            release_year: movieData.release_year,
            movie_poster: `${movieId}.jpg`,
            director_name: movieData.director_name,
            production_company_name: movieData.production_company_name,
            cast: castResults || [],               // Cast array
            ratings: ratingsResults || [],         // Ratings array
            imdb_url: websiteData.imdb_url,
            metacritic_url: websiteData.metacritic_url,
            rotten_tomatoes_url: websiteData.rotten_tomatoes_url,
            wikipedia_url: websiteData.wikipedia_url
          };
          console.log('Sending response:', responseData);
          res.json(responseData);
        });
      });
    });
  }); 
});

module.exports = router;
