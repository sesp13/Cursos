const nombre = 'Deadpool';
const real = 'Wade Wilson';

//Normal
const normal = nombre + ' '  + real;

//Template strings
const template = `El héroe ${nombre} se llama ${normal}`;

console.log(normal);
console.log(template);

const html = `
    <h1>Hola</h1>
    <p>Mundo</p>
`;

console.log(html);