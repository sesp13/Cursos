"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users/'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || "3000";
        //Middlewares
        this.middlewares();
        //Def routes
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Sever running on port " + this.port);
        });
    }
}
//Por defecto exporto esta clase
exports.default = Server;
//# sourceMappingURL=server.js.map