const empleados = [
  {
    id: 1,
    nombre: "Fernando",
  },
  {
    id: 2,
    nombre: "Linda",
  },
  {
    id: 3,
    nombre: "Karen",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado
      ? resolve(empleado)
      : reject(`No se encontró empleado con id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario ? resolve(salario) : reject(`No se encontró salario con id ${id}`);
  });
};

const id = 3;

//Combinacion de promesas (callback hell otra manera con promise hell)
/*
getEmpleado(id)
  .then((empleado) => {
    getSalario(id)
      .then((salario) => {
        console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => console.log(error));
*/

//Promesas en cadena
let nombre;
getEmpleado(id)
  //Si el then devuelve otra promesa puedo concatenarle otro then
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log(`El empleado ${nombre} tiene un salario de ${salario}`)
  )
  .catch((err) => console.log(err));
