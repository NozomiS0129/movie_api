const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/movies", { useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require("./auth.js")(app);
const passport = require("passport");
require("./passport.js");

//Add new user
app.post("/users", async (req, res) => {
    await Users.findOne({ UserName: req.body.UserName})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.UserNamen + " already exists.");
        } else {
            Users.create({
                UserName: req.body.UserName,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {res.status(201).json(user)})
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error" + error);
    });
});

//Get all users
app.get("/users", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Users.find()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error" + err);
    });
});

//Get a user by name
app.get("/users/:Username", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Users.findOne({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.UserName + " does not exist.");
        } else {
            res.status(200).json(user);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error: ", + error);
    });
});

//Update user's info
app.put("/users/:Username", passport.authenticate("jwt", {session: false}), async (req, res) => {
    if(req.user.Username !== req.params.Username){
        return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate({ Username: req.params.Username },{
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true})
    .then((updateUser) => {
        res.json(updateUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//Add a movie to user's favorites list
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $addToSet: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
    });
});

//Remove a movie from user's favorites list
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
    });
});

//Delete user account
app.delete("/users/:Username", passport.authenticate("jwt", {session: false}), async(req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + " not found.");
        } else {
            res.status(200).send(req.params.Username + " was deleted.");
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

//Get a list of ALL movies
app.get("/movies", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Movies.find().then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(error);
        res.status(500).send("Error: " + error);
    });
});

//Get data about a single movie by title
app.get("/movies/:Title", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            if(!movie) {
                res.status(400).send(req.params.Title + " not found.");
            } else {
                res.status(200).json(movie);
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

//Get data about a genre by name
app.get("/movies/genres/:GenreName", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.GenreName})
    .then((movie) => {
        if(!movie) {
            res.status(400).send(req.params.GenreName + " not found.");
        } else {
            res.status(200).json(movie.Genre);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error: ", + error);
    });
});

//Get data about a director by director's name
app.get("/movies/directors/:DirectorName", passport.authenticate("jwt", {session: false}), async (req, res) => {
    await Movies.findOne({ "Director.Name": req.params.DirectorName})
    .then((movie) => {
        if(!movie) {
            res.status(400).send(req.params.DirectorName + " not found.");
        } else {
            res.status(200).json(movie.Director);
        }
    })
    .catch((err) => {
        console.errre(err);
        res.status(500).send("Error", + err);
    });
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});