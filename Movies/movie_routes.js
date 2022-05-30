var express = require("express");
var router = express.Router();
const Movie = require("./Models/movie_model");
const cache = require("./routeCache");

//get routes

router.get("/", (req, res) => {
  res.send("Movies API");
});

router.get("/getMovies", cache(30), (req, res) => {
  Movie.findAll()
    .then((movies) => {
      res.status(200).json({ status: "success", data: movies });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "error getting movies", error: err.toString() });
    });
});

router.get("/searchMovieTitle", cache(30), (req, res) => {
  let title = req.query.title;
  Movie.findOne({ where: { title } })
    .then((movie) => {
      res.status(200).json({ status: "success", data: movie });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "error finding movie", error: err.toString() });
    });
});

//post routes

router.post("/createMovie", cache(undefined, "del"), (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let release_year = req.body.release_year;
  let duration = req.body.duration;
  //ensure no movies with the same title already exist, then create a new movie
  Movie.findOne({ where: { title } })
    .then((movies) => {
      if (!movies) {
        Movie.create({ title, description, release_year, duration })
          .then((movie) => {
            res.status(200).json({ status: "success", data: movie });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ status: "error creating movie", error: err.toString() });
          });
      } else {
        res.status(200).json({ status: "success", data: "A movie with the provided title already exists"});
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "error creating movie", error: err.toString() });
    });
});


//patch routes

router.patch("/updateMovie/:id", cache(undefined, "del"), (req, res) => {
  let movieId = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let release_year = req.body.release_year;
  let duration = req.body.duration;
  Movie.update(
    { title, description, release_year, duration },
    { where: { id: movieId } }
  )
    .then((result) => {
      res.status(200).json({ status: "success", numUpdated: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "error updating likes", error: err.toString() });
    });
});

//update a movies rating based on what is sent from the client who changed the rating
router.patch("/updateMovieRating/:id", cache(undefined, "del"), (req, res) => {
  let rating = req.body.rating;
  let movieId = req.params.id;
  Movie.update({ rating }, { where: { id: movieId } })
    .then((result) => {
      res.status(200).json({ status: "success", numUpdated: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "error updating likes", error: err.toString() });
    });
});

//delete routes

router.delete("/deleteMovie", cache(undefined, "del"), (req, res) => {
  let title = req.query.title;
  Movie.destroy({ where: { title } })
    .then((num) => {
      res.status(200).json({ status: "success", numDeleted: num });
    })
    .catch((err) => {
      res.status(500).send("Error deleting movie\n" + err);
    });
});

module.exports = router;
