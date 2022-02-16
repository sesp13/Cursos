const fs = require("fs");

//Ruta de la base de datos
const path = "./db/data.json";

const guardarDB = (data) => {
  //La ruta se toma desde donde se invoca este archivo, en este caso seria app.js

  fs.writeFileSync(path, data);
};

const leerDB = () => {
  //Comprobar la existencia del archivo
  if (!fs.existsSync(path)) {
    return null;
  }
  const info = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  guardarDB,
  leerDB,
};
