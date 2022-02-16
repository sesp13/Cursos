//HTML Referencies
const labelDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const alertMessage = document.querySelector("#alertMessage");
const lblPending = document.querySelector("#lblPending");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("The desk is required");
}

const desk = searchParams.get("desk");

//Initial behaviour
labelDesk.innerText = desk;
alertMessage.style.display = "none";

//Sockets things
const socketClient = io();

socketClient.on("connect", () => {
  btnAttend.disabled = false;
});

socketClient.on("disconnect", () => {
  btnAttend.disabled = true;
});

//Get the number of pending tickets
socketClient.on("pendingTickets", (pendingNumber) => {

  //Dont display anything if there are not pending tickets
  lblPending.style.display = pendingNumber == 0 ? 'none' : '';
  
  lblPending.innerText = pendingNumber;
})

btnAttend.addEventListener("click", () => {
  socketClient.emit("attendTicket", { desk }, (payload) => {
    const { ok, message, ticket } = payload;
    if (!ok) {
      lblTicket.innerText = 'Nadie';
      alertMessage.style.display = "";
      alertMessage.innerText = message;
      return true;
    }
    
    //Set which ticket is being attended
    lblTicket.innerText = 'Ticket ' + ticket.number;


  });
});
