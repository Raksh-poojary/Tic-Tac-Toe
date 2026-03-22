export async function getBotMove(board, difficulty) {
  const res = await fetch("http://localhost:5000/api/bot/move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, difficulty })
  });

  return res.json();
}

export async function checkGame(board) {
  const res = await fetch("http://localhost:5000/api/bot/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board })
  });

  const data = await res.json();
  return data.result;
}
