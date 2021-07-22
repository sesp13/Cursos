//Importar archivo
const { crearArchivo } = require("./helpers/multiplicar");
const argv = require("./config/yargs");
const colors = require("colors/safe");

console.clear();

//Capturas simples por posicion
// console.log(process.argv);
// const [, , arg3 = "base=5"] = process.argv;
// const [, base = 5] = arg3.split("=");

//Capturas de parametros mas simple
//por medio de un paquete YARGS
console.log(argv);

// console.log("base yargs " + argv.b);

// const base = 5;

crearArchivo(argv.base, argv.listar, argv.hasta)
  .then((nombreArchivo) =>
    console.log(colors.rainbow(`${nombreArchivo} creado`))
  )
  .catch((err) => console.log(err));
