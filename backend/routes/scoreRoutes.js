const express = require("express");
const UserScore = require("../models/UserScore");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const exists = await UserScore.findOne({ username });
    if (exists)
        return res.status(409).json({ msg: "Username already exists" });

    await UserScore.create({ username, password });
    res.json({ msg: "Registered successfully" });
});

// Restore
router.post("/restore", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserScore.findOne({ username });
    if (!user || user.password !== password)
        return res.status(401).json({ msg: "Invalid credentials" });

    res.json({ xScore: user.xScore, oScore: user.oScore });
});

// Auto Save
router.post("/save", async (req, res) => {
    const { username, password, xScore, oScore } = req.body;

    const user = await UserScore.findOne({ username });
    if (!user || user.password !== password)
        return res.status(401).json({ msg: "Login required" });

    user.xScore = xScore;
    user.oScore = oScore;
    await user.save();

    res.json({ msg: "Auto saved" });
});

module.exports = router;
