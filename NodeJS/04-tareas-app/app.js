//Paquetes de terceros
require("colors");

//Importaciones propias
// const { mostrarMenu, pausa } = require("./helpers/mensajes") ya no necesario por el inquirer;
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  showTaskListCheck,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/dataBaseController");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //Establecer las tareas si existen
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      //Create task
      case "1":
        const descripcion = await leerInput("Descripción:");
        tareas.crearTarea(descripcion);
        break;
      // Show all tasks
      case "2":
        tareas.listadoCompleto();
        break;
      // Show Completed tasks
      case "3":
        tareas.listarTareasPendientesCompletadas(true);
        break;
      // Show pending tasks
      case "4":
        tareas.listarTareasPendientesCompletadas(false);
        break;
      // Complete uncomplete task
      case "5":
        const ids = await showTaskListCheck(tareas.listadoArr);
        tareas.ModifyTasksCompleted(ids);
        break;
      //Delete task
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          //Confirmar si se desea borrar la tarea
          const confirmDelete = await confirmar("¿Estás seguro?");
          if (confirmDelete) tareas.borrarTarea(id);
        }
        break;
    }

    guardarDB(JSON.stringify(tareas.listadoArr));

    //Cerrar ciclo
    console.log("\n");
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

//Correr Main
main();
