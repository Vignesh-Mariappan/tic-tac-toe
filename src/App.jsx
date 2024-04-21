import { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import './App.css';
import logo from './assets/TIC_TAC_TOE.png';

function App() {
  const [board, stBoard] = useState(new Array(9).fill(null));

  return (
    <div className='wrapper'>
      <img src={logo} alt='TIC-TAC-TOE' width={150} height={150} className='logo' />
      <TicTacToe boardSize={3} />
    </div>
  );
}

export default App;
