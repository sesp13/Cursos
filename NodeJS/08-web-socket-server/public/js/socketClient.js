//Html references
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

const btnSend = document.querySelector("#btnSend");
const txtMessage = document.querySelector("#txtMessage");

const socketClient = io();

//Listeners
socketClient.on("connect", () => {
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socketClient.on("disconnect", () => {
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
  // console.log("Goodbye Frontend");
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;

  const payload = {
    message,
    id: "123",
    name: "Hola puto",
    fecha: new Date().getTime(),
  };

  //Send a message to the server
  socketClient.emit("sendMessage", payload, (id) => {
    console.log(`From the server ${id}`);
  });
});

//Receive a message from the server
socketClient.on("sendMessage", (payload) => {
  console.log(payload);
});
