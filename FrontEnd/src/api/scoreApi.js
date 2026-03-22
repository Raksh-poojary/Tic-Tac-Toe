export async function saveScore(xScore, oScore) {
    const username = prompt("Username:");
    const password = prompt("Password:");

    const res = await fetch("http://localhost:5000/api/score/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, xScore, oScore })
    });

    return res.json();
}

export async function restoreScore() {
    const username = prompt("Username:");
    const password = prompt("Password:");

    const res = await fetch("http://localhost:5000/api/score/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}
