const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Socket Manage with io
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Application routes
    this.routes();

    //Sockets Config
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Use an static public folder
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use( this.paths.auth, require('../routes/auth'));
  }

  sockets() {
    //io is socket server
    this.io.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      socket.on("disconnect", () => console.log("Goodbye puto" + socket.id));
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
