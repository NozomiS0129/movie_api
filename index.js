const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(morgan("common"));
app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Sam",
        email: "",
        passWord: "",
        birthDay: "",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Kate",
        email: "",
        passWord: "",
        birthDay: "",
        favoriteMovies: ["The Godfather"]
    }
];

let topMovies = [
    {
        Title: "2001: A Space Odyssey",
        Director: {
            Name: "Stanley Kubrick",
            Birth_Year: 1928,
            Death_Year: 1999
        }, 
        Genre: {
            Name: "Science Fiction",
            Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies."
        },
        Release_Year: 1968,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png"
    },
    {
        Title: "The Godfather",
        Director: {
            Name: "Francis Ford Coppola",
            Birth_Year: 1939
        }, 
        Genre: {
            Name: "Gangster",
            Description: "A gangster film focuses on gangs and organized crime. The genre is differentiated from Westerns and the gangs of that genre. The American Film Institute defines the genre as 'centered on organized crime or maverick criminals in a twentieth century setting'."
        },
        Release_Year: 1972,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
    },
    {
        Title: "The Shawshank Redemption",
        Director: {
            Name: "Frank Darabont",
            Birth_Year: 1959
        }, 
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
    },
    {
        title: "Pulp Fiction",
        Director: {
            Name: "Quentin Tarantino",
            Birth_Year: 1963
        }, 
        Genre: {
            Name: "Crime",
            Description: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection"
        },
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
    },
    {
        Title: "Blade Runner",
        Director: {
            Name: "Ridley Scott",
            Birth_Year: 1937
        }, 
        Genre: {
            Name: "Science Fiction",
            Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies."
        },
        Release_Year: 1982,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png"
    },
    {
        Title: "Fight Club",
        Director: {
            Name: "David Fincher",
            Birth_Year: 1962
        }, 
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Release_Year: 1999,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
    },
    { 
        Title: "Eternal Sunshine Of The Spotless Mind",
        Director: {
            Name: "Michel Gondry",
            Birth_Year: 1963
        }, 
        Genre: {
            Name: "Romance",
            Description: "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
        },
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
        Genre: {
            Name: "Psychological Horror",
            Description: "Psychological horror is a subgenre of horror and psychological fiction with a particular focus on mental, emotional, and psychological states to frighten, disturb, or unsettle its audience."
        },
        Release_Year: 1991,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
    },
    { 
        Title: "Forrest Gump",
        Director: {
            Name: "Robert Zemeckis",
            Birth_Year: 1952
        },
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Release_Year: 1994,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
    },
    {
        Title: "Taxi Driver",
        Director: {
            Name: "Martin Scorsese",
            Birth_Year: 1942
        },
        Genre: {
            Name: "Psychological Thriller",
            Description: "These movies delve into the human mind, exploring fear, paranoia, manipulation, and the complexity of human psychology. The genre challenges viewers intellectually and emotionally, playing with their expectations and keeping them engaged with intricate plots, mind-bending twists, and morally ambiguous characters."
        },
        Release_Year: 1976,
        Image_Url: "https://upload.wikimedia.org/wikipedia/en/3/33/Taxi_Driver_%281976_film_poster%29.jpg"
    }
];

//Add new user
app.post("/users", (req, res) => {
    const newUser = req.body;

    if (newUser.name){
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    }else{
        res.status(400).send("user need name")
    }  
});

//Update user's info
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    }else{
        res.status(400).send("no such user");
    }
});

//Add a movie to user's favorites list
app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
    } else {
        res.status(400).send("no such user");
    }
});

//Remove a movie from user's favorites list
app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
    } else {
        res.status(400).send("no such user");
    }
});

//Delete user account
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send("no such user");
    }
});

//Get a list of ALL movies
app.get("/movies", (req, res) => {
    res.status(200).json(topMovies);
});

//Get data about a single movie by title
app.get("/movies/:Title", (req, res) => {
    const {titile} = req.params;
    const movie = topMovies.find(movie => movie.Title === titile);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("There is no such movie.")
    }
});

//Get data about a genre by name
app.get("/movies/genre/:genreName", (req, res) => {
    const {genreName} = req.params;
    const genre = topMovies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("There is no such genre.")
    }
});

//Get data about a director by director's name
app.get("/movies/director/:directorName", (req, res) => {
    const {directorName} = req.params;
    const director = topMovies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("There is no such director.")
    }
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});