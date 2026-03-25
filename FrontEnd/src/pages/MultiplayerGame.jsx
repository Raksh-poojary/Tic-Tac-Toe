import ScoreBoard from "../components/ScoreBoard";
import { useState, useEffect } from "react";
import { useParams , useLocation} from "react-router-dom";
import socket from "../socket";

function MultiplayerGame() {

    const { roomId } = useParams();
    const location = useLocation();
    const player = location.state?.player;
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);

    // ===== SOCKET LISTENERS =====
    useEffect(() => {
        socket.on("move", ({ index, player:movPlayer, result }) => {

            setBoard(prev => {
                const newBoard = [...prev];
                newBoard[index] = movPlayer;
                return newBoard;
            });

            if (result) {
                handleGameEnd(result);
            } else {
                setCurrentPlayer(movPlayer === "X" ? "O" : "X");
            }
        });

        socket.on("restart", (starter) => {
            setBoard(Array(9).fill(""));
            setGameOver(false);
            setMessage("");
            setCurrentPlayer(starter);
        });

        socket.on("assignPlayer", (p) => setCurrentPlayer(p));

        return () => {
            socket.off("assignPlayer");
            socket.off("move");
            socket.off("restart");
        };

    }, []);

    // ===== HANDLE CLICK =====
    function handleClick(index) {

        if (gameOver) return;

        // only play your turn
        if (player !== currentPlayer) return;

        // prevent overwrite
        if (board[index] !== "") return;

        socket.emit("move", {
            roomId,
            index,
            player
        });
    }

    // ===== GAME END =====
    function handleGameEnd(result) {
        setGameOver(true);   

        if (result === "draw") {
            setMessage("It's a draw");
            return;
        }
        if (!player) {
            setMessage("Player {player} wins");
            return;
        }
        if (result === player) {
            setMessage("You won!");
        } else {
            setMessage(`You lost`);
        }
        if(result==="X") setXScore(prev => prev + 1);
        if(result==="O") setOScore(prev => prev + 1);
    }

    // ===== RESTART =====
    function handleRestart() {
        socket.emit("restart", roomId);
    }

    // ===== BACKGROUND COLOR =====
    useEffect(() => {
        const main = document.querySelector("main");

        if (!main) return;

        if (currentPlayer === "X") {
            main.style.backgroundColor = "rgb(97, 116, 122)";
        } else {
            main.style.backgroundColor = "rgba(143, 179, 143, 1)";
        }
    }, [currentPlayer]);

    return (
        <main style={{height:"100vh"}}>
            
            <h2>Room: {roomId}</h2>
            <h1>You are: {player}</h1>
            <h1>Turn: {currentPlayer}</h1>
            <div className="mult">
                <div className="game-area">
                    <div className="container">
                        {board.map((val, i) => (
                            <button
                                key={i}
                                className="box"
                                onClick={() => handleClick(i)}
                                style={{
                                    backgroundColor:
                                        val === "X"
                                            ? "lightblue"
                                            : val === "O"
                                                ? "lightgreen"
                                                : ""
                                }}
                            >
                                {val}
                            </button>
                        ))}
                    </div>

                    <ScoreBoard xScore={xScore} oScore={oScore} mode={"online"} />
                </div>
            </div>

            {/* RESULT POPUP */}
            {gameOver && (
                <div className="result-content">
                    <div className="result">
                        <p>{message}</p>

                        {/* Only one player can restart (optional) */}
                        {player === "X" && (
                            <button onClick={handleRestart}>
                                New Game
                            </button>
                        )}
                    </div>
                </div>
            )}

        </main>
    );
}

export default MultiplayerGame;