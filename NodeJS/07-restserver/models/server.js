//Global variables
const express = require("express");
const cors = require("cors");

//Custom imports
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    //propeties
    this.app = express();
    this.port = process.env.PORT;

    //Routes Path
    this.usersApiPath = "/api/users/";
    this.authPath = "/api/auth/";

    //DB Connection
    this.dataBaseConnection();

    //Middlewares
    this.middlewares();

    //Set routes
    this.routes();
  }

  async dataBaseConnection() {
    await dbConnection();
  }

  middlewares() {
    //Enable CORS
    this.app.use(cors());

    //Read and parse the body
    this.app.use(express.json());

    //Enable public directory
    this.app.use(express.static("public"));
  }

  routes() {
    //End points
    this.app.use(this.usersApiPath, require("../routes/usersRoutes"));
    this.app.use(this.authPath, require("../routes/authRoutes"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening on ${this.port}`);
    });
  }
}

module.exports = Server;
