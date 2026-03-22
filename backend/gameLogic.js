const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner(board) {
    for (let c of winningConditions) {
        const [a, b, c2] = c;
        if (board[a] && board[a] === board[b] && board[a] === board[c2]) {
            return board[a]; // "X" or "O"
        }
    }
    return board.includes("") ? null : "draw";
}

function findBestMove(board, player) {
    for (let c of winningConditions) {
        const vals = c.map(i => board[i]);
        const countP = vals.filter(v => v === player).length;
        const countE = vals.filter(v => v === "").length;
        if (countP === 2 && countE === 1) return c[vals.indexOf("")];
    }
    return null;
}

function randomMove(board) {
    const empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (!empty.length) return null;
    return empty[Math.floor(Math.random() * empty.length)];
}

function minimax(board, isMaximizing) {
    const result = checkWinner(board);

    if (result === "O") return 10;
    if (result === "X") return -10;
    if (result === "draw") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function hardMove(board) {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, false);
            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function botMove(board, difficulty = "medium") {

    if (difficulty === "easy") {
        return randomMove(board);
    }

    if (difficulty === "medium") {
        let m = findBestMove(board, "O");
        if (m === null) m = findBestMove(board, "X");
        if (m === null) m = randomMove(board);
        return m;
    }

    if (difficulty === "hard") {
        return hardMove(board);
    }
}



module.exports = { checkWinner, botMove };