const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreate = document.querySelector("#btnCreate");

const socketClient = io();

//Listeners
socketClient.on("connect", () => {
  btnCreate.disabled = false;
});

socketClient.on("disconnect", () => {
  btnCreate.disabled = true;
});

socketClient.on("lastTicket", (payload) => {
  lblNewTicket.innerText = `Ticket ${payload}`;
});

btnCreate.addEventListener("click", () => {
  socketClient.emit("nextTicket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
