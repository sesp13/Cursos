require('dotenv').config();

const express = require("express");

//Server and params
const app = express();
const port = process.env.PORT;
const hbs = require("hbs");

//Render handlebars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials/");

//Middlewares

//Serve static content
app.use(express.static("public"));

//Another routes
app.get("/", (req, res) => {
  //Render handle
  res.render("home", {
    nombre: "Santiago",
    titulo: "Curso de node",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    nombre: "Santiago",
    titulo: "Curso de node: Generic Page",
  });
  // res.sendFile(__dirname + "/public/generic.html");
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "Santiago",
    titulo: "Curso de node Elements",
  });
  // res.sendFile(__dirname + "/public/elements.html");
});

//Ruta comodin para el error 404
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

//Turn on the server
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
