const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const scoreRoutes = require("./routes/scoreRoutes");
const botRoutes = require("./routes/botRoutes");
const { checkWinner } = require("./gameLogic");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/user", scoreRoutes);
app.use("/api/bot", botRoutes);

app.get("/api/user/health", (req, res) => {
    res.json({ status: "ok" });
});

const boards = {}; // roomId -> board
const starters = {};
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ===== Generate 6-digit room =====
function generateRoomId() {
    let id;
    do {
        id = Math.floor(100000 + Math.random() * 900000).toString();
    } while (boards[id]);
    return id;
}

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // ===== CREATE ROOM =====
    socket.on("createRoom", () => {
        const roomId = generateRoomId();

        socket.join(roomId);
        boards[roomId] = Array(9).fill("");
        starters[roomId] = "X";

        socket.emit("roomCreated", roomId);

        console.log("Room created:", roomId);
    });

    // ===== JOIN ROOM =====
    socket.on("joinRoom", (roomId) => {

        const room = io.sockets.adapter.rooms.get(roomId);

        if (!room) {
            socket.emit("errorMessage", "Room not found");
            return;
        }

        if (room.size >= 2) {
            socket.emit("errorMessage", "Room full");
            return;
        }

        socket.join(roomId);

        const players = Array.from(io.sockets.adapter.rooms.get(roomId));

        const playerX = players[0];
        const playerO = players[1];

        // start game for both
        io.to(playerX).emit("startGame", { roomId, player: "X" });
        io.to(playerO).emit("startGame", { roomId, player: "O" });
    });

    // ===== HANDLE MOVE =====
    socket.on("move", ({ roomId, index, player }) => {

        if (!boards[roomId]) return;

        // prevent overwrite
        if (boards[roomId][index] !== "") return;

        boards[roomId][index] = player;

        const result = checkWinner(boards[roomId]);

        io.to(roomId).emit("move", {
            index,
            player,
            result
        });

        if (result) {
            delete boards[roomId];
        }
    });

    // ===== RESTART GAME =====
    socket.on("restart", (roomId) => {
        starters[roomId] = starters[roomId] === "X" ? "O" : "X";  //X and O will be complimented after restarting
        boards[roomId] = Array(9).fill("");
        io.to(roomId).emit("restart", starters[roomId]);
    });

    // ===== DISCONNECT =====
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running with Socket.IO on port 5000");
});