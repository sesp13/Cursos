//HTML Referencies
const labelDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desk')){
  window.location = 'index.html';
  throw new Error("The desk is required");
}

const desk = searchParams.get('desk');

labelDesk.innerText = desk;

const socket = io();

// socket.on('connect', )

