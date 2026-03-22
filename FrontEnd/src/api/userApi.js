export async function registerUser(username, password) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}

export async function restoreUser(username, password) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return res.json();
}

export async function autoSave(user, xScore, oScore) {
    if (!user) return;

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, xScore, oScore })
    });
}
