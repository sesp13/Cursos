"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conn_1 = require("../db/conn");
const User = conn_1.db.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = User;
//# sourceMappingURL=user.js.map