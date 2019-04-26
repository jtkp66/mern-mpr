const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
