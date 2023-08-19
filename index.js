const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

let topMovies = [
    {
        Title: "2001: A Space Odyssey",
        Director: {
            Name: "Stanley Kubrick",
            Birth_Year: 1928,
            Death_Year: 1999
        }, 
        Genre: "Sciece Fiction",
        Release_Year: 1968,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png"
    },
    {
        Title: "The Godfather",
        Director: {
            Name: "Francis Ford Coppola",
            Birth_Year: 1939
        }, 
        Genre: "Gangster",
        Release_Year: 1972,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
    },
    {
        Title: "The Shawshank Redemption",
        Director: {
            Name: "Frank Darabont",
            Birth_Year: 1959
        }, 
        Genre: "Drama",
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
    },
    {
        title: "Pulp Fiction",
        Director: {
            Name: "Quentin Tarantino",
            Birth_Year: 1963
        }, 
        Genre: "Crime",
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
    },
    {
        Title: "Blade Runner",
        Director: {
            Name: "Ridley Scott",
            Birth_Year: 1937
        }, 
        Genre: "Science Fiction",
        Release_Year: 1982,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png"
    },
    {
        Title: "Fight Club",
        Director: {
            Name: "David Fincher",
            Birth_Year: 1962
        }, 
        Genre: "Drama",
        Release_Year: 1999,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
    },
    { 
        Title: "Eternal Sunshine Of The Spotless Mind",
        Director: {
            Name: "Michel Gondry",
            Birth_Year: 1963
        }, 
        Genre: "Romance",
        Release_Year: 2004,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png"
    },
    {
        Title: "The Silence Of The Lambs",
        Director: {
            Name: "Jonathan Demme",
            Birth_Year: 1944,
            Death_Year: 2017
        }, 
        Genre: "Psychological Horror",
        Release_Year: 1991,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
    },
    { 
        Title: "Forrest Gump",
        Director: {
            Name: "Robert Zemeckis",
            Birth_Year: 1952
        },
        Genre: "Drama",
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
    },
    {
        Title: "Taxi Driver",
        Director: {
            Name: "Martin Scorsese",
            Birth_Year: 1942
        },
        Genre: "Psychological Thriller",
        Release_Year: 1976,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/3/33/Taxi_Driver_%281976_film_poster%29.jpg"
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