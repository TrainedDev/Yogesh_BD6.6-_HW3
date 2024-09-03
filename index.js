const express = require("express");
const app = express();
const { getAllgames, getGamesById } = require("./controller")

app.get("/games", async (req, res) => {
    const result = getAllgames();
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/games/details/:id", async (req, res) => {
    const result = getGamesById(req.params.id);
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/", (req, res) => res.send("Server IS Live"));

module.exports = { app };