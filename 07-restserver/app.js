//Modules
require("dotenv").config();

const Server = require("./models/server");

//Instance server
const server = new Server();

//Start server
server.listen();