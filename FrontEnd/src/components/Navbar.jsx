import {useNavigate} from "react-router-dom";
function Navbar({ mode, setMode, difficulty, setDifficulty, openRegister, openRestore }) {
    const navigate = useNavigate();
    return (
        <nav className="topbar">
            <div className="mode-boxes">
                <button
                    className="mode"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Home
                </button>
                <button
                    className={`mode ${mode === "double" ? "active" : ""}`}
                    onClick={() => {
                        setMode("double");
                        navigate("/double");
                     }}
                >
                    Double
                </button>

                <button
                    className={`mode ${mode === "single" ? "active" : ""}`}
                    onClick={() => {
                        setMode("single");
                        navigate("/single");
                    }}
                >
                    Single
                </button>
            </div>

            <h1 className="title">TIC TAC TOE</h1>

            <div>
                {mode === "double" ? (
                    <div className="options" style={{display: "flex", gap: "15px" }}>
                        <button className="mode" onClick={openRegister}>
                            Register
                        </button>

                        <button className="mode" onClick={openRestore}>
                            Restore
                        </button>
                    </div>
                ) : (
                    <div className="options" style={{display: "flex", gap: "7px" }}>
                            
                        <button
                            className={`mode ${difficulty === "easy" ? "active" : ""}`}
                            onClick={() => setDifficulty("easy")}
                        >
                            Easy
                        </button>

                        <button
                            className={`mode ${difficulty === "medium" ? "active" : ""}`}
                            onClick={() => setDifficulty("medium")}
                        >
                            Medium
                        </button>

                        <button
                            className={`mode ${difficulty === "hard" ? "active" : ""}`}
                            onClick={() => setDifficulty("hard")}
                        >
                            Hard
                        </button>
                            
                    </div>
                )}
            </div>

            <div className="spacer"></div>
        </nav>
    );
}

export default Navbar;