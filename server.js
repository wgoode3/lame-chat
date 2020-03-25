const express = require("express");
const cors = require("cors");
const port = 8000;

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server);

io.on("connection", socket => {

    console.log(socket.id);

    socket.broadcast.emit("hello", "hello from the server");
    socket.on("join", data => {
        socket.broadcast.emit("newUser", data);
    });
    socket.on("sentMessage", data => {
        socket.broadcast.emit("receiveMessage", data);
    });

});