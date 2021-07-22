const Tarea = require("./tarea");

class Tareas {
  //Listado de Tarea
  _listado = {};

  //Get listado in array
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    let tareaCompleta;
    let msg;

    this.listadoArr.forEach((tarea, index) => {
      tareaCompleta = tarea.completadoEn != null;
      msg = `${((index + 1).toString() + ".").green} ${tarea.desc} :: ${
        tareaCompleta
          ? "Completada ".green + tarea.completadoEn.toString().green
          : "Pendiente".red
      }`;
      console.log(msg);
    });
  }

  listarTareasPendientesCompletadas(completadas = true) {
    let msg;
    let result = this.listadoArr.filter((x) =>
      completadas ? x.completadoEn != null : x.completadoEn == null
    );
    result.forEach((tarea, index) => {
      msg = `${((index + 1).toString() + ".").green}  ${tarea.desc} :: ${
        completadas ? tarea.completadoEn.toString().green : "Pendiente".red
      }`;
      console.log(msg);
    });
  }

  borrarTarea(id = "") {
    //Eliminar si existe
    if (this._listado[id]) {
      console.log(`Borrando: ${this._listado[id].desc}`);
      delete this._listado[id];
      console.log("Tarea borrada correctamente");
    }
  }

  ModifyTasksCompleted(ids = []) {
    this.listadoArr.forEach((tarea) => {
      //Complete task
      this._listado[tarea.id].completadoEn = ids.includes(tarea.id)
        ? //Do not modify completed date for an already completed task
          tarea.completadoEn == null
          ? new Date()
          : tarea.completadoEn
        : //Put uncompleted tasks which were not selected
          null;
    });
  }
}

module.exports = Tareas;
