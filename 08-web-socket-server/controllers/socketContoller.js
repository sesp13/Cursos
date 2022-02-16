const socketController = (socket) => {

  console.log("Client connected", socket.id);

  socket.on("disconnect", () => {
    //console.log("Goodbye puto" + socket.id)
  });

  //Receive a message from teh frontend
  socket.on("sendMessage", async (payload, callback) => {
    // Send a message for the client who invoked this socket

    //Way 1
    const id = "123456";
    callback(id);
    
    //Way 2
    socket.emit("sendMessage", "Exclusive client " + id);
    
    //Send a message to all the connected clients
    socket.broadcast.emit("sendMessage", "Eveyone knows this");
  });
};

module.exports = socketController;
