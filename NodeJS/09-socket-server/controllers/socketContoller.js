const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  
  //Send the last ticket number by deafult
  socket.emit('lastTicket', ticketControl.last);

  socket.on("nextTicket", async (payload, callback) => {
    const next = ticketControl.next();
    callback(next);

    //TO DO notify there is a new pending ticket

  });
};

module.exports = socketController;
