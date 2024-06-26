const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

// express is really just a bunch of middlewares that allow us
// to manipulate the reqs and res

const app = express();

mongoose
  .connect(
    "mongodb+srv://max:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-ntrwp.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json()); // parses the data from the req into json and how we get "req.body"
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images"))); // allows us to access this folder to retrieve our images
                                                                    // path.join(__dirname, "images")
                                                                    // directs all routes to images to
                                                                    // backend/images which is hidden
                                                                    // w/o it
// for deployment
app.use("/", express.static(path.join(__dirname, "angular")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // this would be the CORS middleware
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// for deployment
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
