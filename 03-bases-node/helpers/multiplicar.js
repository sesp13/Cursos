const fs = require("fs");
const colors = require("colors/safe");

async function crearArchivo(base = 5, listar = false, hasta = 10) {
  try {
    let salida = "";
    let consola = "";

    for (let i = 1; i <= hasta; i++) {
      salida += `${base} x ${i} = ${base * i} \n`;
      //Manejo en colors de consola
      consola += `${base} ${"x".red} ${i} = ${base * i} \n`;
    }

    let inicio = `
            -----------------
            Tabla del ${base}
            -----------------
    `;
    if (listar) console.log(colors.cyan(inicio + "\n" + consola));

    fs.writeFileSync(`salida/tabla-${base}.txt`, salida);

    //Contenido de la promesa <resolve>
    return `tabla-${base}`;
  } catch (error) {
    //contenido de reject
    throw error;
  }
}

//Exportar funcion
module.exports = { crearArchivo };
