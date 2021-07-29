//Html references
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const socketClient = io();

//Listeners
socketClient.on("connect", () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socketClient.on("disconnect", () => {
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
  console.log("Goodbye Frontend");
});
