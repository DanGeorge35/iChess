// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div>
    <h1>Chess Game</h1>
    <ul>
      <li>
        <Link to="/play/ai">Play vs Computer</Link>
      </li>
      <li>
        <Link to="/play/multiplayer">Multiplayer</Link>
      </li>
      <li>
        <Link to="/play/local">Play Locally</Link>
      </li>
    </ul>
  </div>
);

export default Home;
