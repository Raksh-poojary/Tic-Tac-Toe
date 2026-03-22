import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Game from "./pages/Game";
import Multiplayer from "./pages/Multiplayer";
import MultiplayerGame from "./pages/MultiplayerGame";
import "./styles/Game.css";

function App() {
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