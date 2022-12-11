import React, { useState } from 'react';
import './componentes/style.css';

import Kalkulator from './componentes/kalkulator/kalkulator';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <main className="container">
        <Kalkulator />
      </main>
      <div className="container-check">
        <span style={{ color: darkMode ? 'grey' : 'yellow' }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? '#c96dfd' : 'grey' }}>☽</span>
      </div>
    </div>
  );
}

export default App;
