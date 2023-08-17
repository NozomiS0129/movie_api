const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

let topMovies = [
    {
        title: "The Lord Of The Rings",
        director: "Peter Jackson"
    },
    {
        title: "The Godfather",
        director: "Francis Ford Coppola"
    },
    {
        title: "The Shawshank Redemption",
        director: "Frank Darabont"
    },
    {
        title: "Pulp Fiction",
        director: "Quentin Tarantino"
    },
    {
        title: "Blade Runner",
        director: "Ridley Scott"
    },
    {
        title: "Fight Club",
        director: "David Fincher"
    },
    {
        title: "Eternal Sunshine Of The Spotless Mind",
        director: "Michel Gondry"
    },
    {
        title: "The Silence Of The Lambs",
        director: "Jonathan Demme"
    },
    {
        title: "Forrest Gump",
        director: "Robert Zemeckis"
    },
    {
        title: "Taxi Driver",
        director: "Martin Scorsese"
    }
];

app.get("/movies", (req, res) => {
    res.json(topMovies);
});

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});