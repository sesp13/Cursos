const resetButton = document.querySelector("#resetCount");

const socketClient = io();

socketClient.on("resetCount", null, (response) => {
  console.log(response);
});

resetButton.addEventListener("click", () => {
  socketClient.emit("resetCount", null, (res) => {
    console.log(res);
  });
});
