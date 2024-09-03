const express = require("express");
const app = express();
const { getAllMovies, getMovieById } = require("./controller")

app.get("/movies", async (req, res) => {
    const result = getAllMovies();
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/movies/details/:id", async (req, res) => {
    const result = getMovieById(req.params.id);
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/", (req, res) => res.send("Server IS Live"));

module.exports = { app };