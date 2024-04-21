import { useEffect, useState } from 'react';
import '../App.css';
import useTicTacToe from '../hooks/useTicTacToe';
import { FaTrophy } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function TicTacToe({ boardSize = 3 }) {
  const { board, handleCellClick, resetGame, getStatusMessage } = useTicTacToe(boardSize);
  const [statusMsg, setStatusMsg] = useState('');
  const [gameResAnim, setGameResAnim] = useState(false);

  useEffect(() => {
    if (statusMsg === 'Player X wins' || statusMsg === 'Player O wins') {
      setGameResAnim(true);
    } else {
      setGameResAnim(false);
    }
  }, [statusMsg]);

  useEffect(() => {
    const status = getStatusMessage();
    setStatusMsg(status);
  }, [board]);

  const clickHandler = (event, index) => {
    handleCellClick(index);
  };

  const resetBtnClickHandler = () => {
    resetGame();
    setGameResAnim(false);
  };

  const closeGameResHandler = () => setGameResAnim(false);

  return (
    <div className='game' style={{ '--boardSize': boardSize }}>
      <div className='status'>
        <button className='reset-btn' onClick={resetBtnClickHandler}>
          Reset Game
        </button>
        {!(statusMsg === 'Player X wins' || statusMsg === 'Player O wins') && statusMsg}
      </div>

      <div className='board'>
        {board.map((currentCellVal, index) => (
          <button key={index} className='cell' onClick={(event) => clickHandler(event, index)} disabled={currentCellVal !== null}>
            {currentCellVal}
          </button>
        ))}
      </div>

      <div className={`game-result ${gameResAnim ? 'game-res-anim' : 'game-res-hide-anim'}`}>
        <IoIosCloseCircleOutline className='close-icon' onClick={closeGameResHandler} color='red' size={'1.5rem'} />
        {(statusMsg === 'Player X wins' || statusMsg === 'Player O wins') && (
          <>
            <FaTrophy size={'4rem'} />
            <span>{statusMsg}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
