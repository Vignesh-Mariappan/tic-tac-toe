import { useCallback, useState } from 'react';

const useTicTacToe = (boardSize) => {
  const [board, setBoard] = useState(initialBoardValues());
  const [isXNext, setIsXNext] = useState(true);

  function initialBoardValues() {
    return new Array(boardSize * boardSize).fill(null);
  }

  // const WINNING_PATTERNS = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  const findWinningPatterns = useCallback(() => {
    let winningPatterns = [];

    const winningRows = winningRowPatterns();
    winningPatterns = [...winningRows];
    const winningCols = winningColPatterns(winningPatterns);
    const winningDiagonals = winningDiagonalPatterns(winningPatterns);
    winningPatterns = [...winningPatterns, ...winningCols, ...winningDiagonals];

    return winningPatterns;
  }, [boardSize]);

  const winningRowPatterns = useCallback(() => {
    let winningRows = [];

    let col = 0;
    for (let row = 0; row < boardSize; row++) {
      const currentRow = [];
      let rowElemCount = 0;
      for (col; col < boardSize * boardSize; col++) {
        if (rowElemCount === boardSize) {
          break;
        }

        currentRow.push(col);
        rowElemCount += 1;
      }
      winningRows.push(currentRow);
    }

    return winningRows;
  }, [boardSize]);

  const winningColPatterns = useCallback(
    (boardDetails) => {
      const winningCols = [];
      for (let col = 0; col < boardSize; col++) {
        const currentColPattern = [];
        for (let row = 0; row < boardSize; row++) {
          currentColPattern.push(boardDetails[row][col]);
        }
        winningCols.push(currentColPattern);
      }

      return winningCols;
    },
    [boardSize]
  );

  const winningDiagonalPatterns = useCallback(
    (boardDetails) => {
      const winningDiagonals = [];
      let currentDiagonalPattern = [];
      for (let row = 0, col = 0; row < boardSize && col < boardSize; row++, col++) {
        currentDiagonalPattern.push(boardDetails[row][col]);
      }

      winningDiagonals.push(currentDiagonalPattern);
      currentDiagonalPattern = [];

      for (let row = 0, col = boardSize - 1; row < boardSize && col >= 0; row++, col--) {
        currentDiagonalPattern.push(boardDetails[row][col]);
      }

      winningDiagonals.push(currentDiagonalPattern);

      return winningDiagonals;
    },
    [boardSize]
  );

  const WINNING_PATTERNS = findWinningPatterns();

  const handleCellClick = (index) => {
    const winner = calculateGameWinner();

    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateGameWinner();

    if (winner) {
      return `Player ${winner} wins`;
    } else if (!board.includes(null)) {
      return 'Match Drawn!';
    } else {
      return `Player ${isXNext ? 'X' : 'O'} turn`;
    }
  };

  const calculateGameWinner = () => {
    for (let winningPattern of WINNING_PATTERNS) {
      if (winningPattern.every((index) => board[index] === 'X')) {
        return 'X';
      } else if (winningPattern.every((index) => board[index] === 'O')) {
        return 'O';
      }
    }
    return null;
  };

  const resetGame = () => {
    setIsXNext(true);
    setBoard(initialBoardValues());
  };

  return {
    board,
    handleCellClick,
    getStatusMessage,
    resetGame,
    calculateGameWinner,
  };
};

export default useTicTacToe;
