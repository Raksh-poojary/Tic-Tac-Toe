function ScoreBoard({ xScore, oScore,mode ,resetScores }) {
    return (
        <article className="table">
            <h2>Score Board</h2>

            <table border="2">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ color: "blue", fontWeight: "bold" }}>X</td>
                        <td>{xScore}</td>
                    </tr>
                    <tr>
                        <td style={{ color: "green", fontWeight: "bold" }}>O</td>
                        <td>{oScore}</td>
                    </tr>
                </tbody>
            </table>
            {mode === "offline" && resetScores &&(
                <button onClick={resetScores}>Reset Scores</button>
            )}
        </article>
    );
}

export default ScoreBoard;
