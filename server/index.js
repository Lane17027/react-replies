const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");

const socket = require("socket.io");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: [
    "https://react-replies-frontend.onrender.com",
    "http://localhost:3000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`DB connection Successfull on ${process.env.MONGO_URL}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:3000", // Local Development
      "https://react-replies.onrender.com", // Deployed Frontend
    ],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
