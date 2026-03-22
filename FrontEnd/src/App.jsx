import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Landing from "./pages/Landing";
import Game from "./pages/Game";
import Multiplayer from "./pages/Multiplayer";
import MultiplayerGame from "./pages/MultiplayerGame";
import "./styles/Game.css";

function App() {
    const [backendReady, setBackendReady] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/health`)
                .then(() => {
                    setBackendReady(true);
                    clearInterval(interval);
                })
                .catch(() => { });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (!backendReady) {
        return <Loading />;
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/single" element={<Game modes="single"/>} />
                <Route path="/double" element={<Game modes="double"/>} />
                <Route path="/multiplayer" element={<Multiplayer/>} />
                <Route path="/multiplayer/:roomId" element={<MultiplayerGame />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;