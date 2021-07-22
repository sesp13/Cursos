//Clasic way for create a web server
const http = require("http");

http
  .createServer((request, response) => {
    // console.log(request);
    // response.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // response.writeHead(200, {
    //   "Content-Type": "application/csv",
    // });
    // response.write('id, nombre\n');
    // response.write('1, Fernando\n');
    // response.write('2, Maria\n');
    // response.write('3, Simon\n');
    response.write("Hola puto");
    response.end();
  })
  .listen(3000);

console.log("Escuchando en el puerto 3000");
