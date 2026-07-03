import { getNoOfRows, getNoOfColumns, getNoOfSquare } from "./utils.js";

import { showAllMines } from "../utilFunctions/getBoard.js";
import { startGame, getAlert as getAlertBox } from "../components/modal.jsx";

export const restartGameFn = (dispatch) => {
  startGame().then((result) => {
    dispatch({ type: "setLevel", payload: result });
  });
};

export const placeFlagFunction = (
  id,
  state,
  dispatch,
  playPlaceFlagSound,
  playGameWinSound,
) => {
  if (state.isGameOver) {
    getAlertBox(state.isGameWon, () => restartGameFn(dispatch));
    return;
  }

  const rows = getNoOfRows(state.level);
  const columns = getNoOfColumns(state.level);
  const squares = rows * columns;

  const row = Math.floor(id / columns);
  const col = id % columns;

  if (state.board[row][col].isVisible) return;
  if (!state.board[row][col].isFlag && state.noOfFlags <= 0) return;

  let found = 0;
  let markedFlag = 0;

  let newBoard = new Array(rows);
  for (let i = 0; i < rows; i++) {
    newBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      newBoard[i].push({
        ...state.board[i][j],
        isFlag:
          i === row && j === col
            ? !state.board[i][j].isFlag
            : state.board[i][j].isFlag,
      });

      if (newBoard[i][j].val !== -1 && newBoard[i][j].isVisible) {
        found += 1;
      } else if (newBoard[i][j].isFlag) {
        markedFlag += 1;
      }
    }
  }

  if (found === squares - state.noOfBombs && markedFlag === state.noOfBombs) {
    dispatch({
      type: "setGameOver",
      payload: {
        board: showAllMines(newBoard),
        isGameWon: true,
        noOfFlags: state.board[row][col].isFlag ? 1 : -1,
      },
    });
    playGameWinSound();
    getAlertBox(true, () => restartGameFn(dispatch));
  } else {
    dispatch({
      type: "setBoard",
      payload: {
        board: newBoard,
        noOfFlags: state.board[row][col].isFlag ? 1 : -1,
      },
    });
    playPlaceFlagSound();
  }
};

export const handleClick = (
  id,
  state,
  dispatch,
  playRightMoveSound,
  playGameOverSound,
  playGameWinSound,
) => {
  if (state.isGameOver) {
    getAlertBox(state.isGameWon, () => restartGameFn(dispatch));
    return;
  }

  const rows = getNoOfRows(state.level);
  const columns = getNoOfColumns(state.level);
  const squares = getNoOfSquare(state.level);

  const row = Math.floor(id / columns);
  const col = id % columns;

  if (state.board[row][col].isFlag || state.board[row][col].isVisible) return;

  dispatch({ type: "setCurrentClickCellId", payload: id });

  const dx = [0, 0, -1, 1, -1, -1, 1, 1];
  const dy = [1, -1, 0, 0, -1, 1, -1, 1];

  // for bfs queue
  let arr = [];

  // for tracking visted element
  let tmp = [];
  arr.push({ x: row, y: col });
  tmp.push({ x: row, y: col });

  while (arr.length > 0) {
    const { x, y } = arr.shift();
    if (state.board[x][y].val === 0) {
      for (let i = 0; i < 8; i++) {
        const xi = x + dx[i];
        const yi = y + dy[i];
        if (xi >= 0 && yi >= 0 && xi < rows && yi < columns) {
          if (
            !tmp.some((ele) => ele.x === xi && ele.y === yi) &&
            state.board[xi][yi].val !== -1 &&
            !state.board[xi][yi].isFlag
          ) {
            arr.push({ x: xi, y: yi });
            tmp.push({ x: xi, y: yi });
          }
        }
      }
    }
  }

  let markedFlag = 0;
  let lost = false;
  let found = 0;

  let newBoard = new Array(rows);
  for (let i = 0; i < rows; i++) {
    newBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      if (tmp.some((element) => element.x === i && element.y === j)) {
        newBoard[i].push({
          ...state.board[i][j],
          isVisible: true,
          isFlag: false,
        });
      } else {
        newBoard[i].push({ ...state.board[i][j] });
      }

      const each = newBoard[i][j];
      if (each.isFlag) {
        markedFlag += 1;
      }
      if (each.val === -1 && each.isVisible) {
        lost = true;
      } else if (each.val !== -1 && each.isVisible) {
        found += 1;
      }
    }
  }

  if (lost === true) {
    dispatch({
      type: "setGameOver",
      payload: { board: showAllMines(newBoard), isGameWon: false },
    });
    playGameOverSound();
    getAlertBox(false, () => restartGameFn(dispatch));
  } else if (
    found === squares - state.noOfBombs &&
    markedFlag === state.noOfBombs
  ) {
    dispatch({
      type: "setGameOver",
      payload: { board: showAllMines(newBoard), isGameWon: true },
    });
    playGameWinSound();
    getAlertBox(true, () => restartGameFn(dispatch));
  } else {
    dispatch({ type: "setBoard", payload: { board: newBoard } });
    playRightMoveSound();
  }
};
