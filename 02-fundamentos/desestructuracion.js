const deadpol = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneracion",
  getNombre() {
    return `${this.nombre} ${thsi.apellido} ${this.poder}`;
  },
  //   edad = 50
};

// const nombre = deadpol.nombre;
// const apellido = deadpol.apellido;
// const poder = deadpol.poder;

// const { nombre, apellido, poder, edad = 0 } = deadpol;
// console.log(nombre, apellido, poder, edad);

function imprimeHeroe(heroe) {
  const { nombre, apellido, poder, edad = 0 } = heroe;
  console.log(nombre, apellido, poder, edad);
}

//Destructuracion en argumentos
function imprimeHeroe2({ nombre, apellido, poder, edad = 0 }) {
  //   const { nombre, apellido, poder, edad = 0 } = heroe;
  console.log(nombre, apellido, poder, edad);
}

// imprimeHeroe(deadpol);
// imprimeHeroe2(deadpol);

//Deestrucutrar arreglo

const heroes = ["Deadpool", "SuperMan", "Batman"];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];
const [h1, h2, h3] = heroes;

//Si no me interesan elementos previos
const [, , h3] = heroes;

console.log(h1, h2, h3);
