import { useState, useEffect } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function Multiplayer() {
    const [roomId, setRoomId] = useState("");
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        socket.on("roomCreated", (id) => {
            setRoomId(id);
        });

        socket.on("startGame", ({ roomId, player }) => {
            navigate(`/multiplayer/${roomId}`,{state:{player}});
        });

        socket.on("errorMessage", (msg) => {
            alert(msg);
        });

        return () => {
            socket.off("roomCreated");
            socket.off("startGame");
            socket.off("errorMessage");
        };

    }, []);

    return (
        <div className="landing">
            <div className="landing-card">

                <h2>Multiplayer</h2>

                <button onClick={() => socket.emit("createRoom")}>
                    Create Room
                </button>

                {roomId && (
                    <p>Room Created with ID: {roomId}</p>
                )}

                <input
                    placeholder="Enter Room ID to join"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button onClick={() => socket.emit("joinRoom", input)}>
                    Join Room
                </button>

            </div>
        </div>
    );
}

export default Multiplayer;