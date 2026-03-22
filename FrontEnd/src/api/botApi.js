export async function getBotMove(board, difficulty) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bot/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, difficulty })
  });

  return res.json();
}

export async function checkGame(board) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bot/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board })
  });

  const data = await res.json();
  return data.result;
}
