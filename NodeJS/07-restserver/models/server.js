//Global variables
const express = require("express");
const cors = require("cors");

//Packages
const fileUpload = require('express-fileupload');

//Custom imports
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    //propeties
    this.app = express();
    this.port = process.env.PORT;

    //Router api paths
    this.apiPaths = {
      auth: "/api/auth/",
      categories: "/api/categories/",
      products: "/api/products/",
      search: "/api/search/",
      uploads: "/api/uploads/",
      users: "/api/users",
    };

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

    //File uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
    
  }

  routes() {
    //End points
    this.app.use(this.apiPaths.auth, require("../routes/authRoutes"));
    this.app.use(
      this.apiPaths.categories,
      require("../routes/categoriesRoutes")
    );
    this.app.use(this.apiPaths.products, require("../routes/productsRoutes"));
    this.app.use(this.apiPaths.search, require("../routes/searchRoutes"));
    this.app.use(this.apiPaths.uploads, require("../routes/uploadsRoutes"));
    this.app.use(this.apiPaths.users, require("../routes/usersRoutes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App Listening on ${this.port}`);
    });
  }
}

module.exports = Server;
