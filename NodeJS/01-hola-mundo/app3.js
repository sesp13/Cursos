console.log("Inicio de programa"); // 1
setTimeout( () => {
    console.log("Primer TimeOut"); // 5
}, 3000);
setTimeout( () => {
    console.log("Segundo TimeOut"); // 3
}, 0);
setTimeout( () => {
    console.log("Tercer TimeOut"); // 4
}, 0);
console.log("Fin de programa"); // 2
