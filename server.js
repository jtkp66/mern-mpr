const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const profile = require("./routes/api/profile");
const adminprofile = require("./routes/api/adminprofile");
const surveys = require("./routes/api/surveys");

const app = express();
app.use(express.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/profile", profile);
app.use("/api/surveys", surveys);

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
