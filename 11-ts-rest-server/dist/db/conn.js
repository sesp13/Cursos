"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize('ts-server', 'root', '', {
    host: "localhost",
    dialect: "mariadb",
    // /* ver sql por la consola */
    // logging: false
});
//# sourceMappingURL=conn.js.map