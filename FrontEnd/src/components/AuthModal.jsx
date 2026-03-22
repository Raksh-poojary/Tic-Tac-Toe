import { useState } from "react";

function AuthModal({ type, onSubmit, onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await onSubmit({ username, password });

        if (result?.error) {
            setError(result.error);
            return;
        }

        onClose();
    }

    return (
        <div className="result-content">
            <div className="result">
                <h2>{type === "register" ? "Register" : "Restore Game"}</h2>

                {error && (
                    <p style={{ color: "red", marginBottom: "8px" }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="auth-buttons">
                        <button type="submit">
                            {type === "register" ? "Register" : "Restore"}
                        </button>

                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthModal;