const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".red} Crear una tarea`,
      },
      {
        value: "2",
        name: `${"2.".red} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".red} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".red} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".red} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".red} Borrar tarea`,
      },
      {
        value: "0",
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
const leerInput = async (message) => {
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
};

const pausa = async () => {
  const opt = await inquirer.prompt({
    type: "input",
    name: "opcion",
    message: `Presione ${"Enter".green} para continuar`,
  });
  return opt;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${(index + 1).toString().green} ${tarea.desc}`,
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
    message: "Borrar",
    choices,
  });

  return id;
};

const showTaskListCheck = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${(index + 1).toString().green} ${tarea.desc}`,
      checked:  tarea.completadoEn != null 
    };
  });

  // if (choices.length == 0) console.log("No hay tareas");

  // choices.unshift({
  //   value: "0",
  //   name: "0".green + " Cancelar",
  // });

  const { ids } = await inquirer.prompt({
    type: "checkbox",
    name: "ids",
    message: "Seleccione las tareas a completar",
    choices,
  });

  return ids;
};

const confirmar = async (message) => {
  const { ok } = await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message,
  });
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  showTaskListCheck
};
