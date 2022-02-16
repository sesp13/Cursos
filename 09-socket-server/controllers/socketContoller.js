const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

  //EVENTS WHEN A CLIENT CONNECTS

  //Send the last ticket number by deafult
  socket.emit("lastTicket", ticketControl.lastNumber);

  //Send currentState of last 4 tickets to the frontend
  socket.emit("currentState", ticketControl.last4Tickets);

  //Send pending tickets to frontend
  socket.emit("pendingTickets", ticketControl.pendingTickets.length);

  socket.on("nextTicket", (payload, callback) => {
    const next = ticketControl.next();
    socket.broadcast.emit("pendingTickets", ticketControl.pendingTickets.length);
    callback(next);
    //TO DO notify there is a new pending ticket
  });

  socket.on("attendTicket", (payload, callback) => {
    // get desk from payload
    const { desk } = payload;
    //Check if desk exists
    if (!desk)
      return callback({
        ok: false,
        message: "The desk is required",
      });

    const ticket = ticketControl.attendTicket(desk);
    if (!ticket)
      return callback({
        ok: false,
        message: "No more tickets pending",
      });

    //Notify a change in last 4 tickets Must be broadcast because attending is
    //a diferent client from general view
    socket.broadcast.emit("currentState", ticketControl.last4Tickets);

    //Notify new pending tickets quenue length
    socket.broadcast.emit("pendingTickets", ticketControl.pendingTickets.length);
    socket.emit("pendingTickets", ticketControl.pendingTickets.length);

    callback({ ok: true, ticket });
  });

  socket.on("resetCount", (payload, callback) => {
    ticketControl.resetCount();
    callback({
      message: "Everything resetted",
    });
  });

  
};

module.exports = socketController;
