const express = require("express");
const { botMove, checkWinner } = require("../gameLogic");
const router = express.Router();

router.post("/move", (req, res) => {
    const { board, difficulty } = req.body;

    const humanResult = checkWinner(board);
    if (humanResult) {
        return res.json({ move: null, result: humanResult });
    }

    const move = botMove(board, difficulty);

    const newBoard = [...board];
    newBoard[move] = "O";

    const result = checkWinner(newBoard);

    res.json({ move, result });
});

router.post("/check", (req, res) => {
    const { board } = req.body;
    const result = checkWinner(board);

    res.json({ result });
});

module.exports = router;