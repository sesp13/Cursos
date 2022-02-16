const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: 'number',
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar"
})
.option("l", {
    alias: "listar",
    type: "boolean",
    demandOption: false,
    default: false,
    describe: "Muestra los resultados por consola"
})
.option("h", {
    alias: "hasta",
    type: "number",
    demandOption: false,
    default: 10,
    describe: "Hasta qué número creo la tabla de multiplicar"
})
.check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base debe ser un numero";
    }
    //Si no hay error retornar true
    return true;
  }).argv;

  module.exports = argv;