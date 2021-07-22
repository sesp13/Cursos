require('dotenv').config();

const express = require("express");

//Server and params
const app = express();
const port = process.env.PORT;

//Middlewares

//Serve static content
app.use(express.static("public"));

//Another routes

//Ruta comodin para el error 404
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Turn on the server
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
