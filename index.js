const express = require("express");
const app = express();
const { getAllbooks, getbooksById } = require("./controller")

app.get("/books", async (req, res) => {
    const result = getAllbooks();
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/books/details/:id", async (req, res) => {
    const result = getbooksById(req.params.id);
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/", (req, res) => res.send("Server IS Live"));

module.exports = { app };