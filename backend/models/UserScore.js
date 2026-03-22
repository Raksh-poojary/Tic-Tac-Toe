const mongoose = require("mongoose");

const userScoreSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    xScore: { type: Number, default: 0 },
    oScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserScore", userScoreSchema);
