import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import AuthModal from "../components/AuthModal";
import { getBotMove, checkGame } from "../api/botApi";
import { registerUser, restoreUser, autoSave } from "../api/userApi";
import { io } from "socket.io-client";

function Game(modes) {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [mode, setMode] = useState(modes.modes);

    const [startingPlayer, setStartingPlayer] = useState("X");
    const [currentPlayer, setCurrentPlayer] = useState("X");

    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const [botThinking, setBotThinking] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [authType, setAuthType] = useState(null);
    const [difficulty, setDifficulty] = useState("medium");

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL);
        
        socket.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        setMode(mode);
    }, [mode]);

    /* --------------------------------
       RESET WHEN MODE CHANGES
    -------------------------------- */
    useEffect(() => {
        resetGame(true);
        setXScore(0);
        setOScore(0);
    }, [mode, difficulty]);


    /* --------------------------------
       RESET GAME
    -------------------------------- */
    function resetGame(fromModeChange = false) {
        setBoard(Array(9).fill(""));
        setGameOver(false);
        setWinner(null);
        setBotThinking(false);

        if (fromModeChange) {
            setStartingPlayer("X");
            setCurrentPlayer("X");
        } else {
            const next = startingPlayer === "X" ? "O" : "X";
            setStartingPlayer(next);
            setCurrentPlayer(next);
        }
    }

    /* --------------------------------
       HUMAN MOVE
    -------------------------------- */
    async function handleMove(index) {
        if (gameOver || botThinking || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        const result = await checkGame(newBoard);

        if (result) {
            endGame(result);
            return;
        }

        // Switch player immediately
        const nextPlayer = currentPlayer === "X" ? "O" : "X";
        setCurrentPlayer(nextPlayer);
    }

    /* --------------------------------
       BOT MOVE (SERVER AUTHORITATIVE)
    -------------------------------- */
    useEffect(() => {
        if (mode === "single" && currentPlayer === "O" && !gameOver) {

            const timer = setTimeout(() => {
                handleBotMove(board);
            }, 700);

            return () => clearTimeout(timer);
        }

    }, [currentPlayer, board, mode, gameOver]);


    async function handleBotMove(brd) {
        if (gameOver) return;
        setBotThinking(true);
        const { move, result } = await getBotMove(brd, difficulty);
        setBotThinking(false);
        if (move === null) return;
        const newBoard = [...brd];
        newBoard[move] = "O";
        setBoard(newBoard);
        if (result) {
            endGame(result);
            return;
        }
        setCurrentPlayer("X");
    }

    /* --------------------------------
       END GAME (WIN / DRAW)
    -------------------------------- */
    function endGame(result) {
        setGameOver(true);
        setWinner(result);

        if (result === "X") {
            const nx = xScore + 1;
            setXScore(nx);
            autoSave(currentUser, nx, oScore);
        } else if (result === "O") {
            const no = oScore + 1;
            setOScore(no);
            autoSave(currentUser, xScore, no);
        }
    }

    /* --------------------------------
       UI
    -------------------------------- */
    return (
        <>
            <Navbar
                mode={mode}
                setMode={setMode}

                difficulty={difficulty}
                setDifficulty={setDifficulty}

                openRegister={() => setAuthType("register")}
                openRestore={() => setAuthType("restore")}
            />

            <main
                style={{
                    backgroundColor:
                        currentPlayer === "X"
                            ? "rgb(97,116,122)"
                            : "rgba(143,179,143,1)"
                }}
            >
                <div className="turn">
                    {gameOver
                        ? winner === "draw"
                            ? "It's a Draw!"
                            : `Player ${winner} wins!`
                        : `Turn: ${currentPlayer}`}
                </div>

                <section className="game-area">
                    <article className="game">
                        <Board board={board} onMove={handleMove} />
                        <button onClick={() => resetGame(false)}>Reset Game</button>
                    </article>

                    <ScoreBoard
                        xScore={xScore}
                        oScore={oScore}
                        mode={"offline"}
                        resetScores={() => {
                            setXScore(0);
                            setOScore(0);
                        }}
                    />
                </section>
            </main>

            {/* RESULT OVERLAY (same UX as old JS) */}
            {gameOver && (
                <div className="result-content">
                    <div className="result">
                        <p>
                            {winner === "draw"
                                ? "It's a Draw!"
                                : `Player ${winner} wins!`}
                        </p>
                        <button onClick={() => resetGame(false)}>New Game</button>
                    </div>
                </div>
            )}

            {authType && (
                <AuthModal
                    type={authType}
                    onClose={() => setAuthType(null)}
                    onSubmit={async ({ username, password }) => {

                        if (authType === "register") {
                            const res = await registerUser(username, password);

                            if (res.msg === "Username already exists") {
                                return { error: "Username already exists" };
                            }

                            setCurrentUser({ username, password });
                            return {};
                        }

                        if (authType === "restore") {
                            const res = await restoreUser(username, password);

                            if (res.msg === "Invalid credentials") {
                                return { error: "Incorrect username or password" };
                            }

                            setXScore(res.xScore);
                            setOScore(res.oScore);
                            setCurrentUser({ username, password });

                            return {};
                        }
                    }}
                />
            )}
        </>
    );
}

export default Game;
