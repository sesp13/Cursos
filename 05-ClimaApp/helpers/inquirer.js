const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".red} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".red} Historial`,
      },
      {
        value: 0,
        name: `${"0.".red} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===================================".green);
  console.log("      Selecccione una opción       ".white);
  console.log("===================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

//Proceso de lectura de contenido en la linea de comandos.
async function readInput(message) {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

async function pause() {
  const opt = await inquirer.prompt({
    type: "input",
    name: "opcion",
    message: `Presione ${"Enter".green} para continuar`,
  });
  return opt;
}

async function listPlaces(places = []) {
  const choices = places.map((place, index) => {
    return {
      value: place.id,
      name: `${(index + 1).toString().green} ${place.nombre}`,
    };
  });

  if (choices.length == 0) console.log("No hay tareas");

  choices.unshift({
    value: "0",
    name: "0".green + " Cancelar",
  });

  const { id } = await inquirer.prompt({
    type: "list",
    name: "id",
    message: "Seleccione un lugar",
    choices,
  });

  return id;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
};
