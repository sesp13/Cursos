import { Sequelize } from 'sequelize';

export const db = new Sequelize('ts-server', 'root', '', {
  host: "localhost",
  dialect: "mariadb",
  // /* ver sql por la consola */
  // logging: false
})