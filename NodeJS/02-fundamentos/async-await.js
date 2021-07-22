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

const getInfoUsario = async (id) => {
  //La resolucion correcta de la promesa se asigna a empleado
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
    return `El empleado ${empleado} tiene un salario de ${salario}`;
  } catch (error) {
    // return error;
    throw error;
  }
};

const id = 3;

getInfoUsario(id)
  .then((res) => {
    console.log("GUD");
    console.log(res);
  })
  .catch((err) => {
    console.log("BAD");
    console.log(err);
  });
