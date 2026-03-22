import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-card">
        <h1>TIC TAC TOE</h1>
        <p>Play smart. Play fast. Challenge yourself or others.</p>

        <div className="landing-buttons">
          <button onClick={() => navigate("/single")}>
            Single Player
          </button>

          <button onClick={() => navigate("/double")}>
            Double Player
          </button>

          <button onClick={() => navigate("/multiplayer")}>
            Online Multiplayer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;