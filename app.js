const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const hostname = "127.0.0.1";
const port = 4000;
//---------------------------------------------------------------------------

//Import route Users
const usersRoutes = require("./routes/user.routes");
//Su dung route Users
app.use("/api/v1/users", usersRoutes);
//Import route Posts
const postRoutes = require("./routes/post.routes");
//Su dung route Posts
app.use("/api/v1/posts", postRoutes);

//---------------------------------------------------------------------------
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
