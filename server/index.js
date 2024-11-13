const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");

const socket = require("socket.io");

const app = express();
require("dotenv").config();

// Disable CORS (allow all origins)
app.use(cors({
  origin: "*",  // Allow any origin
  methods: "*",  // Allow any methods (GET, POST, etc.)
  allowedHeaders: "*",  // Allow any headers
  credentials: true,  // Optional: allow credentials if needed
}));

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`DB connection Successful on ${process.env.MONGO_URL}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Started on Port ${process.env.PORT || 5000}`);
});

const io = socket(server, {
  cors: {
    origin: "*", // Allow any origin
    methods: ["GET", "POST"],
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
